"use client"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"

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
              <CardDescription>{issue?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-2 rounded-md overflow-x-auto">
                <code>{issue.code}</code>
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