import EditBlog from "@/components/Blogs/studio/EditBlog";
import React from "react";

const page = ({
  params: { id },
}: {
  params: {
    id: any;
  };
}) => {
  return (
    <div>
      <EditBlog id={id} />
    </div>
  );
};

export default page;
