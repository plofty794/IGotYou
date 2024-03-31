import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HostingTabs from "@/partials/components/hosting/HostingTabs";
import { format } from "date-fns";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

function Hosting() {
  const location = useLocation();
  const {
    userData: { user },
  } = useOutletContext<TUserData>();

  useEffect(() => {
    document.title = "Host Dashboard - IGotYou";
  }, []);

  return (
    <section className="flex flex-col gap-14 p-16 max-md:gap-8 max-md:p-12 max-sm:h-screen max-sm:p-6">
      <h1 className="text-3xl font-semibold max-md:text-2xl">
        Welcome back, {user.username}
      </h1>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold max-md:text-lg max-sm:text-base">
            Your reservations
          </span>
          <Button className="rounded-full bg-gray-950 p-4 font-semibold max-sm:text-xs">
            <Link to={"/hosting-reservations/all"}>All reservations</Link>
          </Button>
        </div>
        <HostingTabs />
        <Card className="mt-4 shadow-lg">
          {location.pathname.includes("reservations") ? (
            <Outlet />
          ) : (
            <CardContent className="mx-auto w-max p-8 max-md:p-4 max-sm:p-0">
              <CardHeader className="max-md:p-4">
                <CardTitle className="text-4xl font-bold max-md:text-2xl max-sm:text-lg">
                  Today is, {format(new Date(), "iiii MMMM do")}.
                </CardTitle>
              </CardHeader>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
}

export default Hosting;

type TUserData = {
  userData: {
    user: THost;
  };
};

type TListingPhotos = {
  original_filename: string;
  public_id: string;
  secure_url: string;
  _id: string;
};

type TListings = {
  availableAt: string;
  createdAt: string;
  endsAt: string;
  host: THost;
  listingPhotos: [TListingPhotos];
  price: number;
  serviceDescription: string;
  serviceType: string;
  updatedAt: string;
  _id: string;
};

type THost = {
  email: string;
  emailVerified: boolean;
  listings: TListings[];
  mobileVerified: boolean;
  photoUrl: null | string;
  providerId: string;
  reviews: [];
  subscriptionExpiresAt: string;
  subscriptionStatus: string;
  uid: string;
  userStatus: string;
  username: string;
  rating: number;
};
