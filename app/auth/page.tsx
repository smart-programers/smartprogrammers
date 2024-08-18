"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email:z.string().email({
    message:"Invalid email address"
  }),
  password:z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})
export default function Auth() {
  const [value,setValue]=useState('login')
  
  const { toast } = useToast()

const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          password:"",
          email:"",
        },
      })
     
     
      function onSubmit(values: z.infer<typeof formSchema>) {
        toast({
            title: "Successful",
            description: "Logged in Successfully!"
        })
        console.log(values)
        router.push("/")
      }

      function onRegister(values: z.infer<typeof formSchema>) {
        toast({
            title: "Successful",
            description: "Registered Successfully!"
        })
        form.reset()
        setValue('login')
         console.log(values)
       }
    
  
  return (
    <div className="flex justify-center items-center h-screen">
    <Tabs defaultValue="login" value={value} className="w-[400px]"   onValueChange={setValue}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Sign In</TabsTrigger>
        <TabsTrigger value="register">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
            Enter Your Details to Sign In.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} type="text"/>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="......" {...field} type="password"/>
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
        <Button type="submit">Sign In</Button></div>
      </form>
    </Form>
          </CardContent>
         
        </Card>
      </TabsContent>
      <TabsContent value="register">
      <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
          Enter Your Details to Sign Up.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} type="text"/>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} type="email"/>
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="......" {...field} type="password"/>
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
        <Button type="submit">Register</Button></div>
      </form>
    </Form>
          </CardContent>
         
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}
