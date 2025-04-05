import React from 'react';
import Navbar from './Navbar';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md mt-6 space-y-4">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <FaEnvelope className="text-blue-500" /> Contact Us
        </h1>
        <p className="text-gray-700 flex items-center gap-2">
          <FaPhone className="text-green-500" /> +91 98765 43210
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FaEnvelope className="text-red-500" /> support@hospitalapp.com
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FaMapMarkerAlt className="text-yellow-500" /> MIT ADT University, Pune, India
        </p>
      </div>
    </>
  );
}

export default Contact;
