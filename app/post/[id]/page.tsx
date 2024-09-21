import { getIssue } from "@/app/actions/issues";
import SingleIssue from "./SingleIssue";
import Comment from "./Comment";
import { getUser } from "@/app/actions/user";

export const revalidate = 0;

export default async function Post({ params }: { params: { id: string } }) {
  const issue = await getIssue(params?.id);
 const user = await getUser()
  return (
    <div className="flex flex-col min-h-screen">
        
      <div className="flex-grow">
        <SingleIssue issue={issue?.issues} user={user.user}/>
      </div>

      <div className="mt-auto">
        <Comment id={params?.id} />
      </div>
    </div>
  );
}
