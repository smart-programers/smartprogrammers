import { z } from "zod";
import { getUser } from "../actions/user";

import prisma from '@/prisma/client'

const formSchema = z.object({
    description:z.string().min(2,{
      message:"Description must have at least 2 characters"
    }),
    id:z.string().min(7,{

    })
  })


  const deleteSchema = z.object({

    id:z.string().min(7,{

    })
  })


  const editSchema = z.object({
    description: z.string().min(6, {
      message: "Description must have at least 6 characters",
    }),
    id: z.string().min(6, {
      message: "Id must have at least 6 characters",
    }),
  })

  
export async function CreateComment(description:string,src:string,id:string){

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
        description: description,
        userId: isExisting.id,
        postId:id
      };
      
      if (src?.trim().length > 0) {
        data.src = src;
      }
      
      
      const comment = await prisma?.comment.create({
        data: data
      });
      

      return {success:true, comment:comment}

}


export async function Issues(){

  const issues = await prisma?.post.findMany({
  orderBy:{
    createdAt:"desc"
  }

  })
  return {success:true, issues:issues}

}

export async function GetIssue(id:string){
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

  const issues = await prisma?.post.findFirst({
  where:{
    id:id
  },
  include:{
    comments:{
      select:{
        user:true,
        id:true
      },orderBy:{
        createdAt:"desc"
      }
    },
    user:{
      select:{
        name:true,
        id:true,
        src:true
      }
    }
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


export async function DeleteComment(id:string){

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

  const comment = await prisma?.comment.delete({
    where:{
        id:id
    }
  })

  return {success:true, comment:comment}
}


export async function UpdateComment(id:string,description:string,src:string){
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
    description: description,
  };
  
  if (src?.trim().length > 0) {
    data.src = src;
  }
  const project = await prisma?.comment.update({
    where:{
      id:id
    },
    data:data
  })

  return {success:true, project:project}
}
