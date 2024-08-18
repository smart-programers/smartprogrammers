"use client";

import { useEffect, useState } from "react";
import { FaHome, FaUser, FaCog, FaComment, FaBook } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-full transition-width duration-300",
        isHovered ? "w-64" : "w-16",
        "bg-blue-600 text-white shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
            icon={<FaBook />}
            label="Courses"
            isHovered={isHovered}
            isActive={isActive("/courses")}
            href="/courses"
          />
          <SidebarItem
            icon={<FaComment />}
            label="Chat"
            isHovered={isHovered}
            isActive={isActive("/chats")}
            href="/profile"
          />
          <SidebarItem
            icon={<FaUser />}
            label="Profile"
            isHovered={isHovered}
            isActive={isActive("/profile")}
            href="/profile"
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
    </div>
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
      className={`flex items-center justify-between p-2 rounded-lg w-full transition-all duration-300 ${
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
