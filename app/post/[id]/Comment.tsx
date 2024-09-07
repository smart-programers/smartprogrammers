"use client"
import React, { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { getUser } from "../../actions/user";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { createComment } from '@/app/actions/comment';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Comment should be at least two words"
  })
});

export default function Comment({ id }: { id: string }) {
  const [image, setImage] = useState<any | null>(null);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: ''
    }
  });

  const { toast } = useToast();

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const user = await getUser();
    if (user.success === true) {
      const comment = await createComment(data.description, image, id);

      if (comment.success === true) {
        toast({
          title: "Success",
          description: "Comment added successfully!"
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: "Failed to add comment!"
        });
      }
    } else {
      toast({
        title: "Authentication Required",
        description: "You must sign in!"
      });
    }
  };

  return (
    <div className='w-full max-w-3xl mx-auto px-4 py-6'>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
         
          <div>
            <Label htmlFor="description" className="text-left font-medium text-lg">
              Description
            </Label>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="description"
                      className="mt-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          
          <div>
            <Label htmlFor="image" className="text-left font-medium text-lg">
              Image (optional)
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={handleImageUpload}
              className="mt-2"
            />
          </div>

         
          <div className="flex justify-end">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
