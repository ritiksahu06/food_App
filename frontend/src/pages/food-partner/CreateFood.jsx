import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const CreateFood = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('video', file)

    const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/food`, formData, {
      withCredentials: true,
    })
navigate('/')
    console.log(response.data)

  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="bg-[#01173b] min-h-screen w-full p-6 flex justify-center">
      <div className="p-6 bg-[#072960] rounded-2xl shadow-xl w-full max-w-2xl space-y-6">

        {/* Heading */}
        <div className="space-y-1">
          <h1 className="text-gray-100 text-3xl font-bold tracking-wide">
            Create Food
          </h1>
          <p className="text-gray-400">
            Upload a video, give it a name, and write a small description.
          </p>
        </div>

        {/* Video Upload */}
       {/* Video Upload */}
<div className="space-y-2">
  <p className="font-bold text-gray-400 text-sm">FOOD VIDEO</p>

  {/* Stylish Upload Box */}
  <div
    className="p-8 bg-[#0f2c63] rounded-xl shadow-xl border-2  border-blue-400
               flex flex-col items-center justify-center text-center cursor-pointer
               hover:bg-[#123579] hover:border-blue-300 transition group"
  >
    <label className="w-full cursor-pointer flex flex-col items-center">
      {/* Upload Icon */}
      <svg
        className="w-12 h-12 text-blue-300 group-hover:text-blue-200 mb-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
        <path d="M12 12V4m0 0l-4 4m4-4l4 4" />
      </svg>

      <p className="text-gray-300 group-hover:text-gray-200 text-sm">
        Click to upload food video
      </p>

      <input
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>

    {/* If File Selected */}
    {file && (
      <p className="text-green-300 mt-3 text-sm font-medium">
        Selected: {file.name}
      </p>
    )}
  </div>
</div>


        {/* Name Input */}
        <div className="space-y-2">
          <p className="font-bold text-gray-400 text-sm">NAME</p>
          <input
            type="text"
            placeholder="e.g. Spicy Paneer Wrap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-[#021d4d] text-gray-200 rounded-lg 
                       border border-gray-600 outline-none 
                       focus:border-blue-400"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="font-bold text-gray-400 text-sm">DESCRIPTION</p>
          <textarea
            rows="4"
            placeholder="Write a short description: ingredients, taste, spice level etc..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-[#021d4d] text-gray-200 rounded-lg 
                       border border-gray-600 outline-none 
                       focus:border-blue-400"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 
                          text-gray-200 font-semibold py-3 rounded-xl 
                          shadow-md transition">
          Save Food
        </button>
      </div>
    </div>
  );
};

export default CreateFood;



