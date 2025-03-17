import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300">
      <div className="relative">
        <div className="w-12 h-12 bg-pink-500 animate-ping rounded-full absolute"></div>
        <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center shadow-lg">
          💖
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
