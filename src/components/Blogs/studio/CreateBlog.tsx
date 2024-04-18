"use client";
import { auth } from "@/database/firebase/Firebase";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import dynamic from "next/dynamic";

const JoditEditor = dynamic(
  () => import('jodit-react'),
  { ssr: false}
)
export default function CreateBlog() {


  const Router = useRouter();
  const editor = useRef(null);

  const [content, setContent] = useState("");

  const [Username, Setusername] = useState("");
  const [ProfilePhoto, SetProfilePhoto] = useState("");
  const [Email, setemail] = useState("");

  const [FormData, SetFormData] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const email = authUser.email;
        try {
          const res = await fetch(`/api/User/getuser/${email}`, {
            method: "GET",
          });
          const owdata = await res.json();
          const newdata = await owdata.data;
          Setusername(newdata.username);
          SetProfilePhoto(newdata.image);
          setemail(newdata.email);
        } catch (error) {
          toast.error("detail not found");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e: any) => {
    SetFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const senddata = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/Posts/CreatePost", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: FormData.imageUrl,
          title: FormData.title,
          slug: FormData.subtitle,
          authorImage: ProfilePhoto,
          author: Username,
          content: content,
          email: Email,
        }),
      });
      if (res.ok) {
        toast.success("Blog Created");
        Router.push("/studio");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error Happened Something went wrong");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-6">Create Blog Post</h2>
        <form onSubmit={senddata}>
          <label htmlFor="title" className="signinlabel mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={FormData.title}
            onChange={handleChange}
            className="postinput"
            required
          />

          <label htmlFor="title" className="signinlabel mb-2 mt-2">
            SubTitle:
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={FormData.subtitle}
            onChange={handleChange}
            className="postinput"
            required
          />

          <label htmlFor="content" className="signinlabel mb-2 mt-2">
            Content:
          </label>

          <JoditEditor
            ref={editor}
            value={content}
            onChange={(e) => setContent(e)}
          />

          <label htmlFor="imageUrl" className="signinlabel mb-2 mt-2">
            Blog Post Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={FormData.imageUrl}
            onChange={handleChange}
            className="postinput"
            required
          />

          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
