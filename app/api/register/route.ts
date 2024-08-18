import { z } from "zod";
import prisma from '@/prisma/client'
import bcrypt from 'bcrypt'

const createUserSchema = z.object({
    name: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  });

  