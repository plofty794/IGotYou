import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Lottie from "lottie-react";
import { useEffect, useMemo } from "react";
import { formatValue } from "react-currency-input-field";
import { Link } from "react-router-dom";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import noListing from "../../assets/no-listings.json";
import useGetListingsPerCategory from "@/hooks/useGetListingsPerCategory";
import { auth } from "@/firebase config/config";
import { TCategories } from "./DigitalAudioServices";
import { Cloudinary } from "@cloudinary/url-gen/index";
import UpdateWishlist from "@/partials/components/UpdateWishlist";
import { formatDistance } from "date-fns";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import ListingsNavigation from "@/partials/components/ListingsNavigation";
import { TRating } from "../HostReviews";
import { useIntersectionObserver } from "usehooks-ts";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { Badge } from "@/components/ui/badge";
import { AxiosError, AxiosResponse } from "axios";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function DigitalVideoServices() {
  const { data, fetchNextPage, error, isPending, isFetchingNextPage } =
    useGetListingsPerCategory<TCategories>("Digital Video Services");

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 1,
  });

  const categorizedListings = useMemo(
    () =>
      data?.pages.flatMap(
        (page) =>
          page?.data.categorizedListings.filter(
            (v: TListing, i: number, arr: TListing[]) => arr.indexOf(v) == i,
          ),
      ),
    [data?.pages],
  ) as TListing[] | undefined;

  useEffect(() => {
    document.title = "Digital Video Services - IGotYou";
  }, []);

  useEffect(() => {
    if (error) {
      return;
    }
    if (isIntersecting) {
      fetchNextPage();
    }
  });

  return (
    <>
      <section className="mt-2 px-8">
        <ListingsNavigation />
        {!isPending ? (
          categorizedListings && categorizedListings.length > 0 ? (
            <>
              <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {categorizedListings?.map((v: TListing, i: number) =>
                  categorizedListings.length == i + 1 ? (
                    <Card
                      ref={ref}
                      key={v._id}
                      className="w-full overflow-hidden border-none shadow-none"
                    >
                      <CardHeader className="flex flex-col gap-1 p-0">
                        <Link
                          to={`${
                            auth.currentUser?.uid === v.host?.uid
                              ? `/hosting-listings/edit/${v._id}`
                              : `/listings/show/${v._id}`
                          } `}
                          className="mt-2"
                          replace
                        >
                          <Swiper
                            className="rounded-xl"
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
                              asset.format === "mp4" ? (
                                <SwiperSlide
                                  className="h-72 rounded-xl"
                                  key={asset.public_id}
                                >
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
                        </Link>
                      </CardHeader>
                      <CardContent className="mt-2 flex justify-between p-0">
                        <div className="flex flex-col">
                          <span className="text-base font-semibold capitalize">
                            {v.serviceTitle}
                          </span>
                          <span className="text-sm font-semibold text-gray-600">
                            {v.host?.username}
                          </span>

                          <div className="w-full">
                            <span className="text-sm font-semibold text-gray-600">
                              Ends in{" "}
                              {formatDistance(
                                new Date().setHours(0, 0, 0, 0),
                                new Date(v.endsAt),
                              )}
                            </span>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <span className="font-semibold">
                              {formatValue({
                                value: v.price.toString(),
                                intlConfig: {
                                  locale: "ph-PH",
                                  currency: "PHP",
                                },
                              })}{" "}
                              <span className="text-sm font-semibold">
                                service
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="mb-2 flex items-center justify-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-xs font-bold">
                              {v.host!.rating.length > 0
                                ? (
                                    v
                                      .host!.rating.map(
                                        (v: TRating) => v.guestRating,
                                      )
                                      .reduce((acc, curr) => acc + curr, 0) /
                                    v.host!.rating.length
                                  ).toFixed(1)
                                : "No rating"}
                            </span>
                          </div>
                          {v.host?.uid !== auth.currentUser?.uid && (
                            <>
                              <UpdateWishlist listingID={v._id!} />
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card
                      key={v._id}
                      className="w-full overflow-hidden border-none shadow-none"
                    >
                      <CardHeader className="flex flex-col gap-1 p-0">
                        <Link
                          to={`${
                            auth.currentUser?.uid === v.host?.uid
                              ? `/hosting-listings/edit/${v._id}`
                              : `/listings/show/${v._id}`
                          } `}
                          className="mt-2"
                          replace
                        >
                          <Swiper
                            className="rounded-xl"
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
                              asset.format === "mp4" ? (
                                <SwiperSlide
                                  className="h-72 rounded-xl"
                                  key={asset.public_id}
                                >
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
                        </Link>
                      </CardHeader>
                      <CardContent className="mt-2 flex justify-between p-0">
                        <div className="flex flex-col">
                          <span className="text-base font-semibold capitalize">
                            {v.serviceTitle}
                          </span>
                          <span className="text-sm font-semibold text-gray-600">
                            {v.host?.username}
                          </span>

                          <div className="w-full">
                            <span className="text-sm font-semibold text-gray-600">
                              Ends in{" "}
                              {formatDistance(
                                new Date().setHours(0, 0, 0, 0),
                                new Date(v.endsAt),
                              )}
                            </span>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <span className="font-semibold">
                              {formatValue({
                                value: v.price.toString(),
                                intlConfig: {
                                  locale: "ph-PH",
                                  currency: "PHP",
                                },
                              })}{" "}
                              <span className="text-sm font-semibold">
                                service
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="mb-2 flex items-center justify-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-xs font-bold">
                              {v.host!.rating.length > 0
                                ? (
                                    v
                                      .host!.rating.map(
                                        (v: TRating) => v.guestRating,
                                      )
                                      .reduce((acc, curr) => acc + curr, 0) /
                                    v.host!.rating.length
                                  ).toFixed(1)
                                : "No rating"}
                            </span>
                          </div>
                          {v.host?.uid !== auth.currentUser?.uid && (
                            <>
                              <UpdateWishlist listingID={v._id!} />
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </>
          ) : (
            <div className="mx-auto mt-16 w-max">
              <Lottie
                loop={false}
                animationData={noListing}
                className="h-64 w-64"
              />
            </div>
          )
        ) : (
          <div className="mx-auto mt-32 w-max">
            <l-pulsar size="50" speed="1.75" color="gray"></l-pulsar>
          </div>
        )}
        {isFetchingNextPage && (
          <div className="mx-auto w-max p-8">
            <l-dot-pulse size="43" speed="1.3" color="black"></l-dot-pulse>
          </div>
        )}
        {error && (
          <div className="mx-auto w-max p-8">
            <Badge>
              {((error as AxiosError).response as AxiosResponse).data.message}
            </Badge>
          </div>
        )}
      </section>
    </>
  );
}

export default DigitalVideoServices;
