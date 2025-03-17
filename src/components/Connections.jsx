import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/const";
import { addConnection } from "../utils/connectionSlice";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
      setError("Failed to fetch connections. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-pink-700 mb-6">
        Your Connections 💖
      </h1>
      {connection.length === 0 ? (
        <p className="text-gray-600 text-lg">
          No connections yet. Start exploring! ✨
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {connection.map((user) => (
            <div
              key={user.id}
              className="flex flex-col items-center bg-white shadow-xl rounded-lg p-6 space-y-4 hover:shadow-2xl transition transform duration-200 hover:scale-105 relative border border-gray-200"
            >
              <img
                src={user.photo}
                alt={`${user.name}'s profile`}
                className="w-24 h-24 rounded-full border-4 border-pink-500 object-cover shadow-md"
              />
              <div className="text-center">
                <h2 className="text-xl font-semibold text-pink-700 capitalize">
                  {user.name}, {user.age}
                </h2>
                <p className="text-gray-500 text-sm">Connected with you 💖</p>
              </div>
              <Link to={`/chat/${user._id}`} className="justify-between">
                <button
                  className="absolute bottom-4 right-4 bg-pink-600 text-white rounded-full p-3 hover:bg-pink-700 transition duration-200 shadow-md flex items-center justify-center"
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;