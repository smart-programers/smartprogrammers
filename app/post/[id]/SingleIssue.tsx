"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'; 
import DOMPurify from 'dompurify';
const detectLanguage = (code:string) => {
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

  const CodeBlock = ({ code, language }:{code:string,language:string}) => {
 

  return (
    <SyntaxHighlighter language={language} style={okaidia}>
     { code }
    </SyntaxHighlighter>
  );
};


export default function SingleIssue({issue}:{issue:any}){

    return(
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
          {issue?.comments?.map((comment:any)=>(
       <div key={comment?.id}><section className='flex flex-row gap-4 px-4'>
        <Avatar>
            {comment?.user?.src !=null ? 
            <AvatarImage src={comment?.user?.src}/> :
            <AvatarFallback>{comment?.user?.name?.charAt(0)}</AvatarFallback>
}
        </Avatar> <p className='m-2'>{comment?.user?.name}</p></section>
        <section className="px-4 break-words whitespace-pre-wrap overflow-hidden overflow-x-auto">
    
 <CodeBlock code={ comment?.description } language={detectLanguage(comment?.description)} />
 </section>

 {comment.src != null &&(
    <div className='flex justify-center items-center'>
     <img src={comment?.src} alt={`Issue ${issue?.id}`} className="mt-2 rounded-md" />
     </div>
 ) }
       </div>
          )

        )}
        </>
    )
}