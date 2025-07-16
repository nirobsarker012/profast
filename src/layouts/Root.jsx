import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

const Root = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Root;
