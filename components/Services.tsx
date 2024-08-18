import React from 'react';
import { FaCode, FaGlobe, FaUsers, FaRegLightbulb, FaBookOpen, FaChalkboardTeacher, FaProjectDiagram, FaAward } from 'react-icons/fa';

const Services = () => {
  return (
    <div>
      {/* Services Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center flex-col transition-shadow duration-300 hover:shadow-xl">
            <FaCode className="text-4xl text-yellow-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-lg font-semibold dark:text-white">Courses</h3>
            <p className="text-gray-600 dark:text-gray-300">High-quality programming courses to advance your skills.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center flex-col transition-shadow duration-300 hover:shadow-xl">
            <FaGlobe className="text-4xl text-yellow-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-lg font-semibold dark:text-white">Community</h3>
            <p className="text-gray-600 dark:text-gray-300">Connect with fellow developers and grow your network.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center flex-col transition-shadow duration-300 hover:shadow-xl">
            <FaUsers className="text-4xl text-yellow-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-lg font-semibold dark:text-white">Mentorship</h3>
            <p className="text-gray-600 dark:text-gray-300">Get guidance from experienced professionals.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center flex-col transition-shadow duration-300 hover:shadow-xl">
            <FaRegLightbulb className="text-4xl text-yellow-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-lg font-semibold dark:text-white">Innovation</h3>
            <p className="text-gray-600 dark:text-gray-300">Stay ahead with the latest trends and technologies.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center flex-col transition-shadow duration-300 hover:shadow-xl">
            <FaBookOpen className="text-4xl text-yellow-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-lg font-semibold dark:text-white">Resources</h3>
            <p className="text-gray-600 dark:text-gray-300">Access a library of resources and tools to support your learning.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center flex-col transition-shadow duration-300 hover:shadow-xl">
            <FaChalkboardTeacher className="text-4xl text-yellow-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-lg font-semibold dark:text-white">Workshops</h3>
            <p className="text-gray-600 dark:text-gray-300">Participate in interactive workshops and hands-on sessions.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center flex-col transition-shadow duration-300 hover:shadow-xl">
            <FaProjectDiagram className="text-4xl text-yellow-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-lg font-semibold dark:text-white">Project Collaboration</h3>
            <p className="text-gray-600 dark:text-gray-300">Collaborate on exciting projects and enhance your skills.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center flex-col transition-shadow duration-300 hover:shadow-xl">
            <FaAward className="text-4xl text-yellow-500 dark:text-yellow-400 mb-2" />
            <h3 className="text-lg font-semibold dark:text-white">Certifications</h3>
            <p className="text-gray-600 dark:text-gray-300">Earn certifications to showcase your skills and achievements.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
