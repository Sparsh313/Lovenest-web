import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlice";
import Card from "./Card";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      // console.log(res.data.feed);
      dispatch(addfeed(res.data.feed));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  });
  if (!feed) return;

  if (feed.length <= 0)
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center p-6">
        <p className="text-gray-600 text-lg ">
          No connections yet. Start exploring! 💕
        </p>
      </div>
    );
  return (
    feed && (
      <div>
        <Card user={feed} />
      </div>
    )
  );
};

export default Feed;
