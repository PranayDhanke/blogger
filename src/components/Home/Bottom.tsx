"use client";
import { auth } from "@/database/firebase/Firebase";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Bottom = () => {
  const [user, setUser] = useState(false);
  const [username, setusername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(true);
        const email = authUser.email;
        try {
          const res = await fetch(
            `/api/User/getuser/${email}`,
            {
              method: "GET",
            }
          );

          const owdata = await res.json();
          const newdata = await owdata.data;

          if (newdata == null) {
            toast.error("Something went wrong ");
          } else {
            setusername(newdata.username);
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

  return (
    <div className="text-center py-48 md:py-32">
      <ToastContainer />
      <div>
        <div>
          {user ? (
            <h1 className="font-bold md:text-2xl lg:text-5xl pb-4 md:py-9">
              Hello {username}
            </h1>
          ) : (
            <h1 className="font-bold md:text-2xl lg:text-5xl pb-4 md:py-9">
              Hello
            </h1>
          )}

          <span className="font-bold md:text-2xl lg:text-5xl">
            This website is for the bloggers
          </span>
        </div>
      </div>
      <div className="py-4 md:py-9">
        {user ? null : (
          <Link
            href={"sign-in"}
            className="bg-gray-700 text-white p-3 tracking-wider rounded-md "
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default Bottom;
