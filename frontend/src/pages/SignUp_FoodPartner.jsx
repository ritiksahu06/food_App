import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const SignUp_FoodPartner = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const contactName = e.target.contactName.value;

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/food-partner/register`,
      {
        name,
        email,
        password,
        phone,
        address,
        contactName
      },
      {
        withCredentials: true
      }
    );

    console.log(response.data);

    navigate("/create-food");
  };
  
  return (
    <div className="flex bg-gray-100 justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl px-8 pt-8 pb-10 w-full max-w-md transition hover:shadow-xl">
        <h2 className="text-4xl font-bold mb-6 text-center">
          <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
            Sign Up
          </span>
        </h2>

        <h3 className="text-center flex justify-center items-center gap-2 text-sm font-medium mb-6 text-gray-600">
          <span>Switch:</span>
          <Link
            to="/user/signup"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            User
          </Link>
          <span>•</span>
          <Link
            to="/food-partner/signup"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Food Partner
          </Link>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Business Name */}
          <div>
            <label
              htmlFor="businessName"
              className="text-sm font-medium text-gray-700"
            >
              BUSINESS NAME
            </label>
            <input
              id="businessName"
              name="name"
              type="text"
              placeholder="Tasty-Bites"
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          {/* Contact Info */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="contactName"
                className="text-sm font-medium text-gray-700"
              >
                CONTACT NAME
              </label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                placeholder="John Doe"
                className="w-full p-2 rounded-md border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                PHONE
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="+91 9876543210"
                className="w-full p-2 rounded-md border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              />
            </div>
          </div>

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

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              ADDRESS
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="123 Market Street"
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          {/* Signup Button */}
          <button className="w-full p-2 text-white rounded-xl mt-4 shadow bg-blue-500 hover:bg-blue-600 active:scale-[0.98] transition">
            Signup
          </button>

          {/* Already Have Account */}
          <p className="text-gray-700 text-sm text-center mt-3">
            Already have an account?
            <Link
              to="/food-partner/login"
              className="text-blue-500 hover:text-blue-700 font-semibold ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp_FoodPartner;
