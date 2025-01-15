import React from "react";

// eslint-disable-next-line react/prop-types
const Card = ({ user }) => {
  return (
    <div className="flex flex-col my-24 items-center bg-pink-100 p-6 min-h-screen relative">
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
              {profile.name}, {profile.age} ,{profile.gender.slice(0, 1)}
            </h2>
            <p className="text-gray-600 mt-2">{profile.bio}</p>
          </div>

          {/* Actions */}
          {index === 0 && (
            <div className="flex justify-around p-4 bg-red-300 rounded-b-3xl">
              <button
                // onClick={() => onPass(profile.id)}
                className="flex items-center justify-center bg-pink-600 text-white w-14 h-10 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-110"
              >
                <span className="material-icons">LIKE</span>
              </button>
              <button
                // onClick={() => onLike(profile.id)}
                className="flex items-center justify-center bg-black text-white w-14 h-10 rounded-lg shadow-lg transition-transform transform hover:scale-110"
              >
                <span className="material-icons">DISLIKE</span>
              </button>
              <button
                // onClick={() => onSuperLike(profile.id)}
                className="flex items-center justify-center bg-slate-50 text-black w-14 h-10 rounded-lg shadow-inner transition-transform transform hover:scale-110"
              >
                <span className="material-icons">STAR</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Card;
