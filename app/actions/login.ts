"use server"
import { z } from "zod";
import { UserRegister } from "../hooks/UserRegister";
import { UserLogin } from "../hooks/UserLogin";

const createUserSchema = z.object({
    rememberMe:z.boolean({
        required_error: "RememberMe is required",
        invalid_type_error: "RemeberMe must be a boolean",
      }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  });
export async function Login(password: string,email:string, rememberMe:boolean){


    try {
        createUserSchema.parse({ rememberMe ,email,password});
      } catch (error) {
       
        if (error instanceof z.ZodError) {
    
          console.error("Validation error:", error.errors);
          return { success: false, errors: error.errors };
        }
    
        console.error("Unexpected error:", error);
        return { success: false, error: "An unexpected error occurred" };
      }
    
      const user = await UserLogin(password,email,rememberMe)

      if(user){
        return { success: true, user: user };
      }else{
        return{success:false,error:"Unable to register User"}
      }
}