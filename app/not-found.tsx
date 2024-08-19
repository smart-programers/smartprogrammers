import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai"; // Importing icons

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        404 - Page Not Found 🛑
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Oops! The page you&apos;re for doesn&apos;t exist. 😕
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild className="px-6 py-3 text-lg flex items-center gap-2">
          <Link href="/">
            {/* <AiOutlineHome /> */}
             🏠 Go Back Home
          </Link>
        </Button>
        <Button
          asChild
          className="px-6 py-3 text-lg flex items-center gap-2"
          variant="outline"
        >
          <Link href="/contact">
            {/* <AiOutlineMail />  */}
            📧 Contact Us
          </Link>
        </Button>
      </div>
    </div>
  );
}
