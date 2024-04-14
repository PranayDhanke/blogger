import Link from "next/link";
import React from "react";

const Notsignin = ({ title }: { title: string }) => {
  return (
    <div>
      <div className="text-center py-48 md:py-32">
        <div>
          <div>
            <h1 className="font-bold md:text-2xl lg:text-5xl pb-4 md:py-9">
              Hello
            </h1>

            <span className="font-bold md:text-2xl lg:text-5xl">
              Sign Up to {title} your Own Blog
            </span>
          </div>
        </div>

        <div className="py-4 md:py-9">
          <Link
            href={"/sign-in"}
            className="bg-gray-700 text-white px-4 py-2 rounded-md "
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notsignin;
