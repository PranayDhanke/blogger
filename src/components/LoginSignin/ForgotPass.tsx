"use client";
import { auth } from "@/database/firebase/Firebase";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const Forgotpass = () => {
  const router = useRouter();
  const [Email, setEmail] = useState("");

  const handleforget = (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      sendPasswordResetEmail(auth, Email).then(() => {
        alert("Check your email for the reset link");
        router.push("/access-account");
      });
    } catch (error) {
      alert(FirebaseError);
    }
  };

  return (
    <div className="bg-black flex justify-center items-center min-h-screen bg-cover bg-center">
      <div className="bg-white p-8 rounded-md shadow-md sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3 backdrop-filter backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Passward</h2>
        <form onSubmit={handleforget}>
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

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpass;
