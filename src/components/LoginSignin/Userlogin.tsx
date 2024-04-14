"use client";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/database/firebase/Firebase";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const Userlogin = () => {
  const router = useRouter();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const accessaccount = (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, Email, Password).then(() => {
        toast.success("Login Success")
        router.push("/");
      });
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  const forgotpass = () => {
    router.push("/forgot-password");
  };

  return (
    <div className="bg-black flex justify-center items-center min-h-screen bg-cover bg-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-md shadow-md sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3 backdrop-filter backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={accessaccount}>
          <div className="mb-4 mt-3">
            <label
              htmlFor="email"
              className="signinlabel"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="signininput"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="signinlabel"
            >
              Password
            </label>
            <input
              id="password"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              className="signininput"
            />
            <span
              onClick={forgotpass}
              className="cursor-pointer text-sm  text-blue-500 hover:underline"
            >
              Forgot Password ?
            </span>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">
            Don't have an account ?{" "}
            <Link href={"/sign-in"} className="text-blue-500 hover:underline">
              Sign In
            </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Userlogin;
