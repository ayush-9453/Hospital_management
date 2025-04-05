import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.agree) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const { name, email, password } = formData;
      await axios.post("http://127.0.0.1:5000/register", { name, email, password });
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[90%] max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Register</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Re-enter Password"
          onChange={handleChange}
          value={formData.confirmPassword}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="flex items-center mb-4 text-sm">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mr-2"
          />
          I agree to the <span className="text-blue-600 underline ml-1 cursor-pointer">Terms & Conditions</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>

        <div className="text-center mt-4">
          <span className="text-sm">Already have an account?</span>{' '}
          <Link
            to="/"
            className="text-blue-500 font-medium hover:underline ml-1"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
