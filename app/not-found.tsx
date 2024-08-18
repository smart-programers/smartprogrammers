import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function NotFound(){

    return(
    <div >
        <p className="text-center">Page not Found</p>
        <div className="flex justify-center gap-2">
        <Button asChild>
        <Link href="/">Go Back Home</Link></Button></div>
    </div>
    )
}