import { z } from "zod";
import { getUser } from "../actions/user";

import prisma from '@/prisma/client'
import { Visibility } from "@prisma/client";

const githubUrlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;

const formSchema = z.object({
    name: z.string().min(2,{
      message: "Project name must be atleast two characters.",
    }),
    description:z.string().min(6,{
      message:"Description must have at least 6 characters"
    }),
    src: z.string().url({
      message: "Invalid Url Format",
    }).refine(val => githubUrlPattern.test(val), {
      message: "Invalid GitHub URL",
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


  const deleteSchema = z.object({

    id:z.string().min(7,{

    })
  })

  
export async function CreateProject(name:string,description:string,src:string,visibility:any){

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
    
      const user = await getUser()

      if(user.success === false){
        return {success:false,message:"Unauthorized"}
      }

      const isExisting = await prisma?.user.findFirst({
        where:{
            id:user?.user?.id as string
        }
      })

      if(!isExisting){
        return {success:false,message:"User Does Not Exist"}
      }

      const project = await prisma?.project.create({
        data:{
            name:name,
            description:description,
            src:src,
            userId:isExisting.id,
            visibility:visibility
        }
      })

      return {success:true, project:project}

}


export async function UpdateProject(id:string,name:string,description:string,src:string,visibility:any){

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
  
    const user = await getUser()

    if(user.success === false){
      return {success:false,message:"Unauthorized"}
    }

    const isExisting = await prisma?.user.findFirst({
      where:{
          id:user?.user?.id as string
      }
    })

    if(!isExisting){
      return {success:false,message:"User Does Not Exist"}
    }

    const project = await prisma?.project.update({
      where:{
        id:id
      },
      data:{
          name:name,
          description:description,
          src:src,
          visibility:visibility
      }
    })

    return {success:true, project:project}

}


export async function Projects(){

  const projects = await prisma?.project.findMany({
    where:{
      visibility:"public"
    },
  orderBy:{
    createdAt:"desc"
  }
  })

  return {success:true, projects:projects}

}


export async function MyProjects(){
     
  const user = await getUser()

  if(user.success === false){
    return {success:false,message:"Unauthorized"}
  }

  const isExisting = await prisma?.user.findFirst({
    where:{
        id:user?.user?.id as string
    }
  })

  if(!isExisting){
    return {success:false,message:"User Does Not Exist"}
  }

  const projects = await prisma?.project.findMany({
    where:{
        userId:isExisting.id
    }
  })

  return {success:true, projects:projects}
}


export async function DeleteProject(id:string){

  try{
    deleteSchema.parse({id})
} catch (error) {

    if (error instanceof z.ZodError) {

      console.error("Validation error:", error.errors);
      return { success: false, errors: error.errors };
    }

    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
     
  const user = await getUser()

  if(user.success === false){
    return {success:false,message:"Unauthorized"}
  }

  const isExisting = await prisma?.user.findFirst({
    where:{
        id:user?.user?.id as string
    }
  })

  if(!isExisting){
    return {success:false,message:"User Does Not Exist"}
  }

  const project = await prisma?.project.delete({
    where:{
        id:id
    }
  })

  return {success:true, project:project}
}