import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import { TFileType, TListing } from "@/root layouts/BecomeAHostLayout";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  AdvancedImage,
  AdvancedVideo,
  lazyload,
  responsive,
} from "@cloudinary/react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fadeIn, fadeOut } from "@cloudinary/url-gen/actions/effect";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function AssetsSlider({ listings }: { listings: TListing }) {
  return (
    <Drawer>
      <DrawerTrigger className="w-full">
        <Swiper
          className="rounded-xl"
          spaceBetween={10}
          cssMode={true}
          navigation={{
            enabled: true,
          }}
          pagination={true}
          mousewheel={true}
          modules={[Navigation, Pagination, Mousewheel]}
        >
          {listings.listingAssets?.map((asset) =>
            asset.format === "mp4" ? (
              <SwiperSlide className="h-72 rounded-xl" key={asset.public_id}>
                <AdvancedImage
                  className="mx-auto h-72 w-full rounded-xl object-cover"
                  cldImg={cld
                    .image(asset.public_id)
                    .setAssetType("video")
                    .format("auto:image")}
                />
              </SwiperSlide>
            ) : asset.format === "mp3" ? (
              <SwiperSlide key={asset.public_id}>
                <img
                  className="mx-auto h-72 w-full rounded-lg border object-cover"
                  src={
                    "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png"
                  }
                  alt="some image"
                  loading="lazy"
                />
              </SwiperSlide>
            ) : (
              <SwiperSlide key={asset.public_id}>
                <AdvancedImage
                  key={asset._id}
                  cldImg={cld.image(asset.public_id)}
                  plugins={[
                    lazyload(),
                    responsive({
                      steps: [800, 1000, 1400],
                    }),
                  ]}
                  className="mx-auto h-72 w-full rounded-lg border object-cover"
                />
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </DrawerTrigger>
      <DrawerContent className="p-0">
        <ScrollArea className="h-screen">
          <DrawerHeader className="flex w-full justify-between">
            <DrawerTitle className="text-2xl font-bold capitalize">
              {listings.serviceTitle}'s Assets
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex w-full flex-col items-center justify-center gap-4 py-8">
            {listings.listingAssets.map((asset: TFileType) =>
              asset.format === "mp4" ? (
                <div className="relative h-4/6 w-4/5">
                  <AdvancedImage
                    className="relative -z-10 mx-auto h-full w-full rounded-2xl border object-contain shadow-lg"
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
                    className="absolute left-[50%] top-0 z-0 h-full w-max translate-x-[-50%] rounded-2xl border object-contain opacity-0 shadow-lg hover:z-10 hover:opacity-100"
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
              ) : asset.format === "mp3" ? (
                <span className="max-w-[340px]">
                  <img
                    className="rounded-2xl border object-cover shadow-xl"
                    src={
                      "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png"
                    }
                    alt="some image"
                    loading="lazy"
                  />
                  <AudioPlayer
                    className="w-full rounded-2xl border shadow-xl"
                    header={
                      <Badge className="w-max max-w-full">
                        <p className="truncate">{asset.original_filename}</p>
                      </Badge>
                    }
                    src={asset.secure_url}
                    preload="auto"
                  />
                </span>
              ) : (
                <span className="max-w-4xl">
                  <AdvancedImage
                    className="rounded-2xl border object-cover shadow-xl"
                    cldImg={cld.image(asset.public_id)}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                  />
                </span>
              ),
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default AssetsSlider;
