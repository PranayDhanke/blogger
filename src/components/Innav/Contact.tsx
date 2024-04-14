import Navbar from '@/components/Home/Navbar'
import React from 'react'

const Contact = () => {


  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="  border border-black container mx-auto mt-16 bg-white p-8 rounded-md shadow-md sm:w-96 md:w-2/3 lg:w-1 xl:w-1/3">
    <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
      </div>
      <div>
        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
        <textarea id="message" name="message"className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required></textarea>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
        Submit
      </button>
    </form>
  </div>
    </div>
  )
}

export default Contact