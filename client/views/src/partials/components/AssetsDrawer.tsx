import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AdvancedImage,
  AdvancedVideo,
  lazyload,
  responsive,
} from "@cloudinary/react";
import { fadeIn, fadeOut } from "@cloudinary/url-gen/actions/effect";
import { Cloudinary } from "@cloudinary/url-gen/index";
import UpdateWishlist from "./UpdateWishlist";
import { useState } from "react";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AssetsDrawer({ listing }: { listing: any }) {
  const [viewListing, setViewListing] = useState("");

  return (
    <Drawer onClose={() => setViewListing("")}>
      <DrawerTrigger>
        <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl h-80 overflow-hidden">
          {listing.listingAssets[0].resource_type === "video" ? (
            <AdvancedImage
              className="object-cover h-full w-full"
              cldImg={cld
                .image(listing.listingAssets[0].public_id)
                .setAssetType("video")
                .format("auto:image")}
              plugins={[
                lazyload(),
                responsive({
                  steps: [800, 1000, 1400],
                }),
              ]}
            />
          ) : (
            <AdvancedImage
              className="object-cover h-full w-full"
              cldImg={cld.image(listing.listingAssets[0].public_id)}
              plugins={[
                lazyload(),
                responsive({
                  steps: [800, 1000, 1400],
                }),
              ]}
            />
          )}
          <div className="grid grid-cols-2 gap-1 h-full">
            {listing.listingAssets.map(
              (asset: TListingAsset, i: number) =>
                i != 0 &&
                (asset.resource_type === "video" ? (
                  <AdvancedImage
                    key={asset._id}
                    className="object-cover h-full w-full"
                    cldImg={cld
                      .image(asset.public_id)
                      .setAssetType("video")
                      .format("auto:image")}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                  />
                ) : (
                  <AdvancedImage
                    className="object-cover  h-full w-full"
                    cldImg={cld.image(asset.public_id)}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                  />
                ))
            )}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="p-0">
        <ScrollArea className="h-screen">
          <DrawerHeader className="flex justify-between w-full">
            <DrawerTitle className="text-3xl font-bold">
              {listing.serviceDescription}'s Assets
            </DrawerTitle>
            <div className="flex items-center justify-center gap-2 p-2">
              <p className="text-base font-semibold underline">Save</p>
              <UpdateWishlist listingID={listing._id} />
            </div>
          </DrawerHeader>
          <div className="flex flex-col items-center justify-center w-full gap-4 py-8">
            {listing.listingAssets.map((asset: TListingAsset) =>
              asset.resource_type === "video" ? (
                <div
                  onClick={(e) => {
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                    setViewListing(asset.public_id);
                  }}
                  className={`relative w-4/5 h-4/6 cursor-pointer ${
                    asset.public_id === viewListing ? "outline rounded-2xl" : ""
                  }`}
                >
                  <AdvancedImage
                    className="relative -z-10 object-contain w-full h-full mx-auto rounded-2xl border shadow-lg"
                    cldImg={cld
                      .image(asset.public_id)
                      .setAssetType("video")
                      .format("auto:image")}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                  />
                  <AdvancedVideo
                    className="absolute opacity-0 top-0 left-[50%] translate-x-[-50%] z-0 h-full object-contain hover:opacity-100 hover:z-10 rounded-2xl border shadow-lg w-max"
                    muted
                    onMouseOver={(e) => {
                      e.currentTarget.play();
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                    }}
                    loop
                    cldVid={cld
                      .video(asset.public_id)
                      .effect(fadeIn().duration(1000))
                      .effect(fadeOut().duration(2000))}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                    poster={cld
                      .image(asset.public_id)
                      .setAssetType("video")
                      .format("auto:image")
                      .toURL()}
                  />
                </div>
              ) : (
                <span
                  onClick={(e) => {
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                    setViewListing(asset.public_id);
                  }}
                  className={`w-3/5 h-4/6 cursor-pointer ${
                    asset.public_id === viewListing ? "outline rounded-2xl" : ""
                  }`}
                >
                  <AdvancedImage
                    className="object-cover rounded-2xl border shadow-xl w-full"
                    cldImg={cld.image(asset.public_id)}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                  />
                </span>
              )
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

type TListingAsset = {
  secure_url: string;
  public_id: string;
  _id: string;
  original_filename: string;
  resource_type: string;
  thumbnail_url: string;
};

export default AssetsDrawer;
