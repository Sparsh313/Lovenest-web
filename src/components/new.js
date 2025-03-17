// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// // import LoadingSpinner from "./LoadingSpinner"; // Import your LoadingSpinner component
// import { useSelector } from "react-redux";
// import { BASE_URL, createSocketConnections } from "../utils/const";
// import axios from "axios";

// const Chat = () => {
//   const { targetId } = useParams();
//   // const [isLoading, setIsLoading] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const [newMsg, setnewMsg] = useState("");
//   const user = useSelector((store) => store.user);
//   const userId = user?._id;
//   const userName = user?.name;
//   const socket = createSocketConnections();

//   const fetchMsg = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetId, {
//       withCredentials: true,
//     });
//     console.log(chat.data.messages[0].text);

//     const chatMsg = chat?.data?.messages.map((msg) => {
//       return { text: msg.text };
//     });
//     setMessages(chatMsg);
//   };

//   useEffect(() => {
//     fetchMsg();
//   }, []);

//   useEffect(() => {
//     if (!userId) return;
//     // As soon as page loads , socket conn is made and join chat is triggered
//     socket.emit("joinChat", { userId, targetId, userName });

//     socket.on("msgRecieved", ({ userName, text }) => {
//       setMessages((message) => [...message, { userName, text }]);
//     });

//     // Ads soon as page unloads disconnect
//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetId, userName]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (newMsg.trim()) {
//       socket.emit("sendMsg", { userName, userId, targetId, text: newMsg });
//       setnewMsg("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex flex-col">
//       {/* Header */}
//       <div className="bg-white p-2 shadow-2xl">
//         <div className="flex items-center space-x-3">
//           <img
//             className="w-16 h-14 rounded-full"
//             src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0IeMae3cvabM5O5iS278DYeZIPMPJREPkHD5wPIUB8ytZgPdMmUKXw73QBHIvEFsn-pDU3qKZqvOH253zryv2TA"
//             alt=""
//           />
//           <div>
//             <h1 className="font-semibold text-lg text-pink-700">{userName}</h1>
//             <p className="text-sm text-gray-500">Online</p>
//           </div>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 p-4 overflow-y-auto">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex ${
//               msg.userName === userName ? "justify-end" : "justify-start"
//             } mb-4`}
//           >
//             <div
//               className={`max-w-[70%] p-3 rounded-lg ${
//                 msg.userName === userName
//                   ? "bg-pink-600 text-white"
//                   : "bg-white text-gray-800"
//               } shadow-md`}
//             >
//               <p>{msg.text}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Area */}
//       <div className="bg-white p-4 shadow-md">
//         <div className="flex items-center space-x-2">
//           <form
//             onSubmit={sendMessage}
//             className="flex items-center space-x-2 w-full"
//           >
//             <input
//               value={newMsg}
//               onChange={(e) => setnewMsg(e.target.value)}
//               type="text"
//               placeholder="Type a message..."
//               className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//             />
//             <button
//               // onClick={sendMessage}
//               className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition shadow-md"
//             >
//               Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner"; // Import your LoadingSpinner component
import { useSelector } from "react-redux";
import { BASE_URL, createSocketConnections } from "../utils/const";
import axios from "axios";

const Chat = () => {
  const { targetId } = useParams();
  // const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMsg, setnewMsg] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const userName = user?.name;
  const socket = createSocketConnections();

  const fetchMsg = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetId, {
      withCredentials: true,
    });
    console.log(chat.data.messages[0].text);

    const chatMsg = chat?.data?.messages.map((msg) => {
      return { text: msg.text };
    });
    setMessages(chatMsg)
  };

  useEffect(() => {
    fetchMsg();
  }, []);

  useEffect(() => {
    if (!userId) return;
    // As soon as page loads , socket conn is made and join chat is triggered
    socket.emit("joinChat", { userId, targetId, userName });

    socket.on("msgRecieved", ({ userName, text }) => {
      setMessages((message) => [...message, { userName, text }]);
    });

    // Ads soon as page unloads disconnect
    return () => {
      socket.disconnect();
    };
  }, [userId, targetId, userName]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMsg.trim()) {
      socket.emit("sendMsg", { userName, userId, targetId, text: newMsg });
      setnewMsg("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex flex-col">
      {/* Header */}
      <div className="bg-white p-2 shadow-2xl">
        <div className="flex items-center space-x-3">
          <img
            className="w-16 h-14 rounded-full"
            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0IeMae3cvabM5O5iS278DYeZIPMPJREPkHD5wPIUB8ytZgPdMmUKXw73QBHIvEFsn-pDU3qKZqvOH253zryv2TA"
            alt=""
          />
          <div>
            <h1 className="font-semibold text-lg text-pink-700">{userName}</h1>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.userName === userName ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.userName === userName
                  ? "bg-pink-600 text-white"
                  : "bg-white text-gray-800"
              } shadow-md`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
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
              onChange={(e) => setnewMsg(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              // onClick={sendMessage}
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