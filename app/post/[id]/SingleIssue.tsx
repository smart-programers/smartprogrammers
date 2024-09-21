"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DOMPurify from 'dompurify';
import { deleteComment, updateComment } from '@/app/actions/comment';
import { getUser } from '../../actions/user';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { CiMenuKebab } from "react-icons/ci";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface User {
  id: string;
  name: string;
  src?: string;
}

interface Comment {
  id: string;
  description: string;
  user: User;
  src?: string;
}

interface Issue {
  id: string;
  name: string;
  description: string;
  code: string;
  src?: string;
  comments: Comment[];
}

interface SingleIssueProps {
  issue: Issue;
  user: User;
}


const formSchema = z.object({
  description: z.string().min(2, {
    message: "Comment should be at least two words"
  }),
});


const detectLanguage = (code: string): string => {
  switch (true) {
    case /<[^>]+>/.test(code):
      return 'html';
    case /(function|const|let|=>|import|export)/.test(code):
      return 'javascript';
    case /{[^}]*}/.test(code) && !/(int|public|class|def)/.test(code):
      return 'css';
    case /class\s+[A-Za-z]+\s+{/.test(code) && /public\s+static\s+void\s+main/.test(code):
      return 'java';
    case /def\s+[A-Za-z_]+\s*\(.*\):/.test(code) || /print\s*\(.+\)/.test(code):
      return 'python';
    case /fn\s+[A-Za-z_]+\s*->/.test(code):
      return 'elixir';
    case /#include\s*<[^>]+>/i.test(code) && /int\s+main\s*\(/.test(code):
      return 'cpp';
    case /Console\.WriteLine/.test(code) || /using\s+System/.test(code):
      return 'csharp';
    case /#include\s*<[^>]+>/i.test(code) && /main\s*\(/.test(code):
      return 'c';
    case /<\?php/.test(code) || /echo\s+['"]/.test(code) || /function\s+[A-Za-z_]+\s*\(/.test(code) || /<\?=/.test(code):
      return 'php';
    case /(SELECT|INSERT|UPDATE|DELETE|WITH|JOIN|UNION|CREATE|ALTER|DROP|WHERE|GROUP\s+BY|ORDER\s+BY|LIMIT|OFFSET|HAVING)/i.test(code):
      return 'sql';
    case /package\s+main/.test(code) && /fmt\.Println/.test(code):
      return 'go';
    case /fn\s+main\s*\(\)/.test(code) && /println!\s*\(/.test(code):
      return 'rust';
    case /(BEGIN|END;|DECLARE|EXCEPTION|LOOP|IF|THEN|ELSE|CURSOR|FETCH|EXIT)/i.test(code):
      return 'plsql';
    case /(setq|defun)/.test(code):
      return 'lisp';
    default:
      return 'plaintext';
  }
};


const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => (
  <SyntaxHighlighter language={language} style={okaidia}>
    {code}
  </SyntaxHighlighter>
);

export default function SingleIssue ({ issue, user }:{issue:any,user:any}){
  const router = useRouter();
  const { toast } = useToast();
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [image, setImage] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    }
  });

 
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };


  const handleEdit = (comment: Comment) => {
    setEditingComment(comment);
    form.setValue("description", comment.description);
  };

 
  const handleDelete = async (id: string) => {
    const response = await deleteComment(id);
    if (response.success===true) {
      router.refresh();
    }
  };

  const close =()=>{
    setEditingComment(null)
  
  }

 
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const userResponse = await getUser();
    if (userResponse.success) {
      setLoading(true);
      const response = await updateComment(editingComment!.id, data.description, image);
      setLoading(false);
      if (response.success) {
        toast({ title: "Success", description: "Comment updated successfully!" });
        setEditingComment(null);
        form.reset();
        router.refresh();
      } else {
        toast({ title: "Error", description: "Failed to update comment!" });
      }
    } else {
      toast({ title: "Authentication Required", description: "You must sign in!" });
    }
  };

  return (
    <>
      <Card key={issue?.id} className="mb-4">
        <CardHeader>
          <CardTitle>{issue?.name}</CardTitle>
          <CardDescription dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(issue?.description) }} />
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-2 rounded-md overflow-x-auto">
            <CodeBlock code={issue?.code} language={detectLanguage(issue?.code)} />
          </pre>
          {issue?.src && (
            <img src={issue?.src} alt={`Issue ${issue?.id}`} className="mt-2 rounded-md" />
          )}
        </CardContent>
      </Card>
      {issue?.comments?.map((comment:any) => (
        <div key={comment?.id}>
          <div className="flex justify-between px-4">
            <div className="flex items-center gap-4">
              <Avatar>
                {comment?.user?.src ? (
                  <AvatarImage src={comment?.user?.src} />
                ) : (
                  <AvatarFallback>{comment?.user?.name?.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <p>{comment?.user?.name}</p>
            </div>
            {user?.id === comment?.user?.id && (
              <HoverCard>
                <HoverCardTrigger>
                <button className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <CiMenuKebab />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className='flex flex-col gap-2'>
                  <button className="block px-4 py-2 hover:bg-gray-100" onClick={() => handleEdit(comment)}>Edit</button>
                  <button className="block px-4 py-2 hover:bg-gray-100" onClick={() => handleDelete(comment?.id)}>Delete</button>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
          <section className="px-4 break-words whitespace-pre-wrap overflow-hidden overflow-x-auto">
            {editingComment?.id === comment.id ? (
              <div className='w-full max-w-3xl mx-auto px-4 py-6'>
                <Form {...form}>
                  <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
                 
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="description">Description</Label>
                          <FormControl>
                            <Textarea id="description" className="mt-2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <Label htmlFor="image">Image (optional)</Label>
                      <Input id="image" type="file" onChange={handleImageUpload} className="mt-2" />
                    </div>
                    <section className='flex flex-row gap-4'>
                    <div className="">
                      <Button onClick={()=>close()}>Close</Button>
                    </div>
                    <div className="">
                      <Button type="submit" disabled={isLoading}>Save</Button>
                    </div>
                    </section>
                  </form>
                </Form>
              </div>
            ) : (
              <CodeBlock code={comment?.description} language={detectLanguage(comment?.description)} />
            )}
          </section>
          {comment.src && (
            <div className='flex justify-center items-center'>
              <img src={comment?.src} alt={`Comment ${comment?.id}`} className="mt-2 rounded-md" />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

