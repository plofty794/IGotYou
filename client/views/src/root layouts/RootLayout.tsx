import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import UserDropDownButton from "../partials/components/UserDropDownButton";
import { LiaVideoSolid } from "react-icons/lia";
import { MdAudiotrack, MdOutlineEventSeat } from "react-icons/md";
import { RiFilePaperLine } from "react-icons/ri";
import { HomeIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import { auth } from "@/firebase config/config";
import Loader from "@/partials/loaders/Loader";
import { Suspense, lazy } from "react";

const AlertVerifyEmail = lazy(
  () => import("@/partials/components/AlertVerifyEmail")
);

function RootLayout() {
  const token = localStorage.getItem("token");
  const User = auth.currentUser;
  const navigate = useNavigate();

  return (
    <>
      {User ? (
        <main className="min-h-screen">
          <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
            <Link to={"/"}>
              <span>
                <img
                  className="w-[30px] h-[30px]"
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
          <div className="font-semibold px-12 py-8 text-xs flex items-center justify-evenly gap-10">
            <NavLink
              to={"/"}
              className="flex flex-col items-center gap-1 text-[#434242] hover:text-[#a259ff]"
            >
              <span>
                <HomeIcon width={18} height={18} />
              </span>
              <h3>Home</h3>
            </NavLink>
            <NavLink
              to={"/category/photography&videography"}
              className="flex flex-col items-center gap-1 text-[#434242] hover:text-[#a259ff]"
            >
              <span className="text-xl">
                <LiaVideoSolid />
              </span>
              <h3>Photography & Videography</h3>
            </NavLink>
            <NavLink
              to={"/category/audio&sound_services"}
              className="flex flex-col items-center gap-1 text-[#434242] hover:text-[#a259ff]"
            >
              <span className="text-xl">
                <MdAudiotrack />
              </span>
              <h3>Audio & Sound Services</h3>
            </NavLink>
            <NavLink
              to={"/category/events&entertainment"}
              className="flex flex-col items-center gap-1 text-[#434242] hover:text-[#a259ff]"
            >
              <span className="text-xl">
                <MdOutlineEventSeat />
              </span>
              <h3>Events & Entertainment</h3>
            </NavLink>
            <NavLink
              to={"/category/events&entertainment"}
              className="flex flex-col items-center gap-1 text-[#434242] hover:text-[#a259ff]"
            >
              <span className="text-xl">
                <RiFilePaperLine />
              </span>
              <h3>Content and Marketing</h3>
            </NavLink>
          </div>
          {<Outlet />}
        </main>
      ) : !User && !token ? (
        <Navigate to={"/login"} replace />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default RootLayout;
