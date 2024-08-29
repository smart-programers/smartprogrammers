"use server"
import { z } from "zod";
import { CreateProject, DeleteProject, MyProjects, Projects } from "../hooks/UserProjects";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
    name: z.string().min(2,{
      message: "Project name must be atleast two characters.",
    }),
    description:z.string().min(6,{
      message:"Description must have at least 6 characters"
    }),
    src:z.string().url({
        message:"Invalid Url Format"
    })
  })
export async function createProject(name:string,description:string,src:string){
    try{
        formSchema.parse({name,description,src})
    } catch (error) {
   
        if (error instanceof z.ZodError) {
    
          console.error("Validation error:", error.errors);
          return { success: false, errors: error.errors };
        }
    
        console.error("Unexpected error:", error);
        return { success: false, error: "An unexpected error occurred" };
      }

      const project = await CreateProject(name,description,src)

      if(project){
        return {success:true,project:project}
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

    return{success:true,projects:projects}
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

    return{success:true,projects:projects}
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

    return{success:true,projects:projects}
  }catch{
    return {success:false,projects:[]}
  }
}
