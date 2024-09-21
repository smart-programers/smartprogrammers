"use server"
import { z } from "zod";
import {  MyProjects,  } from "../hooks/UserProjects";
import { revalidatePath } from "next/cache";
import { CreateIssue, GetIssue, Issues } from "../hooks/userIssue";
import { CreateComment, DeleteComment, UpdateComment } from "../hooks/userComment";

const formSchema = z.object({

    description:z.string().min(2,{
      message:"Description must have at least 2 characters"
    }),
   id:z.string().min(6,{
        message:"Id must have at least 6 characters"
      }),
  })



  const editSchema = z.object({
    description: z.string().min(6, {
      message: "Description must have at least 6 characters",
    }),
    id: z.string().min(6, {
      message: "Id must have at least 6 characters",
    }),
  
  });

export async function createComment(description:string,src:string,id:string){
    try{
        formSchema.parse({description,id})
    } catch (error) {
   
        if (error instanceof z.ZodError) {
    
          console.error("Validation error:", error.errors);
          return { success: false, errors: error.errors };
        }
    
        console.error("Unexpected error:", error);
        return { success: false, error: "An unexpected error occurred" };
      }

      const comment = await CreateComment(description,src,id)

      if(comment){
        return {success:true,comment:comment?.comment}
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

    return{success:true,projects:projects?.projects}
  }catch{
    return {success:false,projects:[]}
  }
}



export async function deleteComment(id:string){

  try{
    const comment = await DeleteComment(id)

    if(comment){
      revalidatePath("/","layout")
    }

    return{success:true,comment:comment?.comment}
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

export async function updateComment(id:string,description:string,src:string){
  try{
    editSchema.parse({description,id})
  } catch (error) {
 
      if (error instanceof z.ZodError) {
  
        console.error("Validation error:", error.errors);
        return { success: false, errors: error.errors };
      }
  
      console.error("Unexpected error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }

    const project = await UpdateComment(id,description,src)

    if(project){
      return {success:true,project:project?.project}
    }else{
      return{success:false,error:"Unable to Create Project"}
    }
}

