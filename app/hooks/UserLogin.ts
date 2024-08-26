
import { z } from "zod";
import prisma from '@/prisma/client'
import bcrypt from 'bcrypt'
import { signJwtToken } from "../actions/auth";
import { cookies } from "next/headers";
import { Cookie } from "./cookie";

const createUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  rememberMe:z.boolean({
    required_error: "RememberMe is required",
    invalid_type_error: "RemeberMe must be a boolean",
  }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});


function getExpirationDateInDays(days:any) {
  const now = new Date();
  now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000);
  return now;
}


function getExpirationDateInHours(hours:any) {
  const now = new Date();
  now.setTime(now.getTime() + hours * 60 * 60 * 1000);
  console.log(new Date(now).toLocaleString())
  return now;
}

const CookieStore = cookies()

export async function UserLogin(password: string, email: string,rememberMe:boolean) {
 
  try {
    createUserSchema.parse({ password, email,rememberMe });
  } catch (error) {
   
    if (error instanceof z.ZodError) {

      console.error("Validation error:", error.errors);
      return { success: false, errors: error.errors };
    }

    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }



  try {
    const newUser = await prisma.user.findFirst({
        where:{
            email:email,
        }
    
    });

    const expiresIn = rememberMe ? '30d' : '1h';
   const user={
    name:newUser?.name,
    id:newUser?.id,
    role:newUser?.role
   }
    const isMatch = await bcrypt.compare(password,newUser?.password as string)
    if(isMatch){
       const token = await signJwtToken(user,expiresIn)
       CookieStore.set(Cookie,token,{
        expires: rememberMe ? getExpirationDateInDays(30) : getExpirationDateInHours(1)
       })
       console.log(token,"token")
    return { success: true, user: user };
    }
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Failed to create user" };
  }
}
