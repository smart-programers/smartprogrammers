"use server"
import { z } from "zod";
import { UserRegister } from "../hooks/UserRegister";

const createUserSchema = z.object({
    name: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  });
export async function Register(name: string, password: string, email: string){


    try {
        createUserSchema.parse({ name, password, email });
      } catch (error) {
       
        if (error instanceof z.ZodError) {
    
          console.error("Validation error:", error.errors);
          return { success: false, errors: error.errors };
        }
    
        console.error("Unexpected error:", error);
        return { success: false, error: "An unexpected error occurred" };
      }
    
      const user = await UserRegister(name,password,email)

      if(user){
        return { success: true, user: user };
      }else{
        return{success:false,error:"Unable to register User"}
      }
}