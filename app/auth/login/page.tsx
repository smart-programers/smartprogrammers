'use client';

import { useEffect, useState } from 'react';
import Ekilirelay from "../../../lib/ekiliRelay";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Login } from '@/app/actions/login';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password:z.string().min(6,{
    message:"Password must have at least 6 characters"
  })
})

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [text,setText] = useState('')
  const ekilirelay = new Ekilirelay("relay-de9132b0e95c399643236be9c9");
  const { toast } = useToast();
  const router = useRouter()
  const descriptions: string[] = [
    'Join a global community of developers who are changing the world with their code. Together, we innovate and push the boundaries of technology.',
    'Discover the latest advancements in technology and become a part of groundbreaking projects that shape the future.',
    'Transform your ideas into reality with cutting-edge tools and resources designed for developers at all levels.',
    'Embark on a journey where your tech skills and creativity will drive the next big thing. Start your adventure with us today.',
    'Explore endless possibilities with a network of like-minded individuals passionate about technology and innovation.',
    'Experience a platform where innovation meets collaboration, empowering you to achieve your tech goals.',
    'Unlock new opportunities and accelerate your career by connecting with experts and peers in the tech industry.',
    'Enhance your skills and knowledge with a wealth of resources and community support available at your fingertips.',
    'Be part of a vibrant tech community that encourages growth, creativity, and collaboration.',
    'Find inspiration and motivation to excel in your tech journey, supported by a global network of enthusiasts.'
  ];
  
  useEffect(()=>{
    let index = Math.floor(Math.random()*descriptions.length)
    setText(descriptions[index])
  },[])

  const handleLogin = async(data:z.infer<typeof formSchema>) => {
    try {
      
      const response = await Login(data.password, data.email,rememberMe);

      if (response.success) {
         toast({
           title: "Successful",
           description: "Logged In Successfully!",
           
         });
         router.push("/");  
      } else {
        console.error('Login error:', response.errors);
        toast({
          title: "Login Error",
          description: `Error: Unable to Login`,
        
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred.",
       
      });
    }
    
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-blue-50 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row h-full w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center"
        style={{
            flex:2
        }}>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Karibu, Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Hey, welcome back to your special place</p>
          <Form {...form}>
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <FormControl>
              <input
                type="email"
                {...field}
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                placeholder="stanley@gmail.com"
              />
               </FormControl>
              
            </div> <FormMessage /> </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <FormControl>
              <Input
                type="password"
                {...field}
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                placeholder="********"
              />
              </FormControl>
              
              </div> <FormMessage /> </FormItem>
          )}
        />

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-600 dark:text-gray-400">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
/>
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-yellow-500 dark:text-indigo-400 hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Sign In
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Don’t have an account? <a href="register" className="text-blue-600 hover:text-yellow-500 dark:text-indigo-400 hover:underline">Sign Up</a>
            </p>
          </form>
          </Form>
        </div>

        {/* Right Section with Background Image */}
        <div 
          className="hidden md:flex w-1/2 bg-cover bg-center p-6 m-2 rounded-lg" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(51, 153, 93, 0.4), rgba(9, 66, 77, 0.586)), url("/assets/img3.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flex:1
          }}
        >
            <div className="flex flex-col justify-between">
                <h1 className='text-white font-bold text-5xl'>Smart Programmers</h1>
                <p className='text-gray-300 '>
                    {text}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
