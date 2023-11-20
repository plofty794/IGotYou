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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
            <div className="flex items-center gap-5 text-sm">
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
                    <Link
                      to={`/become-a-host/${userProfileData.data?.data.user.uid}`}
                    >
                      Create a new listing
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center justify-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="cursor-pointer">
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
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <HostingDropdownMenu />
            </div>
          </nav>
          {<Outlet context={{ userData: userProfileData.data?.data }} />}
        </main>
      )}
    </>
  );
}

export default HostingLayout;
