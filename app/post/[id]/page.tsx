import { getIssue } from "@/app/actions/issues";
import SingleIssue from "./SingleIssue";
import Comment from "./Comment";

export const revalidate = 0;

export default async function Post({ params }: { params: { id: string } }) {
  const issue = await getIssue(params?.id);

  return (
    <div className="flex flex-col min-h-screen">
        
      <div className="flex-grow">
        <SingleIssue issue={issue?.issues} />
      </div>

      <div className="mt-auto">
        <Comment id={params?.id} />
      </div>
    </div>
  );
}
