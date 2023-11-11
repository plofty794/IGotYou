import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import UserDropDownButton from "../partials/components/UserDropDownButton";
import { Button } from "../components/ui/button";
import { auth } from "@/firebase config/config";
import Loader from "@/partials/loaders/Loader";
import { Suspense, lazy } from "react";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import useGetListings from "@/hooks/useGetListings";

const AlertVerifyEmail = lazy(
  () => import("@/partials/components/AlertVerifyEmail")
);

function RootLayout() {
  const { data, status, isPending } = useGetListings();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const User = auth.currentUser;
  const navigate = useNavigate();
  const listings = queryClient.getQueryData<InfiniteData<AxiosResponse>>([
    "listings",
  ]);

  return (
    <>
      {User ? (
        <main className="min-h-screen">
          <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
            <Link to={"/"}>
              <span className="w-full h-full">
                <img
                  className="object-cover h-full w-[30px] max-h-full max-w-full"
                  loading="lazy"
                  src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                  alt="logo"
                />
              </span>
            </Link>
            <span className="flex justify-center items-center gap-5">
              {User?.emailVerified ? (
                <Button
                  className="text-sm text-[#222222] font-medium hover:bg-zinc-100 p-4 rounded-full"
                  variant={"ghost"}
                  onClick={() =>
                    navigate(`/become-a-host/${User && User.uid}/overview`)
                  }
                >
                  Switch to hosting
                </Button>
              ) : (
                <Suspense>
                  <AlertVerifyEmail User={User} />
                </Suspense>
              )}
              <UserDropDownButton />
            </span>
          </nav>
          {listings?.pages[0].data.hosts.length > 0 && (
            <div className="px-12 py-8 text-xs flex items-center justify-evenly gap-10">
              <NavLink
                to={"/"}
                className="flex flex-col items-center gap-1 opacity-70"
              >
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
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                  />
                </svg>
                <span className="font-extrabold">Home</span>
              </NavLink>
              <NavLink
                to={"/category/photography&videography"}
                className="flex flex-col items-center gap-1 opacity-70"
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
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <span className="font-extrabold">
                  Photography & Videography
                </span>
              </NavLink>
              <NavLink
                to={"/category/audio&sound_services"}
                className="flex flex-col items-center gap-1 opacity-70"
              >
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
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.706 8.756 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
                <span className="font-extrabold">Audio & Sound Services</span>
              </NavLink>
              <NavLink
                to={"/category/events&entertainment"}
                className="flex flex-col items-center gap-1 opacity-70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#343333"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"
                  />
                </svg>
                <span className="font-extrabold">Events & Entertainment</span>
              </NavLink>
              <NavLink
                to={"/category/events&entertainment"}
                className="flex flex-col items-center gap-1 opacity-70"
              >
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
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9span.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5spanv3H6v-3z"
                  />
                </svg>
                <span className="font-extrabold">Content and Marketing</span>
              </NavLink>
            </div>
          )}
          {<Outlet />}
        </main>
      ) : User == null && token == null ? (
        <Navigate to={"/login"} replace />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default RootLayout;
