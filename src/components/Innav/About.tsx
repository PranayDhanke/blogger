import Navbar from "@/components/Home/Navbar";
import React from "react";

const About = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto mt-8 bg-white p-8 rounded-md shadow-lg border border-gray-300">
        <h2 className="text-3xl font-extrabold mb-4">About Us</h2>
        <div>
          <p className="mb-4">
            Welcome to our website! We are a passionate team dedicated to
            sharing valuable information and insights with our audience. Whether
            youre looking for educational content, inspiration, or just want to
            stay updated on the latest trends, youre in the right place.
          </p>
          <p className="mb-4">
            Our mission is to provide high-quality content that informs,
            inspires, and entertains. Feel free to explore our website and
            discover the diverse range of topics we cover. If you have any
            questions or feedback, dont hesitate to reach out to us through our{" "}
            <a className="text-blue-500 hover:underline" href="/contact">
              contact page
            </a>
          </p>
          <p>Thank you for being a part of our community!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
