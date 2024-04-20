import Link from "next/link";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Homepost = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className=" bg-white p-6 rounded-lg shadow-md">
        <span>{<Skeleton height={180} borderRadius={10} />}</span>
        <br />
        <h3 className="text-xl mb-2">{<Skeleton />}</h3>
        <h5 className="text-sm mb-2">{<Skeleton />}</h5>
        <div className="flex items-center gap-3 mt-4 mb-2">
          <span>{<Skeleton width={30} height={30} circle />}</span>
          <span className="text-sm ">
            {<Skeleton width={150} height={20} />}
          </span>
        </div>
        <span className="text-xs">{<Skeleton />}</span>
        <br />
        <p className="">{<Skeleton count={3} />}</p>
        <br />
      </div>
    </div>
  );
};

export default Homepost;
