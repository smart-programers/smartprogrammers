"use client";

import { LucideMoon, LucideSunMoon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaBell, FaRegUser } from "react-icons/fa6";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
const TopBar: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");

  // Retrieve the theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Removing the previous theme class and add the new one
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);

    // Saving the selected theme to localStorage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center shadow-sm transition-colors duration-300">
      <div className="w-full max-w-lg">
        <h1 className=''><b><span className='text-yellow-500'>Smart</span></b>Programmers</h1>
      </div>
      <div className="ml-4 flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={handleThemeToggle}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <LucideMoon /> : <LucideSunMoon />}
        </button>

        {/* Notification Bell */}
        <button
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Notifications"
        >
          <FaBell color={theme === "light" ? "#FFC300" : "#FFEB3B"} />
        </button>

        {/* User Profile */}
        <HoverCard>
       
        {/* <div className="relative group"> */}
        <HoverCardTrigger>
          <button className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <FaRegUser />
          </button>
          </HoverCardTrigger>

          {/* Dropdown Menu for User Profile */}
          <HoverCardContent>
          {/* <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200"> */}
            <Link href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Profile
            </Link>
            <Link href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </Link>
            <Link href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Logout
            </Link>
          {/* </div> */}
          </HoverCardContent>
        {/* </div> */}
        </HoverCard>
      </div>
    </header>
  );
};

export default TopBar;
