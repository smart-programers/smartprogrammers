'use client';

import { useEffect, useState } from 'react';
import Ekilirelay from "../../../lib/ekiliRelay";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password:z.string().min(6,{
    message:"Password must have at least 6 characters"
  }),
  name:z.string().min(2,{
    message:"Name must be atleast two characters"
  })
})

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [text,setText] = useState('')
  const ekilirelay = new Ekilirelay();
  const router = useRouter()
  const descriptions: string[] = [
    'Embark on your tech journey with us and unlock a world of opportunities for growth and innovation.',
    'Connect with a thriving community of developers eager to share knowledge and collaborate on exciting projects.',
    'Access exclusive resources and tools designed to help you succeed and advance in the tech industry.',
    'Join a network of passionate individuals who are committed to pushing the boundaries of technology and creativity.',
    'Begin your adventure in tech with support and guidance from a diverse group of experts and peers.',
    'Discover new ways to enhance your skills and contribute to cutting-edge projects with our supportive community.',
    'Start your journey with us and gain access to a platform that fosters creativity, collaboration, and professional development.',
    'Become part of a global network that values innovation, learning, and the exchange of ideas.',
    'Explore new horizons and take your tech skills to the next level with the help of our dynamic community.',
    'Register now to access a world of possibilities and connect with like-minded individuals dedicated to tech excellence.'
  ];
  
  
  useEffect(()=>{
    let index = Math.floor(Math.random()*descriptions.length)
    setText(descriptions[index])
  },[])

 
  const { toast } = useToast()
   const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       email: "",
       name:'',
       password:""
     },
   })
   
  const handleLogin = (data:z.infer<typeof formSchema>) => {
    
   axios.post("/api/register",{data}).then(response=>{
    ekilirelay.sendEmail(
        data.email, 
        'Welcome to Smart programmer', 
        'You have successful joined smart programmer', 
        'From: Smart programmers < smart-programmers@gmail.com >'
    )
    .then(response => {
      if (response.status === 'success') {
        console.log('Email sent successfully.');
        toast({
          title: "Successful",
          description: "Registered Successfully!"
      })
      form.reset()
        router.push("/login")
      } else {
        console.log('Failed to send email: ' + response.message);
        console.log(response);
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  })  .catch(error => {
    console.log('Error:', error);
  });
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-blue-50 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row-reverse h-full w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
        
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
          name="name"
          render={({ field }) => (
            <FormItem>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <FormControl>
              <input
                type="text"
                {...field}
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                placeholder="John Doe"
              />
               </FormControl>
              
              </div> <FormMessage /> </FormItem>
            )}
          />

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
              <input
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
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="login" className="text-blue-600 hover:text-yellow-500 dark:text-indigo-400 hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Sign Up
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Already have an account? <a href="login" className="text-blue-600 hover:text-yellow-500 dark:text-indigo-400 hover:underline">Sign In</a>
            </p>
          </form>
          </Form>
        </div>

        {/* Right Section with Background Image */}
        <div 
          className="hidden md:flex w-1/2 bg-cover bg-center p-6 m-2 rounded-lg" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(51, 153, 93, 0.4), rgba(9, 66, 77, 0.586)), url("/assets/img2.jpg")',
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
