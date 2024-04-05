import { TFileType as TListingAssets } from "@/root layouts/BecomeAHostLayout";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import imgUrl from "/audio_image.png";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function ListingAssets({ listingAssets }: { listingAssets: TListingAssets[] }) {
  return (
    <>
      {listingAssets.length > 5 ? (
        <Carousel className="w-full">
          <CarouselContent>
            {listingAssets?.map((asset) =>
              asset.format === "mp4" ? (
                <CarouselItem
                  className="max-sm:w-1/2 md:basis-1/3 lg:basis-1/5"
                  key={asset._id}
                >
                  <span
                    className="flex aspect-square items-center justify-center"
                    key={asset.public_id}
                  >
                    <AdvancedImage
                      className="mx-auto h-full w-full cursor-pointer rounded-xl object-cover"
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
                  </span>
                </CarouselItem>
              ) : asset.format === "mp3" ? (
                <CarouselItem
                  className="max-sm:w-1/2 md:basis-1/3 lg:basis-1/5"
                  key={asset._id}
                >
                  <span
                    className="flex aspect-square items-center justify-center"
                    key={asset.public_id}
                  >
                    <img
                      className="mx-auto h-full w-full rounded-lg border object-cover"
                      src={imgUrl}
                      alt="some image"
                      loading="lazy"
                    />
                  </span>
                </CarouselItem>
              ) : (
                <CarouselItem
                  className="max-sm:w-1/2 md:basis-1/3 lg:basis-1/5"
                  key={asset._id}
                >
                  <span
                    key={asset._id}
                    className="flex aspect-square items-center justify-center"
                  >
                    <AdvancedImage
                      cldImg={cld.image(asset.public_id)}
                      plugins={[
                        lazyload(),
                        responsive({
                          steps: [800, 1000, 1400],
                        }),
                      ]}
                      className="mx-auto h-full w-full rounded-lg border object-cover"
                    />
                  </span>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
          <CarouselPrevious className="-left-8" />
          <CarouselNext className="-right-8" />
        </Carousel>
      ) : (
        <div className="flex w-full items-center gap-2 pb-4">
          {listingAssets?.map((asset) =>
            asset.format === "mp4" ? (
              <span
                className="h-52 w-full rounded-xl border"
                key={asset.public_id}
              >
                <AdvancedImage
                  className="mx-auto h-full w-full rounded-xl object-cover"
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
              </span>
            ) : asset.format === "mp3" ? (
              <span
                onClick={(e) => {
                  e.currentTarget.scrollIntoView({
                    block: "end",
                    behavior: "smooth",
                  });
                }}
                className="h-52 w-full rounded-xl border"
                key={asset.public_id}
              >
                <img
                  className="mx-auto h-full w-full rounded-xl object-cover"
                  src={imgUrl}
                  alt="some image"
                  loading="lazy"
                />
              </span>
            ) : (
              <span key={asset._id} className="h-52 w-full rounded-xl border">
                <AdvancedImage
                  cldImg={cld.image(asset.public_id)}
                  plugins={[
                    lazyload(),
                    responsive({
                      steps: [800, 1000, 1400],
                    }),
                  ]}
                  className="mx-auto h-full w-full rounded-lg border object-cover"
                />
              </span>
            ),
          )}
        </div>
      )}
    </>
  );
}

export default ListingAssets;
