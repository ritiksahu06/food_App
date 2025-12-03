import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:4000/api/auth/user/register",
      {
        fullName: name,
        email,
        password,
      },
      {
        withCredentials: true
      }
    );

    console.log(response.data);

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 sm:p-8">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Sign Up
          </span>
        </h2>

        {/* Switch Links */}
        <h3 className="text-center text-sm sm:text-base font-medium mb-6 flex flex-wrap justify-center gap-2">
          <span>Switch:</span>
          <span>•</span>
          <Link
            to="/user/signup"
            className="text-blue-500 hover:text-blue-700 transition"
          >
            User
          </Link>
          <Link
            to="/food-partner/signup"
            className="text-blue-500 hover:text-blue-700 transition"
          >
            Food Partner
          </Link>
        </h3>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="w-full p-2 sm:p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className="w-full p-2 sm:p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="w-full p-2 sm:p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2 sm:py-3 text-white rounded-xl shadow bg-blue-500 hover:bg-blue-600 transition font-semibold"
          >
            Sign Up
          </button>

          {/* Already have account */}
          <p className="text-gray-700 text-sm text-center mt-4">
            Already have an account?
            <Link
              to="/user/login"
              className="text-blue-500 hover:text-blue-700 font-semibold ml-1 transition"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
