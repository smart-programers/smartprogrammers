import React from 'react';
import Services from './Services';

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

export default CourseCard