import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

function Reviews() {
  useEffect(() => {
    document.title = "Reviews - IGotYou";
  }, []);

  return (
    <div className="flex justify-center gap-4 p-12">
      <div className="flex w-[600px] flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">Reviews</h1>
        <div className="relative w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute left-1 top-2 h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>

          <Input
            placeholder="Search reviews"
            className="w-full rounded-full pl-8"
          />
        </div>
        <Card className="mt-8 flex w-full flex-col items-center justify-center gap-4 border p-8 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#F9D2DF"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#E31C5F"
            className="h-14 w-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">
              Your first review will show up here
            </p>
            <p className="text-sm font-medium">
              We’ll let you know when guests leave feedback.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Reviews;
