"use client"

import { DialogTrigger,Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaPlus } from "react-icons/fa"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const formSchema = z.object({
    name: z.string().min(2,{
      message: "Project name must be atleast two characters.",
    }),
    description:z.string().min(6,{
      message:"Description must have at least 6 characters"
    }),
    src:z.string().url({
        message:"Invalid Url Format"
    })
  })
export default function AddProject(){
    const [open,setOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description:"",
          src:""
        },
      })

      const isOpen=()=>{
        setOpen(!open)
      }

      const {toast} = useToast()

      const handleSubmit = async(data:z.infer<typeof formSchema>) => {
 
        toast({
            title: "Successful",
            description: `${data.name} Created Successfully!`,
            
          });
          isOpen()
      };
    return(
        <Dialog open={open} onOpenChange={isOpen}>
            <DialogTrigger asChild>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-sm text-gray-900 py-2 px-4 rounded mt-6 flex items-center">
          <FaPlus className="mr-2" /> Add Project
        </button> 
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <Form {...form}>
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
              <FormControl>
              <input
                type="text"
                {...field}
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                placeholder="SmartProgrammers"
              />
               </FormControl>
              
            </div> <FormMessage /> </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <FormControl>
              <Input
                type="text"
                {...field}
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                placeholder=" Participate in collaborative projects 🚀 and hands-on workshops to boost your coding skills."
              />
              </FormControl>
              
              </div> <FormMessage /> </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="src"
          render={({ field }) => (
            <FormItem>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Github Link</label>
              <FormControl>
              <Input
                type="text"
                {...field}
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                placeholder="https://github.com/username/project"
              />
              </FormControl>
              
              </div> <FormMessage /> </FormItem>
          )}
        />

          
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Create
            </button>

          </form>
          </Form>
            </DialogContent>
        </Dialog>
    )
}