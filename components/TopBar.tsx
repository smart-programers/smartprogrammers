

import { LucideMoon, LucideSunMoon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaBell, FaRegUser } from "react-icons/fa6";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ToggleTheme from './ToggleTheme';
import { getUser } from '@/app/actions/user';
import TopSidebar from './Navbar/TopSidebar';
import { RankingsDialog } from './Rankings';

export default async function TopBar(){
  
  const user = await getUser()

  console.log(user)
  return (
    <header className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center shadow-sm transition-colors duration-300">
     <TopSidebar/>
      <div className="w-full max-w-lg">
        <Link href="/" className=''><b><span className='text-yellow-500'>Smart</span></b>Programmers</Link>
      </div>
      <div className="ml-4 flex items-center space-x-4">
        <RankingsDialog />
        {/* Theme Toggle */}
      <ToggleTheme/>

        {/* Notification Bell */}
     

        {/* User Profile */}
        <HoverCard>
       
        {/* <div className="relative group"> */}
        <HoverCardTrigger>
          <button className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <FaRegUser />
          </button>
          </HoverCardTrigger>

          {/* Dropdown Menu for User Profile */}
          {user.success === true ?(
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
          </HoverCardContent>):(
 <HoverCardContent>
 {/* <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200"> */}
   <Link href="/auth/login" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
     Login
   </Link>
   <Link href="/auth/register" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
     Register
   </Link>
 
 {/* </div> */}
 </HoverCardContent>
          )}
        {/* </div> */}
        </HoverCard>
      </div>
    </header>
  );
};


