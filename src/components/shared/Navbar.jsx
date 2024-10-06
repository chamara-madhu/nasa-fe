import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-black shadow-lg h-14">
      <div className="w-full px-4">
        <div className="flex items-center justify-between py-4">
          <div className="">
            <h1 className="text-white">Coding Challenge!</h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
