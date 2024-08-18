"use client";

import { useState } from "react";
import { FaHome, FaUser, FaCog, FaInfoCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-full transition-width duration-300",
        isHovered ? "w-64" : "w-16",
        "bg-gray-800 text-white shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center py-4">
        <div className="space-y-4 mt-6">
          <SidebarItem icon={<FaHome />} label="Home" isHovered={isHovered} />
          <SidebarItem icon={<FaUser />} label="Profile" isHovered={isHovered} />
          <SidebarItem icon={<FaCog />} label="Settings" isHovered={isHovered} />
          <SidebarItem icon={<FaInfoCircle />} label="About" isHovered={isHovered} />
        </div>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: JSX.Element;
  label: string;
  isHovered: boolean;
}

function SidebarItem({ icon, label, isHovered }: SidebarItemProps) {
  return (
    <div className="flex items-center space-x-4 p-2 hover:bg-gray-700 rounded-lg">
      <div className="text-xl">{icon}</div>
      {isHovered && <span className="text-lg">{label}</span>}
    </div>
  );
}
