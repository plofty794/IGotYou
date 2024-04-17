import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TRating } from "@/pages/HostReviews";
import { Link, useParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import ShowMoreText from "react-show-more-text";
import { useState } from "react";
import { auth } from "@/firebase config/config";

function RatingsCarousel({ rating }: { rating?: TRating[] }) {
  const { userID } = useParams();
  const showMore = useState(false);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-2xl"
    >
      <CarouselContent>
        {rating?.map((v) => (
          <>
            {v.hostID._id == userID ? (
              <CarouselItem key={v._id} className="md:basis-1/2">
                <div className="p-1">
                  <Card key={v._id} className="w-80 rounded-2xl">
                    <CardHeader className="flex-row gap-2 py-4">
                      <Link
                        to={`${
                          auth.currentUser?.uid == v.guestID.uid
                            ? `/users/show/${v.guestID.uid}`
                            : `/users/visit/show/${v.guestID._id}`
                        }`}
                      >
                        {" "}
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={v.guestID.photoUrl} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="!mt-0 flex flex-col">
                        <p className="text-sm font-bold">
                          {v.guestID.username}
                        </p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="w-max">
                              <p className="text-sm font-medium text-gray-600">
                                {format(new Date(v.createdAt), "MMMM d")}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{format(new Date(v.createdAt), "PPpp")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex flex-col items-start gap-2 pb-4">
                      <div className="flex items-center justify-start">
                        {Array.from({ length: v.guestRating }).map(() => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="#FCBF02"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="my-4 mt-2 border-s-4 border-gray-300 bg-gray-50 p-4 font-medium">
                        <ShowMoreText
                          lines={3}
                          more="Show more"
                          less="Show less"
                          className="content-css text-sm font-medium italic"
                          anchorClass="show-more-less-clickable"
                          onClick={showMore[1]}
                          expanded={false}
                          width={280}
                          truncatedEndingComponent={"... "}
                        >
                          " {v.guestFeedback}"
                        </ShowMoreText>
                      </blockquote>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ) : (
              <CarouselItem key={v._id} className="md:basis-1/2">
                <div className="p-1">
                  <Card key={v._id} className="w-80 rounded-2xl">
                    <CardHeader className="flex-row gap-2 py-4">
                      <Link
                        to={`${
                          auth.currentUser?.uid == v.hostID.uid
                            ? `/users/show/${v.hostID.uid}`
                            : `/users/visit/show/${v.hostID._id}`
                        }`}
                      >
                        {" "}
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={v.hostID.photoUrl} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="!mt-0 flex flex-col">
                        <p className="text-sm font-bold">{v.hostID.username}</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="w-max">
                              <p className="text-sm font-medium text-gray-600">
                                {format(new Date(v.createdAt), "MMMM d")}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{format(new Date(v.createdAt), "PPpp")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex flex-col items-start gap-2 pb-4">
                      <div className="flex items-center justify-start">
                        {Array.from({ length: v.hostRating }).map(() => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="#FCBF02"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="my-4 mt-2 border-s-4 border-gray-300 bg-gray-50 p-4 font-medium">
                        <ShowMoreText
                          lines={3}
                          more="Show more"
                          less="Show less"
                          className="content-css text-sm font-medium italic"
                          anchorClass="show-more-less-clickable"
                          onClick={showMore[1]}
                          expanded={false}
                          width={280}
                          truncatedEndingComponent={"... "}
                        >
                          " {v.hostFeedback}"
                        </ShowMoreText>
                      </blockquote>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            )}
          </>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default RatingsCarousel;
