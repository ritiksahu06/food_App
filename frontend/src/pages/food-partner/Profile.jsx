import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [totalMeal, setTotalMeal] = useState(0);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
        setTotalMeal(response.data.foodPartner.totalVideos);
      });
  }, [id]);

  return (
    <div className="bg-[#01173b] min-h-screen w-full p-4">
      <div className="bg-[#072960] rounded shadow-lg p-4 max-w-md mx-auto">
        {/* Image + Details */}
        <div className="flex flex-col items-center gap-4">
          {/* Profile Image */}
          <img
            src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#ffffff50] shadow-md"
          />

          {/* Name */}
          <div className="bg-[#0c3b85] text-gray-200 font-bold text-xl px-4 py-2 rounded-xl shadow-md border border-[#ffffff30]">
            {profile?.name}
          </div>

          {/* Address */}
          <div className="bg-[#0c3b85] text-gray-200 text-base px-4 py-2 rounded-xl shadow-md border border-[#ffffff30] text-center">
            {profile?.address}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-white opacity-30" />

        {/* Stats */}
        <div className="flex justify-around text-center">
          <div className="flex flex-col items-center">
            <p className="font-semibold text-gray-300 text-lg">Total Meal</p>
            <p className="text-2xl font-bold text-white mt-1">{totalMeal}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold text-gray-300 text-lg">Customer Serve</p>
            <p className="text-2xl font-bold text-white mt-1">120K</p>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="grid grid-cols-1 gap-2 mt-6 max-w-md mx-auto">
        {videos.map((v) => (
          <video
            key={v._id}
            src={v.video}
            className="w-full h-64 object-cover rounded-md"
            muted
            loop
            playsInline
            controls
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
