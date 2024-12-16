import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../Pages/Home/Shared/Navbar";
import Footer from "../Pages/Home/Shared/Footer";

const main = () => {
  return (
    <div>
      <Navbar />
      <div className="px-36">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default main;
