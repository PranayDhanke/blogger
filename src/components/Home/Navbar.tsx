"use client";
import { auth } from "@/database/firebase/Firebase";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(false);

  const logoutuser = () => {
    try {
      auth.signOut();
    } catch (error) {
      alert(FirebaseError);
    }
  };

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
            console.log("Something went wrong ");
          } else {
            setProfilePhoto(newdata.image);
          }
        } catch (error) {
          console.log("Username not found");
        }
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full bg-white/70 h-20 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 lg:px-0 h-full">
        <h1 className="text-3xl font-semibold uppercase">
          <Link href={"/"}>Bloggers</Link>
        </h1>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/studio"}>Studio</Link>
          <Link href={"/contact"}>Contact</Link>

          {user ? (
            <li
              className="list-none relative cursor-pointer"
              onClick={toggleProfileMenu}
            >
              <Image  src={profilePhoto} alt="profile" width={20} height={20} className="rounded-full"></Image>
              {isProfileMenuOpen && (
                <ul className="absolute top-14 right-6 p-3  grid bg-gray-500 rounded gap-1">
                  <Link
                    className="hover:bg-slate-400 p-2 rounded"
                    href={"/profile"}
                  >
                    <li>Profile</li>
                  </Link>
                  <li
                    className="hover:bg-slate-400 p-2 rounded"
                    onClick={logoutuser}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <Link href={"/access-account"}>
              <div className="p-3 bg-blue-500 cursor-pointer flex items-center gap-2 rounded-xl text-white">
                <FaUserCircle className="text-xl" />
                <span>Login</span>
              </div>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <div className="ml-[5rem]">
            {user ? (
              <li
                className="list-none relative cursor-pointer "
                onClick={toggleProfileMenu}
              >
                <FaUserCircle className="text-2xl" />
                {isProfileMenuOpen && (
                  <ul className="absolute list-none top-12 right-0 bg-gray-800 text-white p-2 rounded">
                    <Link href={"/profile"}>
                      <li>Profile</li>
                    </Link>
                    <li onClick={logoutuser}>Logout</li>
                  </ul>
                )}
              </li>
            ) : null}
          </div>
        </div>

        <div className="md:hidden ml-6">
          {!open ? (
            <FiMenu
              onClick={() => setOpen(!open)}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <FiX
              onClick={() => setOpen(!open)}
              className="text-2xl cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Responsive Navigation Menu */}
      {open && (
        <nav className="md:hidden absolute top-20 left-0 w-full bg-slate-400 px-4 py-2">
          <ul className="flex flex-col items-center space-y-6">
            <Link href={"/"}>Home</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/studio"}>Studio</Link>
            <Link href={"/contact"}>Contact</Link>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
