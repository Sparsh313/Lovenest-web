import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  console.log(request);

  const getRequest = async () => {
    try {
      if (request) return;
      const res = await axios.get(BASE_URL + "/user/request", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addRequest(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRequest();
  }, []);

  if (!request) return;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Follow Requests 💌
      </h1>

      {request.length === 0 ? (
        <p className="text-gray-600 text-lg">
          No follow requests at the moment! 💖
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {request.map((request) => (
            <div
              key={request.id}
              className="flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4 hover:scale-105 transition transform duration-200"
            >
              <img
                src={request.fromUserId.photo}
                alt={`${request.fromUserId.name}'s profile`}
                className="w-14 h-14 rounded-full border-2 border-pink-500"
              />
              <div className="flex-grow">
                <h2 className="flex text-lg font-semibold text-pink-600">
                  {request.fromUserId.name.charAt(0).toUpperCase() +
                    request.fromUserId.name.slice(1)}
                  , {request.fromUserId.age}
                </h2>

                <p className="text-sm text-gray-500">Wants to follow you 💕</p>
              </div>
              <div className="flex space-x-2">
                <button
                  // onClick={() => handleAccept(request.fromUserId.id)}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 px-3 rounded-lg transition"
                >
                  Accept
                </button>
                <button
                  // onClick={() => handleReject(request.fromUserId.id)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded-lg transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center p-6">
  //     {/* <h1 className="text-3xl font-bold text-pink-600 mb-6">
  //       Your Requests ❤️
  //     </h1> */}
  //     {request.length === 0 ? (
  //       <p className="text-gray-600 text-lg">
  //         No requests yet. Start exploring! 💕
  //       </p>
  //     ) : (
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {request.map((request) => (
  //           <div
  //             key={request.id}
  //             className="flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4 hover:scale-105 transition transform duration-200"
  //           >
  //             <img
  //               src={request.fromUserId.photo}
  //               alt={`${request.fromUserId.name}'s profile`}
  //               className="w-14 h-14 rounded-full border-2 border-pink-500"
  //             />
  //             <div>
  //               <h2 className="text-lg font-semibold text-pink-600">
  //                 {request.fromUserId.name.charAt(0).toUpperCase() +
  //                   request.fromUserId.name.slice(1)}
  //                 , {request.fromUserId.age}
  //               </h2>

  //               <p className="text-sm text-gray-500">Connected with you 💖</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );

  // return (
  //   <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-300 via-pink-100 to-pink-300 rounded-lg shadow-lg">
  //     {/* Profile Section */}
  //     <div className="flex items-center">
  //       <img
  //         //  src={profilePic}
  //         //  alt={`${name}'s profile`}
  //         className="w-12 h-12 rounded-full border-2 border-pink-500"
  //       />
  //       <div className="ml-4">
  //         <h2 className="text-lg font-bold text-pink-600">
  //           {name.charAt(0).toUpperCase() + name.slice(1)}
  //         </h2>
  //         <p className="text-sm text-gray-600">wants to follow you ❤️</p>
  //       </div>
  //     </div>
  //     {/* Action Buttons */}
  //     <div className="flex space-x-2">
  //       <button
  //         //  onClick={onAccept}
  //         className="bg-pink-500 hover:bg-pink-600 text-white py-1 px-4 rounded-lg transition duration-200"
  //       >
  //         Accept
  //       </button>
  //       <button
  //         //  onClick={onDecline}
  //         className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-4 rounded-lg transition duration-200"
  //       >
  //         Decline
  //       </button>
  //     </div>
  //   </div>
  // );
  // return (
  //   <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center p-6">
  //     <h1 className="text-3xl font-bold text-pink-600 mb-6">
  //       Your requests ❤️
  //     </h1>
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //       {request.map((connection) => (
  //         <div
  //           key={connection.id}
  //           className="flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4 hover:scale-105 transition transform duration-200"
  //         >
  //           <img
  //             src={connection.photo}
  //             alt={`${connection.name}'s profile`}
  //             className="w-14 h-14 rounded-full border-2 border-pink-500"
  //           />
  //           <div>
  //             <h2 className="text-lg font-semibold text-pink-600">
  //               {connection.name.charAt(0).toUpperCase() +
  //                 connection.name.slice(1)}
  //               , {connection.age}
  //             </h2>

  //             <p className="text-sm text-gray-500">Connected with you 💖</p>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default Request;
