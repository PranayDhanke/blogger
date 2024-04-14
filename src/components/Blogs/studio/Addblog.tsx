"use client";
import Navbar from "@/components/Home/Navbar";
import { auth, firestore } from "@/database/firebase/Firebase";
import { useEffect, useState } from "react";
import CreateBlog from "../../../components/Blogs/studio/CreateBlog";
import Link from "next/link";
import Notsignin from "@/components/Home/Notsignin";

export default function AddBlog() {
  const [user, setUser] = useState(false);
  const [username, setusername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(true);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar />
      {user ? (
        <CreateBlog />
      ) : (
        <Notsignin title="create" />
      )}
    </div>
  );
}
