import Link from "next/link";
import React from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div>
      <div>
        <h1 className="text-center mt-9 pb-10 ">
          <Link
            className="rounded-lg outline px-5 py-3"
            href={"/studio/createpost"}
          >
            Create Your Own Blogs
          </Link>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center bg-black text-white p-5 gap-5">
        <h1 className="text-xl text-center lg:text-left">Contact us on :</h1>
        <div className="flex items-center gap-2">
          <BsTwitter />
          <Link href={"https://twitter.com/pranaydhanke33?t=hrHjKL9cuivSUcV424V8ew&s=08"} className="cursor-pointer">
            <span>Twitter</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <BsLinkedin />
          <Link href={"https://in.linkedin.com/in/pranay-dhanke-176a66263"} className="cursor-pointer">
            <span>LinkedIn</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <BsGithub />
          <Link href={"https://github.com/PranayDhanke"} className="cursor-pointer">
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
