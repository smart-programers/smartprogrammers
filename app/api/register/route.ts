import { z } from "zod";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const createUserSchema = z.object({
  name: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const Data = createUserSchema.parse(body);

  const hashedPassword = await bcrypt.hash(Data.password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        name: Data.name,
        email: Data.email,
        password: hashedPassword,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return Response.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("User Registration Error", error);
      return new Response(error.errors as any, { status: 400 });
    } else {
      console.error("Internl Server Error", error);
      return new Response("Internl Server Error", { status: 500 });
    }
  }
}
