"use client";
import React from "react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="flex h-screen">
      <div className={`${isOpen ? "w-64" : "w-16"} bg-gray-800 text-white flex flex-col transition-all duration-300`}>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {/* <Link href="/" className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700">
            <IoHome />
          </Link> */}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
