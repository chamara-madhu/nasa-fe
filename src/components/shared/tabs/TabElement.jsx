import React from "react";

const TabElement = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 text-sm font-medium ${
        isActive
          ? "border-b-2 border-pp-primary-300 bg-pp-primary-300 text-pp-primary-700"
          : "text-gray-500 border-b-2 border-pp-primary-300"
      }`}
    >
      {children}
    </button>
  );
};

export default TabElement;
