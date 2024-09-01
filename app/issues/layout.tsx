import Sidebar from '@/components/Navbar/Nav';
import TopBar from '@/components/TopBar';
import React from 'react'


export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="ml-16 flex-1">
        <TopBar />
        {children}
      </div>
    
    </div>
  );
}
