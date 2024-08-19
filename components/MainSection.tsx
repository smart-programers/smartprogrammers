import React from 'react';
import Services from './Services';
import Courses from './Courses';
import { LearnMoreDialog } from './LearnMoreDialog';

interface CourseCardProps {
  title: string;
  price: string;
  students: number;
  description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, price, students, description }) => {
  return (
    <div className="p-4 rounded-lg shadow-lg transition-shadow duration-300 dark:bg-gray-800 bg-white text-center hover:shadow-xl">
      <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      <p className="text-gray-800 dark:text-gray-100 mt-4 text-lg font-semibold">{price}</p>
      <small className="text-gray-400 dark:text-gray-400">{students} students enrolled</small>
    </div>
  );
};

const MainSection: React.FC = () => {
  return (
    <main className="p-8 space-y-8">
      {/* Promotional Section */}
      <div className="bg-yellow-400 text-center py-8 rounded-lg shadow-lg dark:bg-yellow-600">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome to the Tanzanian Programmers Community</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          We are dedicated to empowering Tanzanian developers through comprehensive courses, collaborative projects, and a vibrant community.
        </p>
        <LearnMoreDialog />
        {/* <button className="mt-4 px-4 py-2 bg-white text-yellow-500 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700 transition-colors">
          Learn More
        </button> */}
      </div>
      {/* services */}
      <Services />
      <Courses />
    </main>
  );
};

export default MainSection;
