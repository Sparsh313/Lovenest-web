import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  console.log(request);

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + `/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(res.data.data);
      console.log(id);
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };

  const getRequest = async () => {
    try {
      if (request) return;
      const res = await axios.get(BASE_URL + "/user/request", {
        withCredentials: true,
      });
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
    request && (
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

                  <p className="text-sm text-gray-500">
                    Wants to follow you 💕
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      reviewRequest("accepted", request.fromUserId._id)
                    }
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 px-3 rounded-lg transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      reviewRequest("rejected", request.fromUserId._id)
                    }
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
    )
  );
};

export default Request;
