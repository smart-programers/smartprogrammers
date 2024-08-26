

import React from 'react';
import TopBar from '../components/TopBar';
import MainSection from '../components/MainSection';
import Sidebar from '@/components/Navbar/Nav';
import { getUser } from './actions/user';
// import Sidebar from '../components/Sidebar';



export default async function  MainLayout(){

  const user = await getUser()

  console.log(user)

// Example usage of the package

  return (
    <div className="flex">
      {/* Sidebar */}
      {/* <Sidebar active="home" /> */}
      <Sidebar/>
   
      {/* Main Content */}
      <div className="ml-16 flex-1">
        <TopBar />
        <MainSection />
      </div>
    
    </div>
  );
};


