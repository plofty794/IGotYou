import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function Inbox() {
  return (
    <>
      <div className="p-4">
        <div className="flex items-start">
          <div className="w-1/4">
            <Button className="flex items-center justify-center gap-4 p-7 rounded-full bg-white border text-black hover:bg-white hover:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Compose
            </Button>
          </div>
          <Card className="bg-red-400 w-3/4">Hi</Card>
        </div>
      </div>
    </>
  );
}

export default Inbox;
