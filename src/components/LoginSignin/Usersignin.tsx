"use client";
import { auth } from "@/database/firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Usersignin = () => {
  const router = useRouter();

  const [userName, setuserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConformPass, setConformPass] = useState("");
  const [image, setimage] = useState([]);
  const [imageurl, setimageurl] = useState<string>("");

  const onchangeimage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onload = () => {
        const result = render.result;
        if (typeof result === 'string') { // Check if result is a string
          setimageurl(result);
        }
      };
    }
  };

  function isFile(obj: any): obj is File {
    return obj instanceof File;
  }
  
  const getsignin = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (userName != "" && Email != "" && Password != "") {
      if (Password == ConformPass) {
        if (isFile(image) && image.size < 100000) {
          try {
            createUserWithEmailAndPassword(auth, Email, ConformPass).then(
              async () => {
                try {
                  const res = await fetch(
                    "/api/User/Create",
                    {
                      method: "POST",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify({
                        email: Email,
                        username: userName,
                        image: imageurl,
                      }),
                    }
                  );
                  if (res.ok) {
                    toast.success("Sign in success");
                    setTimeout(() => {
                      router.push("/");
                    }, 2000);
                  } else {
                    toast.error("Signin error");
                  }
                } catch (error) {
                  toast.error("Error");
                }
              }
            );
          } catch (error) {
            toast.error("Error while sign in");
          }
        } else {
          toast.warning("Image must be less than 100 KB");
        }
      } else {
        toast.warning("PAssword not match");
      }
    } else {
      toast.warn("Fill the data first");
    }
  };

  return (
    <div className=" bg-black flex justify-center items-center min-h-screen bg-cover bg-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-md shadow-md sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3 backdrop-filter backdrop-blur-md">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={getsignin}>
          <div className="mb-4">
            <label htmlFor="name" className="signinlabel">
              User Name
            </label>
            <input
              id="name"
              onChange={(e) => setuserName(e.target.value)}
              type="text"
              className="signininput"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="signinlabel">
              Email
            </label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="signininput"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="signinlabel">
              Password
            </label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="signininput"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="signinlabel">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              onChange={(e) => setConformPass(e.target.value)}
              type="text"
              className="signininput"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="signinlabel">
              Profile Picture (Image must be less than 50 KB)
            </label>
            <input
              id="image"
              onChange={onchangeimage}
              type="file"
              accept="images/*"
              className="signininput"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">
            Already have an account?{" "}
            <Link
              href={"/access-account"}
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Usersignin;
