// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const Profile = () => {
//   const user = useSelector((store) => store.user);
//   const getProfile = async () => {
//     if (user) return;
//   };
//   useEffect(() => {
//     getProfile();
//   });

//   return (
//     user && (
//       <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center">
//         <div className="bg-gray-900 text-white w-80 rounded-3xl shadow-xl overflow-hidden border border-gray-700">
//           {/* Profile Picture */}
//           <div className="relative">
//             <img
//               src={user.photo}
//               alt={`${user.name}'s user`}
//               className="w-full h-60 object-cover"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
//             <div className="absolute bottom-4 left-4">
//               <h2 className="text-xl font-bold flex items-center">
//                 {user.name}, {user.age}
//               </h2>
//             </div>
//           </div>
//           {/* gender */}
//           <div className="px-4 text-gray-300 text-sm mb-2">{user.gender}</div>
//           {/* Skills Section */}
//           <div className="px-4 py-2">
//             <h3 className="text-lg font-semibold mb-2">Skills</h3>
//             <div className="flex flex-wrap gap-2">
//               {user.skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="bg-pink-600 text-white text-sm px-3 py-1 rounded-full"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//           {/* Edit Info Button */}
//           <div className="px-4 py-4">
//             <Link to="/profile/edit">
//               <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition">
//                 ✋ Edit Info
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   );

// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner"; // Import the LoadingSpinner component

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const getProfile = async () => {
    try {
      // Simulate an API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Show profile data once loading is complete
  return (
    user && (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center">
        <div className="bg-gray-900 text-white w-80 rounded-3xl shadow-xl overflow-hidden border border-gray-700">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={user.photo}
              alt={`${user.name}'s user`}
              className="w-full h-60 object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <h2 className="text-xl font-bold flex items-center">
                {user.name}, {user.age}
              </h2>
            </div>
          </div>
          {/* Gender */}
          <div className="px-4 text-gray-300 text-sm mb-2">{user.gender}</div>
          {/* Skills Section */}
          <div className="px-4 py-2">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-pink-600 text-white text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* Edit Info Button */}
          <div className="px-4 py-4">
            <Link to="/profile/edit">
              <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition">
                ✋ Edit Info
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;