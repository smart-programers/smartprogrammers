"use server"
import { z } from "zod";
import { CreateProject, DeleteProject, MyProjects, Projects, UpdateProject } from "../hooks/UserProjects";
import { revalidatePath } from "next/cache";

const githubUrlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;

const formSchema = z.object({
    name: z.string().min(2,{
      message: "Project name must be atleast two characters.",
    }),
    description:z.string().min(6,{
      message:"Description must have at least 6 characters"
    }),
    src:z.string().url({
        message:"Invalid Url Format"
    }),
    visibility: z.enum(['public', 'private'], {
      message: "Visibility must be either 'public' or 'private'.",
    }),
  })

  const editSchema = z.object({
    name: z.string().min(2, {
      message: "Project name must be at least two characters.",
    }),
    description: z.string().min(6, {
      message: "Description must have at least 6 characters",
    }),
    id: z.string().min(6, {
      message: "Id must have at least 6 characters",
    }),
    src: z.string().url({
      message: "Invalid Url Format",
    }).refine(val => githubUrlPattern.test(val), {
      message: "Invalid GitHub URL",
    }),
    visibility: z.enum(['public', 'private'], {
      message: "Visibility must be either 'public' or 'private'.",
    }),
  });
  
export async function createProject(name:string,description:string,src:string,visibility:any){
    try{
        formSchema.parse({name,description,src,visibility})
    } catch (error) {
   
        if (error instanceof z.ZodError) {
    
          console.error("Validation error:", error.errors);
          return { success: false, errors: error.errors };
        }
    
        console.error("Unexpected error:", error);
        return { success: false, error: "An unexpected error occurred" };
      }

      const project = await CreateProject(name,description,src,visibility)

      if(project){
        return {success:true,project:project?.project}
      }else{
        return{success:false,error:"Unable to Create Project"}
      }
}

export async function updateProject(id:string,name:string,description:string,src:string,visibility:any){
  try{
    editSchema.parse({name,description,src,id,visibility})
  } catch (error) {
 
      if (error instanceof z.ZodError) {
  
        console.error("Validation error:", error.errors);
        return { success: false, errors: error.errors };
      }
  
      console.error("Unexpected error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }

    const project = await UpdateProject(id,name,description,src,visibility)

    if(project){
      return {success:true,project:project?.project}
    }else{
      return{success:false,error:"Unable to Create Project"}
    }
}



export async function AllProjects(){

  try{
    const projects = await Projects()

    if(projects){
      revalidatePath("/","layout")
    }

    return{success:true,projects:projects?.projects}
  }catch{
    return {success:false,projects:[]}
  }
}



export async function myProjects(){

  try{
    const projects = await MyProjects()

    if(projects){
      revalidatePath("/","layout")
    }

    return{success:true,projects:projects?.projects}
  }catch{
    return {success:false,projects:[]}
  }
}



export async function deleteProject(id:string){

  try{
    const projects = await DeleteProject(id)

    if(projects){
      revalidatePath("/","layout")
    }

    return{success:true,projects:projects?.project}
  }catch{
    return {success:false,projects:[]}
  }
}
