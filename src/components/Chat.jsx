import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// import LoadingSpinner from "./LoadingSpinner"; // Import your LoadingSpinner component
import { useSelector } from "react-redux";
import { BASE_URL, createSocketConnections } from "../utils/const";
import axios from "axios";
import { div } from "framer-motion/client";

const Chat = () => {
  const { targetId } = useParams();
  // const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const userName = user?.name; // Current user's name
  const messagesEndRef = useRef(null);

  const fetchMsg = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetId, {
        withCredentials: true,
      });
      // Extract messages and map them to include userName from senderId.name
      const chatMsg = chat?.data?.messages.map((msg) => {
        return {
          text: msg.text,
          userName: msg.senderId.name, // Use senderId.name for the sender's name
          timestamp: msg.timestamp,
          senderId: msg.senderId._id, // Include senderId for comparison
        };
      });
      setMessages(chatMsg);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMsg();
  }, [userId, targetId]);

  useEffect(() => {
    const socket = createSocketConnections();

    if (!userId) return;
    socket.emit("joinChat", { userId, targetId });

    socket.on("msgRecieved", ({ userName, text, timestamp, senderId }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, userName, timestamp, senderId },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const socket = createSocketConnections();
    const newMessage = {
      userName,
      userId,
      targetId,
      text: newMsg,
    };
    socket.emit("sendMsg", newMessage);
    setNewMsg("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => {
          const isSender = userId === msg.senderId; // Compare senderId with current userId
          console.log(msg.userName, user.name, msg.senderId, targetId);
          return (
            <div
              key={index}
              className={`chat ${isSender ? "chat-end" : "chat-start"} `}
            >
              <div className="chat-header">
                {msg.userName}
                <time className="text-xs opacity-50"> 2 hrs ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Area */}
      <div className="bg-white p-4 shadow-md">
        <div className="flex items-center space-x-2">
          <form
            onSubmit={sendMessage}
            className="flex items-center space-x-2 w-full"
          >
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition shadow-md"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { BASE_URL, createSocketConnections } from "../utils/const";
// import axios from "axios";

// const Chat = () => {
//   const { targetId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const user = useSelector((store) => store.user);
//   const userId = user?._id;
//   const messagesEndRef = useRef(null);

//   const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetId, {
//       withCredentials: true,
//     });

//     console.log(chat?.data.messages);

//     const chatMessages = chat?.data?.messages.map((msg) => {
//       const { senderId, text } = msg;
//       return {
//         name: senderId?.name,
//         text,
//       };
//     });
//     setMessages(chatMessages);
//   };
//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId) {
//       return;
//     }
//     const socket = createSocketConnections();
//     // As soon as the page loaded, the socket connection is made and joinChat event is emitted
//     socket.emit("joinChat", {
//       name: user.name,
//       userId,
//       targetId,
//     });

//     socket.on("msgRecieved", ({ name, text }) => {
//       setMessages((messages) => [...messages, { name, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = () => {
//     const socket = createSocketConnections();
//     socket.emit("sendMsg", {
//       name: user.name,
//       userId,
//       targetId,
//       text: newMessage,
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
//       <h1 className="p-5 border-b border-gray-600">Chat</h1>
//       <div className="flex-1 overflow-scroll p-5">
//         {messages.map((msg, index) => {
//           console.log(user.name, msg.name);
//           return (
//             <div
//               key={index}
//               className={
//                 "chat " + (user.name === msg.name ? "chat-end" : "chat-start")
//               }
//             >
//               <div className="chat-header">
//                 {msg.name}
//                 <time className="text-xs opacity-50"> 2 hours ago</time>
//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               <div className="chat-footer opacity-50">Seen</div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="p-5 border-t border-gray-600 flex items-center gap-2">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border border-gray-500 text-white rounded p-2"
//         ></input>
//         <button onClick={sendMessage} className="btn btn-secondary">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Chat;
