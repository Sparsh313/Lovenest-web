import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/const";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  console.log(connection);

  const getConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);
  if (!connection) return;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Your Connections ❤️
      </h1>
      {connection.length === 0 ? (
        <p className="text-gray-600 text-lg">
          No connections yet. Start exploring! 💕
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connection.map((connection) => (
            <div
              key={connection.id}
              className="flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4 hover:scale-105 transition transform duration-200"
            >
              <img
                src={connection.photo}
                alt={`${connection.name}'s profile`}
                className="w-14 h-14 rounded-full border-2 border-pink-500"
              />
              <div>
                <h2 className="text-lg font-semibold text-pink-600">
                  {connection.name.charAt(0).toUpperCase() +
                    connection.name.slice(1)}
                  , {connection.age}
                </h2>

                <p className="text-sm text-gray-500">Connected with you 💖</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
