"use client"

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {  deleteProject, updateProject } from "../actions/createProject";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import AddProject from "./AddProject";

const githubUrlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;

const formSchema = z.object({
  id: z.string().min(6, {
    message: "Project name must be at least 6 characters.",
  }),
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

export default function ProjectRender({ projects }: { projects: any }) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id:"",
      name: "",
      description: "",
      src: "",
      visibility: "public", 
    },
  });

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    form.reset({
        id:project.id,
      name: project.name,
      description: project.description,
      src: project.src,
      visibility: project.visibility,
    });
    setOpen(true);
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const project = await updateProject(data.id,data.name, data.description, data.src, data.visibility);
    if (project.success === true) {
      toast({
        title: "Successful",
        description: `${data.name} Updated Successfully!`,
      });
      setOpen(false);
      router.refresh()
    
    } else {
      toast({
        title: "Error",
        description: `Failed to Update ${data.name}!`,
      });
    }
  };

  const handleDelete = async (data: z.infer<typeof formSchema>) => {
    const project = await deleteProject(data.id);
    if (project.success === true) {
      toast({
        title: "Successful",
        description: `${data.name} Deleted Successfully!`,
      });
      setOpen(false);
      router.refresh()
    
    } else {
      toast({
        title: "Error",
        description: `Failed to Delete ${data.name}!`,
      });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Main Content */}
      <main className="w-full bg-gray-100 dark:bg-gray-900 p-4 lg:p-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-gray-600 dark:text-gray-300">Share and discover projects within the SmartProgrammers community</p>

        {/* Add New Project Section */}
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Start a New Project</h2>
          {/* <FormProject /> */}
          <AddProject/>
        </div>
        
        <div className="mt-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Shared Projects</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.projects?.map((project: any, index: any) => (
              <button
                key={index}
                className="flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => handleProjectClick(project)}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project?.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{project?.description}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">{project?.visibility}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent>
          {selectedProject && (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <DialogHeader>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit Project</h2>
              </DialogHeader>
              <Form {...form}>
                <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                            placeholder="Project Name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                            placeholder="Project Description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="src"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub Link</label>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                            placeholder="https://github.com/username/project"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
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
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={form.handleSubmit(handleDelete)}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                   Delete
                  </button>
                </form>
              </Form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
