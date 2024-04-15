"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "@/database/firebase/Firebase";
import Notsignin from "../Home/Notsignin";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [user, setUser] = useState(false);
  const [userid, setuserid] = useState("");
  const [image, setimage] = useState([]);
  const [imageurl, setimageurl] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(true);
        const email = authUser.email;
        try {
          const res = await fetch(
            `http://localhost:3000/api/User/getuser/${email}`,
            {
              method: "GET",
            }
          );

          const owdata = await res.json();
          const newdata = await owdata.data;

          if (newdata == null) {
            toast.error("Something went wrong ");
          } else {
            setUsername(newdata.username);
            setProfilePhoto(newdata.image);
            setuserid(newdata._id);
          }
        } catch (error) {
          toast.error("Username not found");
        }
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleProfilePhotoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePhoto(imageUrl);
    }
    setimage(file);
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () => {
      const result = render.result;
      if (typeof result === "string") {
        setimageurl(result);
      }
    };
  };

  function isFile(obj: any): obj is File {
    return obj instanceof File;
  }

  const handleupload = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (username !== "" && profilePhoto !== null) {
        if (isFile(profilePhoto) && profilePhoto.size < 50000) {
        try {
          const res = await fetch("http://localhost:3000/api/User/Update", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              id: userid,
              username: username,
              image: profilePhoto,
            }),
          });

          if (res.ok) {
            toast("data Updated Successfully");
          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          toast.error("Error");
        }
      } else {
        toast.warning("File size is larger than the 50kb");
      }
    } else {
      toast.warning("Fill the data first");
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <Navbar />
      {user ? (
        <div className="mt-10 mb-10 flex justify-center items-center">
          <form onSubmit={handleupload}>
            <div className="max-w-md  justify-center bg-zinc-50 p-10 rounded-md shadow-2xl">
              <h2 className="text-2xl font-semibold text-center underline underline-offset-4 mb-4">
                Profile
              </h2>
              <div className="mb-5 ">
                <label
                  htmlFor="profilePhoto"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Profile Photo
                </label>
                <div className="flex justify-center mt-5 border p-5">
                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="profilePhoto"
                    className="flex items-center justify-center cursor-pointer w-32 h-32 rounded-full bg-gray-100 border-dashed border-2 border-gray-300 hover:border-blue-500"
                  >
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-32 h-32 rounded-full "
                      />
                    ) : (
                      <span className="text-gray-500">Select a photo</span>
                    )}
                  </label>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="p-2 border border-black rounded-md"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Notsignin title="create" />
      )}
    </div>
  );
};

export default Profile;
