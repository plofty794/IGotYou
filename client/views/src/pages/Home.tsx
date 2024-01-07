import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import noListing from "../assets/no-listings.json";
import { InfiniteData } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { formatValue } from "react-currency-input-field";
import { auth } from "@/firebase config/config";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AddToWishlist from "@/partials/components/AddToWishlist";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  AdvancedImage,
  AdvancedVideo,
  lazyload,
  responsive,
} from "@cloudinary/react";
import { fadeIn, fadeOut } from "@cloudinary/url-gen/actions/effect";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

type TOutletContext = {
  listings: InfiniteData<AxiosResponse<TListings>>;
  uid: string;
};

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function Home() {
  const { listings, uid } = useOutletContext<TOutletContext>();

  useEffect(() => {
    document.title = "IGotYou";
  }, []);

  return (
    <>
      {!auth.currentUser?.emailVerified && (
        <Dialog
          defaultOpen={
            sessionStorage.getItem("checked") === "true" ? false : true
          }
        >
          <DialogContent className="p-0">
            <DialogHeader className="p-4">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon
                  color="orange"
                  width={25}
                  height={25}
                />
                <DialogTitle className="font-semibold text-base">
                  Some features are disabled!
                </DialogTitle>
              </div>
            </DialogHeader>
            <Separator />
            <DialogFooter>
              <div className="px-6 py-4">
                <div className="flex flex-col justify-center gap-2">
                  <span className="text-sm ">
                    We trust you are doing well. To bolster the{" "}
                    <span className="font-bold text-red-500 underline underline-offset-2">
                      security
                    </span>{" "}
                    and{" "}
                    <span className="font-bold text-red-500 underline underline-offset-2">
                      reliability
                    </span>{" "}
                    of our platform, we seek your cooperation in verifying your
                    email address. This verification is essential before you can{" "}
                    <span className="font-bold text-red-500 underline underline-offset-2">
                      access certain features
                    </span>{" "}
                    on our website.
                  </span>
                  <span className="text-sm  ">
                    We appreciate your collaboration in maintaining the security
                    and trustworthiness of our platform. Anticipating your
                    verified email and the opportunity to see your contributions
                    soon!
                  </span>
                </div>
              </div>
            </DialogFooter>
            <Separator />
            <div className="m-2 p-2 flex items-center justify-center gap-2 w-max ml-auto">
              <Label htmlFor="checkbox" className="text-xs font-medium">
                Don't show this again
              </Label>
              <Checkbox
                className="rounded-full"
                onCheckedChange={(checked) =>
                  sessionStorage.setItem("checked", JSON.stringify(checked))
                }
                id="checkbox"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
      <section className="px-8 mt-2">
        {listings.pages[0].data.listings.length > 0 ? (
          <>
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
              {listings.pages.map((page) =>
                page.data.listings.map((v, i) => (
                  <Card
                    key={v._id}
                    className="border-none shadow-none overflow-hidden w-full"
                  >
                    <CardHeader className="p-0 flex flex-col gap-1">
                      <Swiper
                        key={i}
                        spaceBetween={10}
                        cssMode={true}
                        navigation={{
                          enabled: true,
                        }}
                        pagination={true}
                        mousewheel={true}
                        modules={[Navigation, Pagination, Mousewheel]}
                      >
                        {v.listingAssets?.map((asset) =>
                          asset.resource_type === "video" ? (
                            <SwiperSlide
                              className="relative"
                              key={asset.public_id}
                            >
                              <AdvancedImage
                                className="relative -z-10 rounded-lg h-72 w-full mx-auto object-cover hover:cursor-pointer"
                                cldImg={cld
                                  .image(asset.public_id)
                                  .setAssetType("video")
                                  .format("auto:image")}
                              />
                              <AdvancedVideo
                                className="absolute opacity-0 top-0 left-0 z-0 rounded-lg h-72 w-full mx-auto object-cover hover:opacity-100 hover:z-10"
                                muted
                                onMouseOver={(e) => {
                                  e.currentTarget.play();
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.pause();
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.currentTarget.requestFullscreen();
                                }}
                                loop
                                cldVid={cld
                                  .video(asset.public_id)
                                  .effect(fadeIn().duration(2000))
                                  .effect(fadeOut().duration(4000))}
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
                            </SwiperSlide>
                          ) : (
                            <SwiperSlide key={asset.public_id}>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <AdvancedImage
                                    key={asset._id}
                                    cldImg={cld.image(asset.public_id)}
                                    plugins={[lazyload()]}
                                    className="rounded-lg h-72 w-full mx-auto object-cover"
                                  />
                                </DialogTrigger>
                                <DialogContent className="p-0 h-max w-max items-center justify-center">
                                  <AdvancedImage
                                    key={asset._id}
                                    cldImg={cld.image(asset.public_id)}
                                    plugins={[
                                      lazyload(),
                                      responsive({
                                        steps: [800, 1000, 1400],
                                      }),
                                    ]}
                                    className="object-cover w-max h-max rounded-lg"
                                  />
                                </DialogContent>
                              </Dialog>
                            </SwiperSlide>
                          )
                        )}
                      </Swiper>
                    </CardHeader>

                    <CardContent className="mt-2 p-0 flex justify-between">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">
                          {v.serviceType}
                        </span>
                        <span className="text-sm font-semibold text-gray-600">
                          {v.host.username}
                        </span>

                        <div className="w-full">
                          <span className="text-gray-600 font-semibold text-sm">
                            Ends{" "}
                            {formatDistanceToNow(new Date(v.endsAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <div className="w-full flex items-center justify-between">
                          <span className="mt-1 font-semibold">
                            {formatValue({
                              value: v.price.toString(),
                              intlConfig: {
                                locale: "ph-PH",
                                currency: "PHP",
                              },
                            })}{" "}
                            <span className="text-sm font-normal">service</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="mb-2 flex items-center justify-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-semibold text-xs">
                            {v.host.rating.length > 0
                              ? v.host.rating.length
                              : "No rating"}
                          </span>
                        </div>
                        {v.host.uid !== auth.currentUser?.uid && (
                          <>
                            <AddToWishlist listingID={v._id} />
                            <Link
                              to={`${
                                uid === v.host.uid
                                  ? `/users/show/${v.host.uid}`
                                  : `/listings/show/${v._id}`
                              } `}
                              className="mt-2"
                            >
                              <Button
                                className="p-0"
                                variant={"link"}
                                size={"sm"}
                              >
                                View listing
                              </Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center">
            <Lottie
              loop={false}
              animationData={noListing}
              className="w-64 h-64"
            />
            <span className="text-gray-600 font-bold text-xl">
              No listings to show
            </span>
          </div>
        )}
      </section>
    </>
  );
}

type TListingAssets = {
  original_filename: string;
  public_id: string;
  secure_url: string;
  _id: string;
  resource_type: string;
  thumbnail_url: string;
};

type TListings = {
  listings: [
    {
      availableAt: string;
      createdAt: string;
      endsAt: string;
      host: THost;
      listingAssets: [TListingAssets];
      price: number;
      serviceDescription: string;
      serviceType: string;
      updatedAt: string;
      _id: string;
    }
  ];
};

type THost = {
  email: string;
  emailVerified: boolean;
  listings: string[];
  mobileVerified: boolean;
  photoUrl: null | string;
  providerId: string;
  subscriptionExpiresAt: string;
  subscriptionStatus: string;
  uid: string;
  userStatus: string;
  username: string;
  rating: [];
};

export default Home;
