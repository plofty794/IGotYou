import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useVisitListing from "@/hooks/useVisitListing";
import Loader from "@/partials/loaders/Loader";
import { useEffect, useState } from "react";
import { formatValue } from "react-currency-input-field";

function VisitListing() {
  const [wishlist, setWishlist] = useState(false);
  const { data, isPending } = useVisitListing();

  console.log(data?.data.listing);

  useEffect(() => {
    document.title = "View Listing - IGotYou";
  }, []);

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <section className="mx-auto w-5/6">
          <div className="pt-6 w-full flex justify-between items-center">
            <h1 className="text-3xl font-semibold">
              {data?.data.listing.serviceDescription}
            </h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => setWishlist((prev) => !prev)}
                  className="flex items-center justify-center gap-2 rounded-md"
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className={`w-6 h-6 stroke-gray-500 hover:stroke-slate-600 cursor-pointer ${
                      wishlist ? "fill-red-600" : "fill-none"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <span className="underline font-medium text-sm">Save</span>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-950">
                  <p>Save to wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl overflow-hidden">
            <img
              src={data?.data.listing.listingPhotos[0].secure_url}
              className="object-cover max-h-full max-w-full h-full w-full"
              loading="lazy"
            />
            <div className="grid grid-cols-2 gap-1 h-full">
              {data?.data.listing.listingPhotos.map(
                (photo: TListingPhoto, i: number) =>
                  i != 0 && (
                    <img
                      key={photo._id}
                      src={photo.secure_url}
                      className="object-cover max-h-full max-w-full h-full w-full"
                      loading="lazy"
                    />
                  )
              )}
            </div>
          </div>
          <div className="mt-7 w-full flex gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-semibold">
                  {data?.data.listing.serviceLocation}
                </span>
                <span className="font-medium">
                  {data?.data.listing.serviceType}
                </span>
                <div className="flex items-center">
                  <span>{data?.data.listing.host.rating}</span>
                </div>
              </div>
              <Separator />
              <Card className="border-0 shadow-none">
                <CardHeader className="items-center w-max">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={
                        data?.data.listing.host.photoUrl ??
                        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardTitle>Host name</CardTitle>
                </CardHeader>
                <CardContent>Host name</CardContent>
              </Card>
              <Separator />
            </div>
            <Card className="w-3/6 border-gray-300 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {formatValue({
                    value: data?.data.listing.price.toString(),
                    prefix: "₱",
                    intlConfig: {
                      locale: "PH",
                      currency: "php",
                    },
                  })}{" "}
                  <span className="text-sm font-semibold text-gray-600">
                    service
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 rounded-md border border-gray-400 w-full">
                  <div className="flex flex-col gap-1 p-2 border-r border-gray-400 ">
                    <span className="text-xs uppercase font-bold">
                      Available at
                    </span>
                    <span className="text-sm text-gray-600 font-bold">
                      {new Date(
                        data?.data.listing.availableAt as Date
                      ).toDateString()}
                    </span>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <span className="text-xs uppercase font-bold">Ends at</span>
                    <span className="text-sm text-gray-600 font-bold">
                      {new Date(
                        data?.data.listing.endsAt as Date
                      ).toDateString()}
                    </span>
                  </div>
                  <div className="p-2 border-t border-gray-400  col-span-full">
                    Guest
                  </div>
                </div>
                <Button className="mt-6 w-full p-6 bg-gray-950 text-base font-semibold">
                  Book
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}

type TListingPhoto = {
  secure_url: string;
  public_id: string;
  _id: string;
  original_filename: string;
};

export default VisitListing;
