"use client";

import { useEffect, useState } from "react";
import { FaHome, FaUser, FaCog, FaComment, FaBook } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
      <div className="flex flex-col items-center py-4">
        <div className="space-y-4 mt-6">
          <SidebarItem
            icon={<FaHome />}
            label="Home"
            isHovered={isHovered}
            isActive={isActive("/")}
          />
          <SidebarItem
            icon={<FaBook />}
            label="Courses"
            isHovered={isHovered}
            isActive={isActive("/courses")}
          />
          <SidebarItem
            icon={<FaComment />}
            label="Chat"
            isHovered={isHovered}
            isActive={isActive("/chats")}
          />
          <SidebarItem
            icon={<FaUser />}
            label="Profile"
            isHovered={isHovered}
            isActive={isActive("/profile")}
          />
          <SidebarItem
            icon={<FaCog />}
            label="Settings"
            isHovered={isHovered}
            isActive={isActive("/settings")}
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
}

function SidebarItem({ icon, label, isHovered, isActive }: SidebarItemProps) {
  return (
    <div
      className={`flex items-center space-x-4 p-2 rounded-lg ${
        isActive ? "bg-blue-800" : "hover:bg-gray-700"
      }`}
    >
      <div className="text-xl">{icon}</div>
      {isHovered && <span className="text-lg">{label}</span>}
    </div>
  );
}
