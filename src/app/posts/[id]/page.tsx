import DisplaySingleblogs from '@/components/Blogs/DisplaySingleBlogs';
import HomeBlog from '@/components/Blogs/HomeBlog';
import React from 'react'

const page = ({
  params: { id },
}: {
  params: {
    id: any;
  };
}) => {
  return (
    <div>
      <DisplaySingleblogs id={id}  />
    </div>
  )
}

export default page