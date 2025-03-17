import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const Card = ({ user }) => {
  const dispatch = useDispatch();
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const sendRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + `/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSwipe = (direction, id) => {
    setSwipeDirection(direction);
    setIsSwiping(true);

    setTimeout(() => {
      sendRequest(direction === "left" ? "ignored" : "intrested", id);
      setIsSwiping(false);
      setSwipeDirection(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center">
      {user.map((profile, index) => (
        <div
          key={profile.id}
          className={`absolute w-80 max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden border-4 border-pink-200 transition-all duration-300 ease-in-out transform ${
            index === 0
              ? "z-20 scale-100 hover:scale-105"
              : index === 1
              ? "z-10 scale-95 translate-y-5 opacity-90"
              : "z-0 scale-90 translate-y-10 opacity-50"
          } ${
            isSwiping && index === 0
              ? swipeDirection === "left"
                ? "-translate-x-full opacity-0"
                : swipeDirection === "right"
                ? "translate-x-full opacity-0"
                : ""
              : ""
          }`}

        >
          {/* Profile Image with Heart Overlay */}
          <div className="relative">
            <img
              src={profile.photo}
              alt={`${profile.name}'s profile`}
              className="w-full h-60 object-cover rounded-t-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent rounded-t-3xl" />
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </div>

          {/* Profile Info */}
          <div className="relative p-6 text-center">
            <h2 className="text-2xl font-bold text-pink-700">
              {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)},{" "}
              {profile.age}
            </h2>
            <p className="text-gray-600 mt-2 italic">{profile.bio}</p>
          </div>

          {/* Actions */}
          {index === 0 && (
            <div className="flex justify-around p-4 bg-pink-100 rounded-b-3xl">
              <button
                onClick={() => handleSwipe("left", profile._id)}
                className="bg-white hover:bg-gray-100 text-pink-700 font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleSwipe("right", profile._id)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleSwipe("right", profile._id)}
                className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Card;
