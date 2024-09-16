

import { FaPlus, FaFolder } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
// import AddProject from "./AddProject";
import { AllProjects } from "../actions/createProject";
import { myProjects } from "../actions/issues";
import ProjectRender from "./ProjectRender";
// import FormProject from "./FormProject";

export const revalidate = 0;

export default async function HomePage() {
  const projects = await myProjects();

  console.log(projects.projects);
  return (
    <div className="flex flex-col min-h-screen ">

      <ProjectRender projects={projects}/>
    
    </div>
  );
}
