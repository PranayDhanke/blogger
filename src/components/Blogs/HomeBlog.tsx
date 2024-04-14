"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

const HomeBlog = ( {title} : {title : string}) => {
  const [blogs, setBlogs] = useState([
    {
      _id: "",
      imageUrl: "",
      title: "",
      slug: "",
      authorImage: "",
      author: "",
      content: "",
      createdAt: "",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/Posts/ViewAll", {
          method: "GET",
        });

        const owdata = await res.json();
        const newdata = await owdata.data;

        if (newdata == null) {
          toast.error("Something went wrong ");
        } else {
          setBlogs(newdata);
        }
      } catch (error) {
        toast.error("Error while fetching data");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 ml-3">{title} Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-[30vh] object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl tracking-wide font-bold mb-2">
                  {blog.title}
                </h3>
                <h5 className="text-sm font-semibold mb-2">{blog.slug}</h5>
                <div className="flex items-center gap-3 mt-4 mb-2">
                  <img
                    src={blog.authorImage}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm ">{blog.author}</span>
                </div>
                <span className="text-xs">{blog.createdAt}</span>
                <div className="text-gray-600 mt-5 mb-4">
                  <p className="max-w-full max-h-24 overflow-hidden">
                    {blog.content}
                  </p>
                  ...
                </div>

                <Link href={`/posts/[id]`} as={`/posts/${blog._id}`}>
                  <span className="text-blue-500 hover:underline">
                    Read more
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeBlog;
