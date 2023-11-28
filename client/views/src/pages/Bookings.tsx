import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetBookingRequests from "@/hooks/useGetBookingRequests";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Bookings() {
  const { data, isPending, status } = useGetBookingRequests();

  useEffect(() => {
    document.title = "Bookings - IGotYou";
  }, []);

  return (
    <>
      <section className="flex flex-col gap-4 px-16 py-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">Bookings</h1>
          <Separator />
        </div>
        {isPending ? (
          <ListingsLoader />
        ) : (
          <>
            {status === "success" &&
            data?.pages[0].data.bookingRequests.length > 0 ? (
              <div className="grid grid-cols-5">
                {data?.pages.map((page) =>
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  page.data.bookingRequests.map((v) => (
                    <Card key={v._id}>
                      <CardDescription className="p-4">
                        <span>
                          Your booking request for{" "}
                          {v.listingID.serviceDescription} is currently{" "}
                          {v.status}
                        </span>
                      </CardDescription>
                    </Card>
                  ))
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4 py-6">
                <h3 className="font-semibold text-2xl ">
                  No listings booked...yet!
                </h3>
                <span className="text-lg font-medium text-gray-600">
                  Time to power up your devices and start planning your next
                  multimedia experience!
                </span>
                <Button className="w-max p-6 text-lg font-medium bg-gray-950">
                  <Link to={"/"} reloadDocument replace>
                    Start searching
                  </Link>
                </Button>
              </div>
            )}
            <Separator />{" "}
          </>
        )}
      </section>
    </>
  );
}

export default Bookings;
