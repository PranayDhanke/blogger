"use client";
import React, { useState, useEffect } from "react";
import Banner from "../../images/Banner.jpg";
import Link from "next/link";
import Navbar from "../Home/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "@/database/firebase/Firebase";
import Notsignin from "../Home/Notsignin";
import { useRouter } from "next/navigation";

const MyBlog = () => {
  const router = useRouter();
  const [user, setuser] = useState(true);
  const [present, setpresent] = useState(false);
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
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
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
            try {
              const res = await fetch(
                `http://localhost:3000/api/Posts/ViewMy/${newdata.username}`,
                {
                  method: "GET",
                }
              );

              const owdata1 = await res.json();
              const newdata1 = await owdata1.data;

              if (newdata1 == "") {
                setpresent(false);
              } else {
                setBlogs(newdata1);
                setpresent(true);
              }
            } catch (error) {
              toast.error("Error while fetching data");
            }
          }
        } catch (error) {
          toast.error("Username not found");
        }
      } else {
        setuser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const deletepost = async (ids: any) => {
    try {
      const comformbox = window.confirm("You want to delete this blog");
      if (comformbox) {
        const res = await fetch(`http://localhost:3000/api/Posts/DeletePost/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: ids,
          }),
        });

        if (res.ok) {
          toast.success("Blog Deleted Successfully");
          router.refresh();
        } else {
          toast.error("Error While Delete");
        }
      }
    } catch (error) {
      toast.error("Soething Went Wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      {user ? (
        <div>
          <section className=" py-12">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold mb-8 ml-3">My Blogs</h2>
              {present ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog) => (
                    <div key={""} className="bg-white p-6 rounded-lg shadow-md">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-[30vh] object-cover mb-4 rounded-lg"
                      />
                      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                      <h5 className="text-sm font-semibold mb-2">
                        {blog.slug}
                      </h5>
                      <div className="flex gap-2 mt-4">
                        <img
                          src={blog.authorImage}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm mt-2 ">{blog.author}</span>
                      </div>
                      <span className="text-xs ml-2 mt-2">
                        {blog.createdAt}
                      </span>
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
                      <div className="mt-3 flex gap-2 ">
                        <Link href={`/studio/editpost/${blog._id}`}>
                          <button className="border rounded px-2 py-2 hover:bg-slate-600 hover:border-black">
                            Edit Post
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            deletepost(blog._id);
                          }}
                          className="border rounded px-2 py-2 hover:bg-slate-600 hover:border-black"
                        >
                          Delete Post
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10">
                  <h1>Create a Blogs to see your Blogs</h1>
                </div>
              )}
            </div>
          </section>
          <h1 className="text-center mt-9 pb-10 ">
            <Link
              className="rounded-lg outline px-5 py-3"
              href={"/studio/createpost"}
            >
              Create New Blogs
            </Link>
          </h1>
        </div>
      ) : (
        <Notsignin title="find" />
      )}
    </div>
  );
};

export default MyBlog;
