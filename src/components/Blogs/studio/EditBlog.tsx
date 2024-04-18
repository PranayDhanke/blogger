"use client";
import Navbar from "@/components/Home/Navbar";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditBlog = ({ id }: { id: String }) => {
  const ids = id;
  const router = useRouter();

  const editor = useRef(null);

  const [content, setContent] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    imageUrl: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/Posts/ViewTitlePost/${id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });

        const owdata = await res.json();
        const newdata = await owdata.data;

        if (newdata == null) {
          toast.error("Something went wrong ");
        } else {
          setFormData(newdata);
          setContent(newdata.content)
        }
      } catch (error) {
        toast.error("Error While fetching data");
      }
    };

    fetchData();
  }, []);

  const senddata = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/Posts/EditPost`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: ids,
          imageUrl: formData.imageUrl,
          title: formData.title,
          slug: formData.slug,
          content: content,
        }),
      });
      if (res.ok) {
        toast.success("Blog Updated");
        router.push("/studio");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {}
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-6">Update Blog Post</h2>
        <form onSubmit={senddata}>
          <label htmlFor="title" className="signinlabel mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="postinput"
            required
          />

          <label htmlFor="title" className="signinlabel mb-2 mt-2">
            SubTitle:
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
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
            value={formData.imageUrl}
            onChange={handleChange}
            className="postinput"
            required
          />

          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
