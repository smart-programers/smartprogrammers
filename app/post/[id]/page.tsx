import { getIssue } from "@/app/actions/issues";
import SingleIssue from "./SingleIssue";


export const revalidate =0 ;


export default async function Post({params}:{params:{id:string}}){

    const issue = await getIssue(params?.id)


    return(
        <div>
            <SingleIssue issue={issue?.issues} />
        </div>
    )
}