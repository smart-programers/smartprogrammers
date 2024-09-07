import React from 'react';
import TopBar from '../../components/TopBar';
import MainSection from '../../components/MainSection';
import Sidebar from '@/components/Navbar/Nav';
import Image from 'next/image';
// import Sidebar from '../components/Sidebar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      {/* <Sidebar active="home" /> */}
      <Sidebar/>

      {/* Main Content */}
      <div className="md:ml-24 lg:ml-24 flex-1">
        <TopBar />
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 me-8">
  <div className="col-span-1 md:col-span-6">
    <MainSection />
  </div>

  <div className="col-span-1 md:col-span-2">
    <div className='dark:bg-gray-800 shadow-lg mt-8 pb-4 px-4 rounded-lg'>
    <h1 className='text-lg py-4 font-bold'>Recommended Course</h1>
    <div className="grid w-full h-60 md:h-70 bg-blue-400">
      <div className="relative w-full h-full">
        <Image
          src="https://t3.ftcdn.net/jpg/07/40/88/42/240_F_740884204_4aRtGKSryeIAAXRGdBqlwNroBRQ0m9kQ.jpg"
          alt="hello"
          fill
        />
      </div>
    </div>
    <div className='my-3 font-bold'>MERN MongoDB  Express JS, ReactJS, NodeJS</div>
    <div className='flex justify-between mb-4'>
        <span>Tzs 70,000</span>
        <span className='line-through text-gray-600'>Tzs 70,000</span>
    </div>

    <div className='flex justify-between'>
        <span>Read More </span>
        <span>456 Students</span>
    </div>

    </div>


  </div>
</div>


      </div>
    
    </div>
  );
};

export default MainLayout;
