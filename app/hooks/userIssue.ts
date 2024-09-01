import { z } from "zod";
import { getUser } from "../actions/user";

import prisma from '@/prisma/client'

const formSchema = z.object({
    name: z.string().min(2,{
      message: "Post name must be atleast two characters.",
    }),
    description:z.string().min(6,{
      message:"Description must have at least 6 characters"
    }),
  })


  const deleteSchema = z.object({

    id:z.string().min(7,{

    })
  })

  
export async function CreateIssue(name:string,description:string,src:string,code:string){

    try{
        formSchema.parse({name,description,})
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

      
      const data: any = {
        name: name,
        description: description,
        userId: isExisting.id
      };
      
      if (src?.trim().length > 0) {
        data.src = src;
      }
      
      if (code?.trim().length > 0) {
        data.code = code;
      }
      
      const issue = await prisma?.post.create({
        data: data
      });
      

      return {success:true, issue:issue}

}


export async function Issues(){

  const issues = await prisma?.post.findMany({
  orderBy:{
    createdAt:"desc"
  }

  })
  return {success:true, issues:issues}

}


export async function MyIssues(){
     
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

  const issue = await prisma?.post.findMany({
    where:{
        userId:isExisting.id
    }
  })

  return {success:true, issue:issue}
}


export async function DeleteIssue(id:string){

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

  const issue = await prisma?.post.delete({
    where:{
        id:id
    }
  })

  return {success:true, issue:issue}
}