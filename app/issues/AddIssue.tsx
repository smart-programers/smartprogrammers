"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { getUser } from "../actions/user"
import { useRouter } from "next/navigation"
import { createIssue } from "../actions/issues"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least two characters.",
  }),
  description: z.string().min(6, {
    message: "Description must have at least 6 characters"
  }),
  code: z.string()
    .optional(),
})

export default function AddIssue() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [image, setImg] = useState<any | null>(null)

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImg(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      code: ""
    },
  })

  const isOpen = async () => {
    const user = await getUser()
    if (user.success === true) {
      setIsDialogOpen(!isDialogOpen)
    } else {
      toast({
        title: "Authentication",
        description: "You must Sign In!",
      });
    }
  }

  const { toast } = useToast()

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const project = await createIssue(data.name, data.description, image, data.code as any)
    if (project.success === true) {
      toast({
        title: "Successful",
        description: `${data.name} Created Successfully!`,
      });
      isOpen()
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: `Failed to Create ${data.name}!`,
      });
    }
  };

  return (
    <>
      <Button onClick={isOpen}>File New Issue</Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>File a New Issue</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="title"
                           
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ReactQuill
                            id="description"
                            className="col-span-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Code
                  </Label>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            id="code"
                            className="col-span-3 font-mono"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageUpload}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
              <Button type="submit">Submit Issue</Button></div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
