import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
  return (
    <div>
      <div data-theme="valentine">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
