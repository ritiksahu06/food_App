import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [foodItems, setFoodItems] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/food`, { withCredentials: true })
      .then((response) => {
        setFoodItems(response.data.foodItems || []);
        // console.log("Fecting food vidoes successfully", response.data.foodItems);
      })
      .catch((error) => {
        // console.error("Error fetching food videos:", error);
        if (error.response && error.response.status === 401) {
          navigate("/user/login", { replace: true });
        }
      });
  }, []);

  const handleLogout = async () => {
  try {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user/logout`, {
      withCredentials: true
    });

    // Redirect to login
    window.location.href = "/user/login";
  } catch (error) {
    console.log(error);
  }
};


  async function handleSave(item) {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/food/save`,
      { foodId: item._id },
      { withCredentials: true }
    );
    setFoodItems((prev) =>
      prev.map((s) =>
        s._id === item._id
          ? {
              ...s,
              saveCount: response.data.isSave
                ? s.saveCount + 1
                : s.saveCount - 1,
              isSave: response.data.isSave,
            }
          : s
      )
    );
  }

  async function handleLike(item) {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/food/like`,
      { foodId: item._id },
      { withCredentials: true }
    );

    setFoodItems((prev) =>
      prev.map((f) =>
        f._id === item._id
          ? {
              ...f,
              likeCount: response.data.isLiked
                ? f.likeCount + 1
                : f.likeCount - 1,
              isLiked: response.data.isLiked,
            }
          : f
      )
    );
  }

  const handleScroll = (e) => {
    const scrollY = e.target.scrollTop;
    const screenHeight = window.innerHeight;
    const index = Math.round(scrollY / screenHeight);

    if (index !== currentVideo) {
      setCurrentVideo(index);
      videoRefs.current.forEach((v, i) => {
        if (!v) return;
        if (i === index) {
          setTimeout(() => v.play().catch(() => {}), 100);
        } else {
          v.pause();
        }
      });
    }
  };

  return (
    <div
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative"
      onScroll={handleScroll}
    >
      {foodItems.length === 0 ? (
        <div className="h-screen flex justify-center items-center text-xl text-gray-600">
          Loading food videos...
        </div>
      ) : (
        foodItems.map((item, i) => (
          <div
            key={item._id || i}
            className="h-screen w-full flex items-center justify-center snap-start relative"
          >
            {/* Video */}
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={item.video}
              className="object-cover
    w-full h-screen         
    sm:h-screen
    md:h-screen
    lg:h-screen "
              muted
              loop
              playsInline
              autoPlay={i === 0}
              onClick={(e) =>
                e.target.paused ? e.target.play() : e.target.pause()
              }
            />

            {/* Right Icons */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-8 text-white text-center">
              {/* Like */}
              <div className="flex flex-col items-center">
                <svg
                  onClick={() => handleLike(item)}
                  // xmlns="http://www.w3.org/2000/svg"
                  // fill="none"
                  fill={item.isLiked ? "red" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={item.isLiked ? "red" : "white"}
                  // stroke="white"
                  className="w-8 h-8 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.622 1.12-4.312 2.737C11.31 4.87 9.623 3.75 7.688 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <p className="text-white text-sm">{item.likeCount}</p>
              </div>

              {/* Save */}
              <div className="flex flex-col items-center">
                <svg
                  onClick={() => handleSave(item)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-8 h-8 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 3.75H6.75A2.25 2.25 0 004.5 6v14.25L12 16.5l7.5 3.75V6a2.25 2.25 0 00-2.25-2.25z"
                  />
                </svg>
                <p className="text-white text-sm">{item.saveCount}</p>
              </div>

              {/* Comment */}
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-8 h-8 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.806 9-8.5S16.97 3.25 12 3.25 3 7.056 3 11.75c0 2.107.79 4.04 2.106 5.577L4.5 20.25l3.176-.952A10.45 10.45 0 0012 20.25z"
                  />
                </svg>
                <p className="text-white text-sm">Comment</p>
                <p className="text-white text-sm">{}</p>
              </div>
            </div>

            {/* Text */}
            <div className="absolute bottom-36 left-4 text-white text-2xl font-semibold drop-shadow-md">
              {item.name}
            </div>
            <div className="absolute bottom-28 left-4 text-white text-lg drop-shadow-md">
              {item.description}
            </div>

            {/* Store Button */}
            <Link
              to={`/food/partner/${item.foodPartner}`}
              className=" fixed bottom-16 left-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-200 z-20"
            >
              View Store
            </Link>
          </div>
        ))
      )}

      {/* Bottom Separator */}
      <hr className="border-t border-white/10 w-full" />

      {/* Fixed Bottom Bar */}
      <div
        className="fixed bottom-0 w-full h-14 flex text-white
        bg-black/10 backdrop-blur-sm border-t border-white/10 z-30"
      >
        {/* Home */}
        <div className="w-1/3 flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"
            />
          </svg>
          <Link to="/" className="text-xs">
            Home
          </Link>
        </div>

        {/* Save */}
        <div className="w-1/3 flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 3.75H6.75A2.25 2.25 0 004.5 6v14.25L12 16.5l7.5 3.75V6a2.25 2.25 0 00-2.25-2.25z"
            />
          </svg>
          <Link to="/save" className="text-xs">
            Save
          </Link>


  
</div>
<div className="w-1/3 flex flex-col items-center justify-center">
    <svg
      onClick={handleLogout}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="w-6 h-6 cursor-pointer hover:scale-110 transition transform"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
      />
    </svg>
    <p className="text-white text-sm mt-1">Logout</p>
  </div>


        </div>
      </div>
  );
};

export default Home;
