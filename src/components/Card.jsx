import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

// eslint-disable-next-line react/prop-types
const Card = ({ user }) => {
  const dispatch = useDispatch();
  console.log(user);

  const sendRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + `/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(id);
      dispatch(removeUserFromFeed(id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center">
      {user.map((profile, index) => (
        <div
          key={profile.id}
          className={`absolute w-80 max-w-md bg-white shadow-xl rounded-3xl overflow-hidden border-4 border-pink-200 transition-transform duration-300 ${
            index === 0
              ? "z-20 scale-100"
              : index === 1
              ? "z-10 scale-95 translate-y-5"
              : "z-0 scale-90 translate-y-10 opacity-50"
          }`}
        >
          {/* Profile Image */}
          <img
            src={profile.photo}
            alt={`${profile.name}'s profile`}
            className="w-full h-60 object-cover rounded-t-3xl"
          />

          {/* Profile Info */}
          <div className="relative p-6 text-center">
            <h2 className="text-2xl font-bold text-black">
              {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)},{" "}
              {profile.age} ,{profile.gender.slice(0, 1).toUpperCase()}
            </h2>
            <p className="text-gray-600 mt-2">{profile.bio}</p>
          </div>

          {/* Actions */}
          {index === 0 && (
            <div className="flex justify-around p-4 bg-red-300 rounded-b-3xl">
              <button
                onClick={() => sendRequest("intrested", profile._id)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 px-3 rounded-lg transition"
              >
                Like
              </button>{" "}
              <button
                onClick={() => sendRequest("ignored", profile._id)}
                className="bg-slate-800 hover:bg-black text-white font-semibold py-1 px-3 rounded-lg transition"
              >
                Dislike
              </button>{" "}
              <button
                onClick={() => sendRequest("intrested", profile._id)}
                className="bg-red-400 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg transition"
              >
                SuperLike
              </button>{" "}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Card;
