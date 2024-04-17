import { Button } from "@/components/ui/button";
import { auth } from "@/firebase config/config";
import { NavLink, Outlet } from "react-router-dom";

function HostReviewsLayout() {
  return (
    <div className="flex flex-col justify-center gap-4 p-8 max-md:p-6">
      <h1 className="text-center text-3xl font-bold">Reviews</h1>
      <div className="flex items-center gap-6">
        <Button className="reviews p-2 font-medium" variant={"ghost"}>
          <NavLink
            className="text-base text-gray-600"
            to={`/hosting-reviews/${auth.currentUser?.uid}/guest`}
          >
            From guests
          </NavLink>
        </Button>
        <Button className="reviews p-2 font-medium" variant={"ghost"}>
          <NavLink
            className="text-base text-gray-600"
            to={`/hosting-reviews/${auth.currentUser?.uid}/host`}
          >
            From hosts
          </NavLink>
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Outlet />
      </div>
    </div>
  );
}

export default HostReviewsLayout;
