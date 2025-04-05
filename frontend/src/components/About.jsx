import React from 'react';
import Navbar from './Navbar';
import { FaInfoCircle } from 'react-icons/fa';

function About() {
  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md mt-6">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" /> About Us
        </h1>
        <p className="text-gray-700 text-lg">
          Our Hospital Management System is designed to streamline workflows and
          improve patient care by providing a user-friendly and secure platform
          for managing appointments, billing, reports, and doctor-patient communication.
        </p>
      </div>
    </>
  );
}

export default About;
