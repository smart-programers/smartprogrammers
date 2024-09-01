// "use client"

import { FaPlus, FaFolder } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import AddProject from "./AddProject";
import { AllProjects } from "../actions/createProject";
import FormProject from "./FormProject";

export default async function HomePage() {
  

  const projects = await AllProjects();

  console.log(projects.projects)
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 shadow-lg dark:bg-gray-800 text-gray-900 dark:text-white p-4">
        <div className="text-lg font-bold">Projects</div>
        <div className="mt-6">
          <h2 className="text-sm font-semibold">Top Projects</h2>
          <ul className="mt-4 space-y-4">
            {projects?.projects.map((project, index) => (
              <li key={index} className="flex items-center">
                <FaFolder className="mr-2 text-yellow-400" />
                {project?.name}
              </li>
            ))}
          </ul>
        </div>
        {/* <button className="bg-yellow-400 hover:bg-yellow-500 text-sm text-gray-900 py-2 px-4 rounded mt-6 flex items-center">
          <FaPlus className="mr-2" /> Add Project
        </button> */}
        <AddProject/>
      </aside>

      {/* Main Content */}
      <main className="w-1/2 bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-gray-600 dark:text-gray-300">Share and discover projects within the SmartProgrammers community</p>

        {/* Add New Project Section */}
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Start a New Project</h2>
          <FormProject/>
        </div>

        {/* List of Projects */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Shared Projects</h2>
          <div className="mt-6 space-y-6">
            {projects?.projects?.map((project, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project?.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{project?.description}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400">{project?.visibility}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 bg-gray-50 dark:bg-gray-800 p-8">
        <div className="p-6 bg-yellow-200 dark:bg-yellow-700 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Coding Completion</h2>
          <p className="text-gray-800 dark:text-gray-200">Explore tools and resources to enhance your coding efficiency.</p>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Explore Tools
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Latest Updates</h2>
          <ul className="mt-4 space-y-4">
            <li className="text-gray-600 dark:text-gray-300">New coding tool integrations...</li>
            <li className="text-gray-600 dark:text-gray-300">Tips for effective code completion...</li>
            <li className="text-gray-600 dark:text-gray-300">Updates on community coding challenges...</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
