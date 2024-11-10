"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaUsers, FaRocket, FaCode } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export function LearnMoreDialog() {
  const router  = useRouter()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-4 px-4 py-2 bg-white text-yellow-500 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700 transition-colors"
        >
          Learn More 🚀
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Smart Programmers! 🌟</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2">
              <FaUsers className="text-yellow-500 dark:text-yellow-400" />
              <p>
                Become a part of a thriving community of Tanzanian developers! Whether you're a beginner or an expert, Smart Programmers offers resources to help you grow.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <FaRocket className="text-yellow-500 dark:text-yellow-400" />
              <p>
                Participate in collaborative projects 🚀 and hands-on workshops to boost your coding skills.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <FaCode className="text-yellow-500 dark:text-yellow-400" />
              <p>
                Access top-tier courses 📚 and resources to accelerate your development journey.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={()=>{
              router.push('auth/register')
            }}
            variant="outline"
            className="bg-yellow-500 text-white dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500"
          >
            JOIN 🚀
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
