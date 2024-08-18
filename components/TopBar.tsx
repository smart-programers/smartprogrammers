"use client"

import { LucideMoon, LucideSunMoon } from 'lucide-react';
import React, { useState } from 'react';
import { FaBell, FaRegUser } from "react-icons/fa6";

const TopBar: React.FC = () => {
  const [toggleTheme, setToggleTheme] = useState<boolean>(false)
  const [theme,setTheme] = useState<string>("light")

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center shadow-sm">
      <div className="w-full max-w-lg">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search for courses..."
        />
      </div>
      <div className="ml-4 flex items-center">
      {theme === "light" ? (
        <button
          className="mr-4 p-2 rounded-full bg-white shadow"
          onClick={() => setTheme("dark")}
        >
          <LucideMoon />
        </button>
      ) : (
        <button
          className="mr-4 p-2 rounded-full bg-white shadow"
          onClick={() => setTheme("light")}
        >
          <LucideSunMoon />
        </button>
      )}


        <button className="mr-4 p-2 rounded-full bg-white shadow"
        onClick={()=>setTheme("light")}>
          <FaBell color='#FFC300' />
        </button>
        <div className="relative">
          <button className="mr-4 p-2 rounded-full bg-white shadow">
            <FaRegUser />
          </button>
          
        </div>
      </div>
    </header>
  );
};

export default TopBar;
