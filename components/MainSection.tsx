// components/MainSection.tsx
import React from 'react';

interface CourseCardProps {
  title: string;
  price: string;
  students: number;
  description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, price, students, description }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-800 mt-4">{price}</p>
      <small className="text-gray-400">{students} students enrolled</small>
    </div>
  );
};

const MainSection: React.FC = () => {
  return (
    <main className="p-8 space-y-8">
      {/* Promotional Section */}
      <div className="bg-yellow-400 text-center py-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold">Welcome to Smart Programmer</h1>
        <button className="mt-4 px-4 py-2 bg-white text-yellow-500 rounded-lg shadow">
          Read More
        </button>
      </div>
      
      {/* Featured Courses Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <CourseCard 
            title="Complete Masterclass in Python" 
            price="Tzs 350,000" 
            students={150} 
            description="Learn Python from scratch and become a master."
          />
          <CourseCard 
            title="AI (Artificial Intelligence)" 
            price="Tzs 650,000" 
            students={80} 
            description="Dive into the world of AI and machine learning."
          />
          <CourseCard 
            title="Graphics Design Masterclass" 
            price="Tzs 650,000" 
            students={100} 
            description="Master design tools like Photoshop, Illustrator, and InDesign."
          />
        </div>
      </section>

      {/* Upcoming Courses Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Upcoming Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <CourseCard 
            title="Web Development Bootcamp" 
            price="Tzs 400,000" 
            students={50} 
            description="A comprehensive guide to becoming a full-stack web developer."
          />
          <CourseCard 
            title="Data Science with Python" 
            price="Tzs 750,000" 
            students={70} 
            description="Analyze data and build powerful models with Python."
          />
          <CourseCard 
            title="Mobile App Development" 
            price="Tzs 500,000" 
            students={120} 
            description="Learn to build mobile apps for Android and iOS platforms."
          />
        </div>
      </section>
    </main>
  );
};

export default MainSection;
