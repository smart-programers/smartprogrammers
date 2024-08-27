import { z } from "zod";
import { getUser } from "../actions/user";

import prisma from '@/prisma/client'

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

export async function CreateProject(name:string,description:string,src:string){

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
            userId:isExisting.id
        }
      })

      return {success:true, project:project}

}


export async function Projects(){

  const project = await prisma?.project.findMany({
  orderBy:{
    createdAt:"desc"
  }
  })

  return {success:true, project:project}

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

  const project = await prisma?.project.findMany({
    where:{
        userId:isExisting.id
    }
  })

  return {success:true, project:project}
}