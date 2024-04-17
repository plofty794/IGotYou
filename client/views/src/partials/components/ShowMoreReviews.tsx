import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useGetGuestReviews from "@/hooks/useGetGuestReviews";
import { TRating } from "@/pages/HostReviews";
import useGetHostReviews from "@/hooks/useGetHostReviews";
import { ScrollArea } from "@/components/ui/scroll-area";

function ShowMoreReviews() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"}>Show more reviews</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl">Reviews</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="guests">
          <ScrollArea className="h-[20rem] pr-4">
            <TabsList className="gap-2 bg-white">
              <TabsTrigger value="guests">From guests</TabsTrigger>
              <Separator orientation="vertical" />
              <TabsTrigger value="hosts">From Hosts</TabsTrigger>
            </TabsList>
            <TabsContent className="w-full" value="guests">
              <ReviewsFromGuest />
            </TabsContent>
            <TabsContent className="w-full" value="hosts">
              <ReviewsFromHost />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function ReviewsFromGuest() {
  const { data, isPending, fetchNextPage, isFetchingNextPage, error } =
    useGetGuestReviews();
  const showMore = useState(false);

  return (
    <>
      {isPending ? (
        "Loading..."
      ) : !data?.pages.flatMap(
          (page) => page.data.guestRatings?.map((v: TRating) => v),
        ).length ? (
        <Card className="mx-auto mt-8 flex w-full max-w-lg flex-col items-center justify-center gap-4 border p-8 shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#F9D2DF"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#E31C5F"
            className="h-14 w-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <div className="flex flex-col items-center gap-1">
            <p className="text-lg font-bold">
              Their first review will show up here
            </p>
            <p className="text-sm font-medium">
              Seems like guests haven't leave them a feedback yet.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <div className="mt-6 flex flex-col gap-2">
            {data?.pages.flatMap(
              (page) =>
                page.data.guestRatings?.map((v: TRating) => (
                  <Card key={v._id} className="w-full rounded-2xl shadow-xl">
                    <CardHeader className="flex-row gap-2 pb-4 pt-2">
                      <Link to={`/users/visit/show/${v.guestID._id}`}>
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
                      <blockquote className="my-4 mt-2 border-s-4 border-gray-300 bg-gray-50 p-4">
                        <ShowMoreText
                          lines={3}
                          more="Show more"
                          less="Show less"
                          className="content-css text-sm font-medium italic"
                          anchorClass="show-more-less-clickable"
                          onClick={showMore[1]}
                          expanded={false}
                          width={350}
                          truncatedEndingComponent={"... "}
                        >
                          "{v.guestFeedback}"
                        </ShowMoreText>
                      </blockquote>
                    </CardFooter>
                  </Card>
                )),
            )}
            <Button
              variant={"outline"}
              disabled={isFetchingNextPage || error != null}
              onClick={() => fetchNextPage()}
              className="ml-auto mt-4 gap-2 rounded-full"
            >
              {error ? (
                "No more reviews to load"
              ) : (
                <>
                  Show more reviews
                  {isFetchingNextPage ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 animate-spin"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                      />
                    </svg>
                  )}
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </>
  );
}

function ReviewsFromHost() {
  const { data, isPending, fetchNextPage, isFetchingNextPage, error } =
    useGetHostReviews();
  const showMore = useState(false);

  return (
    <>
      {isPending ? (
        "Loading..."
      ) : !data?.pages.flatMap(
          (page) => page.data.hostRatings?.map((v: TRating) => v),
        ).length ? (
        <Card className="mx-auto mt-8 flex w-full max-w-lg flex-col items-center justify-center gap-4 border p-8 shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#F9D2DF"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#E31C5F"
            className="h-14 w-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <div className="flex flex-col items-center gap-1">
            <p className="text-lg font-bold">
              Their first review will show up here
            </p>
            <p className="text-sm font-medium">
              Seems like hosts haven't leave them a feedback yet.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <div className="mt-6 flex flex-col gap-2">
            {data?.pages.flatMap(
              (page) =>
                page.data.hostRatings?.map((v: TRating) => (
                  <Card key={v._id} className="w-full rounded-2xl shadow-xl">
                    <CardHeader className="flex-row gap-2 pb-4 pt-2">
                      <Link to={`/users/visit/show/${v.hostID._id}`}>
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
                      <blockquote className="my-4 mt-2 border-s-4 border-gray-300 bg-gray-50 p-4">
                        <ShowMoreText
                          lines={3}
                          more="Show more"
                          less="Show less"
                          className="content-css text-sm font-medium italic"
                          anchorClass="show-more-less-clickable"
                          onClick={showMore[1]}
                          expanded={false}
                          width={350}
                          truncatedEndingComponent={"... "}
                        >
                          "{v.hostFeedback}"
                        </ShowMoreText>
                      </blockquote>
                    </CardFooter>
                  </Card>
                )),
            )}
            <Button
              variant={"outline"}
              disabled={isFetchingNextPage || error != null}
              onClick={() => fetchNextPage()}
              className="ml-auto mt-4 gap-2 rounded-full"
            >
              {error ? (
                "No more reviews to load"
              ) : (
                <>
                  Show more reviews
                  {isFetchingNextPage ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 animate-spin"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                      />
                    </svg>
                  )}
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default ShowMoreReviews;
