import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlice";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addfeed(res.data.feed));
    } catch (err) {
      console.log(err);
      alert("Failed to fetch feed. Please log in again.");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, [dispatch]); 

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center p-6">
        <p className="text-gray-600 text-lg">
          No connections yet. Start exploring! 💕
        </p>
      </div>
    );
  }

  return (
    <div>
      <Card user={feed} />
    </div>
  );
};

export default Feed;
