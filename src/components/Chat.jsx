
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL, createSocketConnections } from "../utils/const";

const Chat = () => {
  const [targetUser, setTargetUser] = useState(null);
  const { targetId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const userName = user?.name;
  const scrollRef = useRef(null);

  const fetchMsg = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetId, {
        withCredentials: true,
      });
      console.log("Chat history payload:", res.data);
      const chatMsgs = res?.data?.messages.map((msg) => ({
        text: msg.text,
        senderId: msg.senderId,
      }));
      const userData = res?.data?.targetUser;
      setMessages(chatMsgs);
      setTargetUser(userData);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMsg();
  }, [userId, targetId]);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnections();

    socket.emit("joinChat", {
      userName,
      userId,
      targetId,
    });

    socket.on("messageReceived", ({ text, senderId }) => {
      setMessages((prev) => [...prev, { text, senderId }]);
    });

    return () => socket.disconnect();
  }, [userId, targetId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMsg.trim() === "") return;

    const socket = createSocketConnections();
    socket.emit("sendMessage", {
      name: user.firstName,
      userId,
      targetId,
      text: newMsg,
    });
    setNewMsg("");
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[80vh] mt-6 border border-gray-300 rounded-lg overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-gray-800 text-white px-6 py-4 flex items-center gap-4">
        {targetUser && (
          <>
            <img
              src={targetUser.photo}
              alt={targetUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-lg font-semibold">{targetUser.name}</span>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-4">
        {messages.map((msg, index) => {
          const isSender = userId === msg.senderId;
          console.log(`user:${userId} send to ${msg.senderId}`);
          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                  isSender
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-900 border rounded-bl-none"
                } shadow`}
              >
                <div className="text-sm font-semibold mb-1">
                  {msg.firstName} {msg.lastName || ""}
                </div>
                <div>{msg.text}</div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="flex p-4 border-t bg-white gap-2 items-center"
      >
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
