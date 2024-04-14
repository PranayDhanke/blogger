"use client";
import Navbar from "@/components/Home/Navbar";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

// pages/post/[slug].js
export default function DisplaySingleblogs({ id }: { id: any }) {

  const [loading, setLoading] = useState(true);
  const [blogs , setblogs] = useState({
    _id: "",
    imageUrl: "",
    title: "",
    slug: "",
    authorImage: "",
    author: "",
    content: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/Posts/ViewTitlePost/${id}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );

        const owdata = await res.json();
        const newdata = await owdata.data;

        if (newdata == null) {
          toast.error("Something went wrong ");
        } else {
          blogs._id = newdata._id;
          blogs.imageUrl = newdata.imageUrl;
          setblogs(newdata)
          setLoading(false);
        }
      } catch (error) {
        toast.error("Error While fetching data");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <ToastContainer />
      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-4xl font-bold mb-2">{blogs.title}</h1>
            <p className="text-gray-600 text-lg mb-4">{blogs.slug}</p>
            <div className="flex items-center mb-4">
              <img
                src={blogs.authorImage}
                alt="Author"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="font-bold mr-2">{blogs.author}</span>
              <span className="text-gray-600">{blogs.createdAt}</span>
            </div>
            <img
              src={blogs.imageUrl}
              alt="Blog"
              className="w-full rounded-lg mt-8"
            />
            <div className="max-w-prose mt-5">{blogs.content}</div>
          </div>
      )}
    </div>
  );
}
