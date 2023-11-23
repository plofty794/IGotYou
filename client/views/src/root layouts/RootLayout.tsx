import { Link, Navigate, Outlet } from "react-router-dom";
import UserDropDownButton from "../partials/components/UserDropDownButton";
import { Button } from "../components/ui/button";
import { auth } from "@/firebase config/config";
import Loader from "@/partials/loaders/Loader";
import { Suspense, lazy, useEffect, useState } from "react";
import ListingsNavigation from "@/partials/components/ListingsNavigation";
import useGetListings from "@/hooks/useGetListings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AlertVerifyEmail = lazy(
  () => import("@/partials/components/AlertVerifyEmail")
);
import { io } from "socket.io-client";
const socket = io("http://localhost:4030");

function RootLayout() {
  const listings = useGetListings();
  const token = localStorage.getItem("token");
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    socket.on("pong", () => setNotification((prev) => prev + 1));
  }, [socket]);

  function sendEmitter() {
    socket.emit("send-emitter", { message: "Hello from user" });
  }

  return (
    <>
      {listings.status === "success" && auth.currentUser ? (
        <main className="min-h-screen">
          <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
            <Link to={"/"}>
              <span className="w-full h-full">
                <img
                  className="object-cover w-[30px] max-h-full max-w-full"
                  loading="lazy"
                  src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                  alt="logo"
                />
              </span>
            </Link>
            <span className="flex justify-center items-center gap-4">
              {auth.currentUser?.emailVerified ? (
                <Button
                  className="text-sm font-semibold hover:bg-zinc-100 rounded-full"
                  variant={"ghost"}
                >
                  <Link to={"/hosting"} reloadDocument replace>
                    {" "}
                    Switch to hosting
                  </Link>
                </Button>
              ) : (
                <Suspense>
                  <AlertVerifyEmail User={auth.currentUser} />
                </Suspense>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={sendEmitter}>
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
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <UserDropDownButton />
            </span>
          </nav>
          {listings.data?.pages[0]?.data.hosts.length > 0 && (
            <ListingsNavigation />
          )}
          {
            <Outlet
              context={{ listings: listings.data, uid: auth.currentUser.uid }}
            />
          }
        </main>
      ) : auth.currentUser == null && token == null ? (
        <Navigate to={"/login"} replace />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default RootLayout;
