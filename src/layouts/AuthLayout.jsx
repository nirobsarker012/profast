import React from "react";
import ProfastLogo from "../pages/shared/ProfastLogo/ProfastLogo";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="container min-h-screen py-8">
      <div className="">
        <ProfastLogo />
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={authImg} className="max-w-sm rounded-lg shadow-2xl" />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
