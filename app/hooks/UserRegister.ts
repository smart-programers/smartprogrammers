
import { z } from "zod";
import prisma from '@/prisma/client'
import bcrypt from 'bcrypt'

const createUserSchema = z.object({
  name: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});




export async function UserRegister(name: string, password: string, email: string) {
 
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


  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return { success: false, error: "User already exists" };
  }


  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await bcrypt.hash(password,12), 
      },
    });
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Failed to create user" };
  }
}
