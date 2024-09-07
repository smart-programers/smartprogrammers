"use client"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'; 
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import Link from "next/link"

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
      {code}
    </SyntaxHighlighter>
  );
};

export default function IssueRender({data}:{data:any}){
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 2
   console.log(data,"ii")
    const pageCount = Math.ceil(data.length / itemsPerPage)
    const currentIssues = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
    return(
        <>
        <ScrollArea className="h-[400px] md:h-[600px] lg:h-[700px] w-full rounded-md border p-4">
        {currentIssues.map((issue:any) => (
          <Link href={`/post/${issue.id}`} >
          <Card key={issue?.id} className="mb-4">
            <CardHeader>
              <CardTitle>{issue?.name}</CardTitle>
              <CardDescription dangerouslySetInnerHTML={{ __html: issue?.description }} />

            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-2 rounded-md overflow-x-auto">
              <CodeBlock code={issue?.code} language={detectLanguage(issue?.code)} />
              </pre>
              {issue?.src && (
                <img src={issue?.src} alt={`Issue ${issue?.id}`} className="mt-2 rounded-md" />
              )}
            </CardContent>
          </Card></Link>
        ))}
        
      </ScrollArea>

      <div className="flex justify-between items-center mt-4">
        <Button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <GrFormPrevious />
        </Button>
        <span>Page {currentPage} of {pageCount}</span>
        <Button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
        >
          <GrFormNext />
        </Button>
      </div>
        </>
    )
}