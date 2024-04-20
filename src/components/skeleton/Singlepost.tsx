import Link from "next/link";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Singlepost = () => {
  return (
    <SkeletonTheme enableAnimation baseColor="#ebebeb" highlightColor="#f5f5f5">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-2">{<Skeleton />}</h1>
        <p className="text-gray-600 text-lg mb-4">{<Skeleton />}</p>
        <div className="flex items-center mb-4">
          <span className="mr-2"> {<Skeleton width={40} height={40} circle/>} </span>
          <span className="font-bold mr-2">{ <Skeleton width={150} height={20} />}</span>
          <span className="text-gray-600">{<Skeleton width={200} height={20} />}</span>
        </div>
        <span className="w-full rounded-lg mt-8">{<Skeleton height={300} />} </span>
        <div className="max-w-prose mt-5 text-xl">{<Skeleton count={5} />}</div>
      </div>
    </SkeletonTheme>
  );
};

export default Singlepost;
