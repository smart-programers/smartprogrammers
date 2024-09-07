"use client"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'; 


const detectLanguage = (code:string) => {
  if (code.includes('<') && code.includes('>')) {
    return 'html';
  } else if (code.includes('function') || code.includes('const') || code.includes('let')) {
    return 'javascript';
  } else if (code.includes('{') && code.includes('}')) {
    return 'css';
  } else if (code.includes('class') && code.includes('public static void main')) {
    return 'java';
  } else if (code.includes('def ') && code.includes(':')) {
    return 'python';
  } else if (code.includes('fn ') && code.includes('->')) {
    return 'elixir';
  } else if (code.includes('#include') || code.includes('int main(')) {
    return 'cpp';  // C++
  } else if (code.includes('Console.WriteLine') || code.includes('public class')) {
    return 'csharp'; // C#
  } else if (code.includes('<?php') || code.includes('echo ')) {
    return 'php';
  } else if (code.includes('#include') && code.includes('main(')) {
    return 'c';  // C language
  } else if (code.includes('using System;') || code.includes('namespace')) {
    return 'csharp'; // C#
  } else if (code.includes('SELECT') && code.includes('FROM')) {
    return 'sql';  // SQL queries
  } else if (code.includes('package main') && code.includes('fmt.Println')) {
    return 'go';  // Golang
  } else if (code.includes('fn main()') || code.includes('println!')) {
    return 'rust';  // Rust
  } else if (code.includes('BEGIN') && code.includes('END;')) {
    return 'plsql';  // PL/SQL
  } else if (code.includes('function') || code.includes('echo') || code.includes('var ')) {
    return 'php'; // PHP
  } else if (code.includes('(setq') || code.includes('(defun')) {
    return 'lisp'; // Lisp
  }
  return 'plaintext'; 
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
          </Card>
        ))}
      </ScrollArea>

      <div className="flex justify-between items-center mt-4">
        <Button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {pageCount}</span>
        <Button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
        >
          Next
        </Button>
      </div>
        </>
    )
}