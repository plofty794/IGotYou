import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useGetWishlists from "@/hooks/useGetWishlists";
import useUpdateWishlist from "@/hooks/useUpdateWishlist";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function Wishlists() {
  const { data, isPending } = useGetWishlists();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wishlists, setWishlists] = useState<any[]>([]);
  const { mutate } = useUpdateWishlist();

  useMemo(() => {
    setWishlists(data?.data.wishlists);
  }, [data?.data.wishlists]);

  useEffect(() => {
    document.title = "Wishlists - IGotYou";
  }, []);

  return (
    <section className="flex flex-col gap-6 px-24 py-12 max-md:px-14 max-sm:px-8">
      {isPending ? (
        <ListingsLoader />
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl font-semibold max-md:text-2xl">
              Wishlists
            </h1>
            <Badge variant={"outline"} className="w-max font-bold">
              count: {wishlists?.length}
            </Badge>
          </div>
          {wishlists?.length > 0 ? (
            <div className="grid grid-cols-4 gap-8 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-2">
              {wishlists?.map((v: TListing) => (
                <div className="mx-auto flex w-max flex-col gap-2">
                  <Card className="relative h-72 w-72 overflow-hidden p-0">
                    <Link key={v._id} to={`/listings/show/${v._id}`}>
                      {v.listingAssets[0].format === "mp4" ? (
                        <AdvancedImage
                          className="h-full w-full rounded-lg object-cover transition-transform hover:scale-105"
                          cldImg={cld
                            .image(v.listingAssets[0].public_id)
                            .setAssetType("video")
                            .format("auto:image")}
                        />
                      ) : v.listingAssets[0].format === "mp3" ? (
                        <img
                          className="h-full w-full rounded-lg object-cover transition-transform hover:scale-105"
                          src={
                            "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png"
                          }
                          alt="some image"
                          loading="lazy"
                        />
                      ) : (
                        <AdvancedImage
                          cldImg={cld.image(v.listingAssets[0].public_id)}
                          plugins={[
                            lazyload(),
                            responsive({
                              steps: [800, 1000, 1400],
                            }),
                          ]}
                          className="h-full w-full rounded-lg object-cover transition-transform hover:scale-105"
                        />
                      )}
                    </Link>
                    <Button
                      onClick={() => mutate(v._id!)}
                      className="absolute right-1 top-1 rounded-full border bg-white p-2 hover:bg-slate-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#222222"
                        className="h-6 w-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </Card>
                  <div className="flex w-72 flex-col">
                    <div className="flex w-full items-center justify-between ">
                      <div className="w-2/4">
                        <p className="truncate text-lg font-semibold capitalize">
                          {v.serviceTitle}
                        </p>
                      </div>
                      <Badge className="font-bold capitalize">
                        {v.host?.username}
                      </Badge>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {v.serviceType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-semibold max-md:text-lg">
                {" "}
                Create your first wishlist
              </span>
              <span className="text-lg font-semibold text-gray-600 max-md:text-base">
                As you search, click the heart icon to save your favorite
                listings and services to a wishlist.
              </span>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Wishlists;
