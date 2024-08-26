"use client"

import { useEffect, useState } from "react";
import { LucideMoon, LucideSunMoon } from 'lucide-react';
import { FaBell } from "react-icons/fa";

export default function ToggleTheme(){
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

    return(
        <>
<button
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={handleThemeToggle}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <LucideMoon /> : <LucideSunMoon />}
        </button>

<button
className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
aria-label="Notifications"
>
<FaBell color={theme === "light" ? "#FFC300" : "#FFEB3B"} />
</button>
</>
    )
}