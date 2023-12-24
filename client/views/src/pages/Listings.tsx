import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase config/config";
import { Link } from "react-router-dom";

function Listings() {
  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center w-full">
        <span className="text-2xl font-semibold">1 listing</span>
        <Button variant={"outline"} className="py-5 font-medium border-black">
          <Link
            to={`/become-a-host/${auth.currentUser?.uid}`}
            replace
            className="w-full flex items-center justify-center gap-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create listing
          </Link>
        </Button>
      </div>
      <div className="py-4 flex items-center gap-8">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 absolute left-2 top-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <Input
            placeholder="Search listings"
            className="font-medium rounded-full pl-9"
          />
        </div>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 absolute left-2 top-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <Input
            placeholder="Set a max price"
            className="font-medium rounded-full pl-9"
          />
        </div>
      </div>
    </div>
  );
}

export default Listings;
