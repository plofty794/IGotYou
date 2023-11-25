import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SocketContextProvider } from "@/context/SocketContext";
import { useContext, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/firebase config/config";

type TData = {
  guestName: string;
  host?: string;
  date: { from: string; to: string };
  time: string;
  message: string;
  type: string;
};
function Notification() {
  const [notification, setNotification] = useState(0);
  const [data, setData] = useState<TData[]>([]);
  const { socket } = useContext(SocketContextProvider);

  useMemo(() => {
    socket &&
      socket.on("pong", (data) => {
        console.log(data);
        setData((prev) => [...prev, data]);
        setNotification((prev) => prev + 1);
      });
  }, [socket]);

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger onClick={() => setNotification(0)}>
              <span className="relative cursor-pointer">
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
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
                {notification > 0 && (
                  <span className="absolute top-[-5px] text-xs rounded-full text-white w-4 h-4 bg-red-500">
                    {notification}
                  </span>
                )}
              </span>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            {notification < 1
              ? "No notification"
              : notification > 1
              ? `${notification} notifications`
              : `${notification} notification`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="flex flex-col gap-2">
        <span className="text-xl font-extrabold text-gray-600">
          Notifications
        </span>
        {!data.length && (
          <span className="m-4 mx-auto w-max text-sm font-bold text-gray-600">
            No notifications
          </span>
        )}
        {data.length > 0 && (
          <div className="w-full flex flex-col items-center gap-4">
            {data.map((v) => (
              <>
                <div className="w-full flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={auth.currentUser?.photoURL as string | undefined}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-3/4">
                    <p className="text-xs font-medium">
                      {v.guestName} has sent a {v.type.split("-").join(" ")}
                    </p>
                    <p className="text-xs font-bold text-[#FF385C]">{v.time}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Notification;
