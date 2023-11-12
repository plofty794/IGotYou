import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import UserDropDownButton from "../partials/components/UserDropDownButton";
import { Button } from "../components/ui/button";
import { auth } from "@/firebase config/config";
import Loader from "@/partials/loaders/Loader";
import { Suspense, lazy } from "react";
import ListingsNavigation from "@/partials/components/ListingsNavigation";
import useGetListings from "@/hooks/useGetListings";

const AlertVerifyEmail = lazy(
  () => import("@/partials/components/AlertVerifyEmail")
);

function RootLayout() {
  const listings = useGetListings();
  const token = localStorage.getItem("token");
  const User = auth.currentUser;
  const navigate = useNavigate();

  return (
    <>
      {listings.status === "success" && User ? (
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
          {listings.data?.pages[0]?.data.hosts.length > 0 && (
            <ListingsNavigation />
          )}
          {<Outlet context={{ listings: listings.data }} />}
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
