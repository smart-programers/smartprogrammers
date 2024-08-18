"use client";

import { LucideMoon, LucideSunMoon } from 'lucide-react';
import React, { useState } from 'react';
import { FaBell, FaRegUser } from "react-icons/fa6";

const TopBar: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");

  const handleThemeToggle = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center shadow-sm transition-colors duration-300">
      <div className="w-full max-w-lg">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-blue-400"
          placeholder="Search for courses..."
        />
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
        <div className="relative group">
          <button className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <FaRegUser />
          </button>

          {/* Dropdown Menu for User Profile */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Profile
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
