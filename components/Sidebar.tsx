import React from 'react';
import { FaHome, FaBook, FaComment, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

export interface SidebarProps {
  active?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  return (
    <aside className="fixed top-0 left-0 w-64 bg-blue-600 text-white h-screen">
      <nav>
        <ul className="space-y-4 p-6">
          <li className={`${active === 'home' ? 'bg-blue-800' : ''} p-3 rounded flex items-center`}>
            <FaHome className="inline-block mr-3" /> Home
          </li>
          <li className={`${active === 'courses' ? 'bg-blue-800' : ''} p-3 rounded flex items-center`}>
            <FaBook className="inline-block mr-3" /> Courses
          </li>
          <li className={`${active === 'chat' ? 'bg-blue-800' : ''} p-3 rounded flex items-center`}>
            <FaComment className="inline-block mr-3" /> Chat
          </li>
          <li className={`${active === 'profile' ? 'bg-blue-800' : ''} p-3 rounded flex items-center`}>
            <FaUser className="inline-block mr-3" /> Profile
          </li>
          <li className={`${active === 'settings' ? 'bg-blue-800' : ''} p-3 rounded flex items-center`}>
            <VscCode className="inline-block mr-3" /> Code
          </li>
          <li className={`${active === 'settings' ? 'bg-blue-800' : ''} p-3 rounded flex items-center`}>
            <FaCog className="inline-block mr-3" /> Settings
          </li>
          <li className="p-3 rounded flex items-center">
            <FaSignOutAlt className="inline-block mr-3" /> Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
