import { Button } from "@/components/ui/button";
import useGetCurrentUserProfile from "@/hooks/useGetUserProfile";
import HostingDropdownMenu from "@/partials/components/HostingDropdownMenu";
import Loader from "@/partials/loaders/Loader";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function HostingLayout() {
  const userProfileData = useGetCurrentUserProfile();

  return (
    <>
      {userProfileData.isPending ? (
        <Loader />
      ) : (
        <main className="min-h-screen">
          <nav className="bg-white shadow py-5 px-20 flex justify-between items-center w-full max-w-screen-2xl mx-auto 2xl:rounded-b-lg">
            <Link to={"/hosting"}>
              <span>
                <img
                  className="object-cover w-[30px] max-h-full max-w-full"
                  loading="lazy"
                  src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                  alt="logo"
                />
              </span>
            </Link>
            <div className="flex gap-5 text-sm">
              <NavLink to={"/hosting"} className="font-medium text-gray-600">
                Today
              </NavLink>
              <NavLink to={"/inbox"} className="font-medium text-gray-600">
                Inbox
              </NavLink>
              <NavLink to={"/calendar"} className="font-medium text-gray-600">
                Calendar
              </NavLink>
              <NavLink to={"/insights"} className="font-medium text-gray-600">
                Insights
              </NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center justify-center gap-1 font-medium text-gray-600 h-max p-0 border-none shadow-none hover:bg-white">
                    Menu
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem className="p-4 font-medium text-gray-600">
                    Listings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 font-medium text-gray-600">
                    Reservations
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 font-medium text-gray-600">
                    Earnings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 font-medium text-gray-600">
                    Create a new listing
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <HostingDropdownMenu />
          </nav>
          {<Outlet context={{ userData: userProfileData.data?.data }} />}
        </main>
      )}
    </>
  );
}

export default HostingLayout;
