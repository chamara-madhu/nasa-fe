import React from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../content/passenger/side-bar/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="relative flex w-full">
        <Sidebar />
        <div
          className="relative flex flex-col w-full p-5"
          style={{ width: "calc(100% - 300px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
