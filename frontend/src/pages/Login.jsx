import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:4000/api/auth/user/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);

    navigate("/");
  };

  return (
    <div className="flex bg-gray-200 justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-4xl font-bold mt-6 mb-6 text-center">
          <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
            Login
          </span>
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="py-6 space-y-4 rounded">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className="w-full p-2 rounded-md border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                PASSWORD
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className="w-full p-2 rounded-md border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full p-2 text-white rounded-2xl mt-4 shadow bg-blue-500 hover:bg-blue-600 transition"
            >
              Login
            </button>

            {/* Signup Redirect */}
            <p className="text-gray-900 text-sm text-center mt-2">
              Don’t have an account?
              <Link
                to="/user/signup"
                className="text-blue-500 hover:text-blue-700 font-semibold ml-1"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
