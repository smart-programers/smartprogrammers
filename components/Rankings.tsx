"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

const developers = Array.from({ length: 30 }, (_, i) => ({
  rank: i + 1,
  username: `dev_${i + 1}`,
  contributions: Math.floor(Math.random() * 1500 + 100),
}));

export function RankingsDialog() {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-4 py-2 bg-white text-gray-500 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Rankings
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[825px] sm:max-h-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-4">
            🌟 Github Contribution Rankings
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-[300px] overflow-y-auto">
          {developers.map((dev) => (
            <div
              key={dev.rank}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col items-center text-center transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500 dark:text-yellow-400" />
                <span className="font-semibold text-lg">{dev.rank}</span>
              </div>
              <h3 className="text-xl font-bold mt-2">{dev.username}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dev.contributions} contributions
              </p>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-6 flex justify-center">
          <Button
            onClick={() => router.push("auth/register")}
            variant="outline"
            className="bg-yellow-500 text-white dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500 px-6 py-3 rounded-lg font-semibold"
          >
            JOIN 🚀
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
