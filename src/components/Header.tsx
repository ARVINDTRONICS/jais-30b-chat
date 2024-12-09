"use client";
import Image from "next/image";
import React, { useState } from "react";
import ToggleButton from "./ToggleButton";


const Header = () => {


  return (
    <header className="bg-white text-white py-4 px-6 flex items-center h-16 justify-between shadow-md z-10 ">
      <div className="flex items-center space-x-3">
        <Image width="100" height="100" alt="jais-logo" src={"https://jais-auth.inceptionai.ai/resources/h5itl/login/jais-inception/build/static/media/jaisv2.904f9c82713ac92e1134be503f49e102.svg"}></Image>
      </div>

      <div className="hidden md:flex items-center">
        <h2 className="text-lg text-gray-800">Welcome to JAIS Chat</h2>
      </div>

    
      <div className="flex items-center space-x-4">
        {/* <ToggleButton labelOn="Light" labelOff="Dark" /> */}
      </div>
    </header>
  );
};

export default Header;
