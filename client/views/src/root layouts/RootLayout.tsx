import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import UserDropDownButton from "../partials/components/UserDropDownButton";
import { LiaVideoSolid } from "react-icons/lia";
import { MdAudiotrack, MdOutlineEventSeat } from "react-icons/md";
import { RiFilePaperLine } from "react-icons/ri";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import { auth } from "@/firebase config/config";

function RootLayout() {
  const User = auth.currentUser;
  const navigate = useNavigate();

  return (
    <>
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
          <span className="border rounded-lg w-[400px] border-zinc-500 text-center">
            Search Navigation
          </span>

          <span className="text-sm font-medium flex justify-center items-center gap-5">
            {User?.emailVerified && (
              <Button
                className="font-medium text-xs"
                variant={"ghost"}
                onClick={() =>
                  navigate(`/become-a-host/${User && User.uid}/overview`)
                }
              >
                Make a Listing
              </Button>
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
              <MagicWandIcon width={18} height={18} />
            </span>
            <h3>Popular</h3>
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
    </>
  );
}

export default RootLayout;
