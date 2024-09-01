
import { AllIssues } from '../actions/issues'
import AddIssue from './AddIssue'
import IssueRender from './IssueRender'

export default async function IssuePage() {

  const issues = await AllIssues()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Issue Tracker</h1>

      <AddIssue/>

      <h2 className="text-xl font-semibold mt-8 mb-4">Existing Issues</h2>
       <IssueRender data={issues.issues}/>

      
    </div>
  )
}