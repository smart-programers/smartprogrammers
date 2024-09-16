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
import { createProject } from "../actions/createProject"
import { getUser } from "../actions/user"
import { useRouter } from "next/navigation"

const githubUrlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least two characters.",
  }),
  description: z.string().min(6, {
    message: "Description must have at least 6 characters",
  }),
  src: z.string().url({
    message: "Invalid Url Format",
  }).refine(val => githubUrlPattern.test(val), {
    message: "Invalid GitHub URL",
  }),
  visibility: z.enum(['public', 'private'], {
    message: "Visibility must be either 'public' or 'private'.",
  }),
});
export default function AddProject(){
    const [open,setOpen] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description:"",
          src:"",
          visibility:"public"
        },
      })

      const isOpen=async()=>{

        const user = await getUser()
        if(user.success === true){
        setOpen(!open)
        }else{
          toast({
            title: "Authentication",
            description: `You must Sign In!`,
            
          });
        }
      }

      const {toast} = useToast()

      const handleSubmit = async(data:z.infer<typeof formSchema>) => {
 
        const project = await createProject(data.name,data.description,data.src,data.visibility)
        if(project.success === true){
            form.reset()
        toast({
            title: "Successful",
            description: `${data.name} Created Successfully!`,
            
          });
          isOpen()
          router.refresh()
        }else{
          toast({
            title: "Error",
            description: `Failed to Create ${data.name}!`,
            
          });
        }
      };
    return(
      <>
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

<FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Visibility</label>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                          >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
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
        </>
    )
}