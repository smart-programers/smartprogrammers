"use client";

import { useEffect, useState } from "react";
import { FaHome, FaUser, FaCog, FaComment, FaBook } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaLightbulb } from "react-icons/fa6";
import { TbHelpSquareRoundedFilled } from "react-icons/tb"
import { RiMenu2Line } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";

export default function TopSidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [open,setIsopen] = useState(false)
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
    <button className="block md:hidden lg:hidden" onClick={()=>setIsopen(!open)}> <RiMenu2Line size={30}/></button>
    {open && (
    <div
      className={cn(
        "fixed top-0 left-0 h-full transition-width duration-300 block md:hidden lg:hidden",
        isHovered ? "w-64" : "w-16",
        "bg-blue-600 text-white shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
       <button className="block md:hidden lg:hidden" onClick={()=>setIsopen(!open)}> <IoIosClose size={30}/></button>
      <div className={`flex flex-col py-4 ${isHovered ? "p-4" : "items-center"}`}>
        <div className="space-y-4 mt-6">
          <SidebarItem
            icon={<FaHome />}
            label="Home"
            isHovered={isHovered}
            isActive={isActive("/")}
            href="/"
          />
          
          <SidebarItem
            icon={<FaLightbulb />}
            label="Projects"
            isHovered={isHovered}
            isActive={isActive("/projects")}
            href="/projects"
          />
          <SidebarItem
            icon={<TbHelpSquareRoundedFilled />}
            label="issues"
            isHovered={isHovered}
            isActive={isActive("/issues")}
            href="/issues"
          />
          <SidebarItem
            icon={<FaBook />}
            label="Courses"
            isHovered={isHovered}
            isActive={isActive("/courses")}
            href="/courses"
          />
          <SidebarItem
            icon={<FaCog />}
            label="Settings"
            isHovered={isHovered}
            isActive={isActive("/settings")}
            href="/settings"
          />
        </div>
      </div>
    </div>)}
    </>
  );
}

interface SidebarItemProps {
  icon: JSX.Element;
  label: string;
  isHovered: boolean;
  isActive: boolean;
  href:string;
}

function SidebarItem({ icon, label, isHovered, isActive,href }: SidebarItemProps) {
  return (
    <Link
      className={`flex items-center  p-2 rounded-lg w-full transition-all duration-300 ${
        isActive ? "bg-blue-800 w-full" : "hover:bg-gray-700"
      }`}
      href={href}
    >
      <div className="flex-shrink-0 text-xl">{icon}</div>
      <div className={`ml-4 ${isHovered ? "flex" : "hidden"} transition-all duration-300`}>
        <span className="text-lg text-white">{label}</span>
      </div>
    </Link>
  );
}
