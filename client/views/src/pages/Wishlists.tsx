import { Card } from "@/components/ui/card";
import useGetWishlists from "@/hooks/useGetWishlists";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function Wishlists() {
  const { data, isPending } = useGetWishlists();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wishlists, setWishlists] = useState<any[]>([]);

  useMemo(() => {
    setWishlists(data?.data.wishlists);
  }, [data?.data.wishlists]);

  useEffect(() => {
    document.title = "Wishlists - IGotYou";
  }, []);

  return (
    <section className="py-12 px-24 flex flex-col gap-6">
      {isPending ? (
        <ListingsLoader />
      ) : (
        <>
          <h1 className="font-semibold text-4xl">Wishlists</h1>
          {wishlists?.length > 0 ? (
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
              {wishlists?.map((v) => (
                <div className="flex flex-col gap-2">
                  <Card className="relative h-72 w-72 p-0 overflow-hidden">
                    <AdvancedImage
                      key={v.listingAssets[0].public_id}
                      cldImg={cld.image(v.listingAssets[0].public_id)}
                      plugins={[
                        lazyload(),
                        responsive({
                          steps: [800, 1000, 1400],
                        }),
                      ]}
                      className="rounded-lg h-full w-full hover:scale-105 transition-transform object-cover"
                    />
                    <div
                      className="absolute top-1 left-1 
cursor-pointer bg-gray-200 rounded-full border p-2"
                    >
                      <Cross2Icon
                        className="w-5 h-5 z-10 hover:w-6 hover:h-6 transition-all"
                        strokeWidth={2}
                      />
                    </div>
                  </Card>
                  <div className="flex flex-col">
                    <div className="w-full flex items-center justify-between">
                      <span className="font-semibold text-lg">
                        {v.serviceDescription}
                      </span>
                      <span className="text-xs font-semibold text-gray-600">
                        Host {v.host.username}
                      </span>
                    </div>
                    <span className="font-semibold text-sm text-gray-600">
                      {v.serviceType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-xl">
                {" "}
                Create your first wishlist
              </span>
              <span className="font-medium text-gray-600">
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
