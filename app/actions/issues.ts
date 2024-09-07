"use server"
import { z } from "zod";
import { CreateProject, DeleteProject, MyProjects, Projects } from "../hooks/UserProjects";
import { revalidatePath } from "next/cache";
import { CreateIssue, GetIssue, Issues } from "../hooks/userIssue";

const formSchema = z.object({
    name: z.string().min(2,{
      message: "Project name must be atleast two characters.",
    }),
    description:z.string().min(6,{
      message:"Description must have at least 6 characters"
    }),

  })

export async function createIssue(name:string,description:string,src:string,code:string){
    try{
        formSchema.parse({name,description})
    } catch (error) {
   
        if (error instanceof z.ZodError) {
    
          console.error("Validation error:", error.errors);
          return { success: false, errors: error.errors };
        }
    
        console.error("Unexpected error:", error);
        return { success: false, error: "An unexpected error occurred" };
      }

      const issue = await CreateIssue(name,description,src,code)

      if(issue){
        return {success:true,issue:issue?.issue}
      }else{
        return{success:false,error:"Unable to Create Post"}
      }
}


export async function AllIssues(){

  try{
    const issues = await Issues()

    if(issues){
      revalidatePath("/","layout")
    }

    return{success:true,issues:issues?.issues}
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

    return{success:true,projects:projects?.project}
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


export async function getIssue(id:string){

  try{
    const issues = await GetIssue(id)

    if(issues){
      revalidatePath("/","layout")
    }

    return{success:true,issues:issues?.issues}
  }catch{
    return {success:false,pissues:[]}
  }
}
