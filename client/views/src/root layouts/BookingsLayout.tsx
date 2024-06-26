import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetGuestNotifications from "@/hooks/useGetGuestNotifications";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { CircleIcon } from "@radix-ui/react-icons";
import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { SocketContextProvider } from "@/context/SocketContext";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AxiosResponse } from "axios";
import { useMediaQuery } from "usehooks-ts";

function BookingsLayout() {
  const { socket } = useContext(SocketContextProvider);

  const { data } = useGetGuestNotifications();
  const queryClient = useQueryClient();
  const matches = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    socket?.on("booking-requestUpdate", () => {
      queryClient.invalidateQueries({
        queryKey: ["guest-notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["guest-booking-requests"],
      });
    });
  }, [queryClient, socket]);

  async function readGuestBookingRequestNotification(notificationID: string) {
    await axiosPrivateRoute.patch(
      `/api/users/current-user/notifications/read-guest-booking-request-notification/${notificationID}`,
      {
        read: true,
      },
    );
    queryClient.invalidateQueries({ queryKey: ["guest-booking-requests"] });
    queryClient.invalidateQueries({ queryKey: ["guest-notifications"] });
  }

  return (
    <>
      <main className="min-h-screen">
        <nav className="sticky top-0 z-20 mx-auto flex w-full max-w-screen-2xl items-center justify-between bg-white px-28 py-5 shadow-md max-md:px-12 2xl:rounded-b-lg">
          <Link to={"/"}>
            <span>
              <img
                className="max-h-full w-[30px] max-w-full object-cover"
                loading="lazy"
                src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                alt="logo"
              />
            </span>
          </Link>
          <div className="flex items-center justify-center gap-4">
            <UserDropDownButton />
          </div>
        </nav>
        {matches ? (
          <SwiperBookingNavigation
            data={data}
            readGuestBookingRequestNotification={
              readGuestBookingRequestNotification
            }
          />
        ) : (
          <>
            <div className="bookings mx-auto flex w-max items-center justify-center gap-4 p-4 pb-2 max-md:gap-2 max-md:p-2">
              <NavLink
                to={"/bookings/all"}
                className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600 max-md:p-2 max-md:text-xs"
              >
                Requests
              </NavLink>
              <NavLink
                to={"/bookings/approved"}
                className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600 max-md:p-2 max-md:text-xs"
              >
                Approved
              </NavLink>
              <NavLink
                to={"/bookings/pending"}
                className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600 max-md:p-2 max-md:text-xs"
              >
                Pending
              </NavLink>
              <NavLink
                to={"/bookings/declined"}
                className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600 max-md:p-2 max-md:text-xs"
              >
                Declined
              </NavLink>
              <NavLink
                to={"/bookings/cancelled"}
                className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600 max-md:p-2 max-md:text-xs"
              >
                Cancelled
              </NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative w-max">
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </Button>
                    {data?.data.guestNotifications.filter(
                      (v: { read: boolean; notificationType: string }) =>
                        v.read === false &&
                        v.notificationType !== "New-Message",
                    ).length > 0 && (
                      <span className="absolute right-0 top-[-5px] h-4 w-4 rounded-full bg-[#FF385C] text-center text-xs font-bold text-white outline outline-1 outline-white">
                        {
                          data?.data.guestNotifications.filter(
                            (v: { read: boolean }) => !v.read,
                          ).length
                        }
                      </span>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[300px] p-0">
                  <DropdownMenuLabel className="p-4 text-base font-bold">
                    Booking Notifications
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <ScrollArea className="h-60">
                    {data?.data.guestNotifications.filter(
                      (v: { notificationType: string }) =>
                        v.notificationType != "New-Message",
                    ).length > 0 ? (
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      data?.data.guestNotifications.map((v: any) => (
                        <>
                          {v.notificationType === "Booking-Declined" ? (
                            <>
                              <DropdownMenuItem className="w-full p-0">
                                <Link
                                  onClick={() =>
                                    readGuestBookingRequestNotification(v._id)
                                  }
                                  key={v._id}
                                  to={"/bookings/declined"}
                                  className="w-full p-4 hover:bg-[#F5F5F5]"
                                >
                                  <div className="flex w-full items-center gap-3">
                                    <div className="w-full">
                                      <p className="text-xs font-bold text-gray-600">
                                        {v.senderID.username} has sent you a{" "}
                                        {(v.notificationType as string)
                                          .split("-")
                                          .join(" ")}{" "}
                                      </p>
                                      <span className="text-xs font-bold text-red-600">
                                        {formatDistanceToNow(
                                          new Date(v.createdAt),
                                          {
                                            addSuffix: true,
                                          },
                                        )}
                                      </span>
                                    </div>
                                    {!v.read && (
                                      <CircleIcon
                                        height={10}
                                        width={10}
                                        color="blue"
                                        className="h-max w-max rounded-full bg-blue-600 fill-blue-600 p-0"
                                      />
                                    )}
                                  </div>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          ) : v.notificationType === "Booking-Approved" ? (
                            <>
                              <DropdownMenuItem className="w-full p-0">
                                <Link
                                  onClick={() =>
                                    readGuestBookingRequestNotification(v._id)
                                  }
                                  key={v._id}
                                  to={`/reservation-details/${v.data?.reservationID}`}
                                  className="w-full p-4 hover:bg-[#F5F5F5]"
                                >
                                  <div className="flex w-full items-center gap-3">
                                    <div className="w-full">
                                      <p className="text-xs font-bold text-gray-600">
                                        {v.senderID.username} has sent you a{" "}
                                        {(v.notificationType as string)
                                          .split("-")
                                          .join(" ")}{" "}
                                      </p>
                                      <span className="text-xs font-bold text-red-600">
                                        {formatDistanceToNow(
                                          new Date(v.createdAt),
                                          {
                                            addSuffix: true,
                                          },
                                        )}
                                      </span>
                                    </div>
                                    {!v.read && (
                                      <CircleIcon
                                        height={10}
                                        width={10}
                                        color="blue"
                                        className="h-max w-max rounded-full bg-blue-600 fill-blue-600 p-0"
                                      />
                                    )}
                                  </div>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ))
                    ) : (
                      <div className="p-6 pt-2">
                        <p className="text-center text-base font-bold text-gray-600">
                          No notifications
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
        <ScrollArea className="mx-2 mt-6 h-[70vh] rounded-lg bg-[#F5F5F5] px-2 max-md:mt-0">
          {<Outlet />}
        </ScrollArea>
      </main>
    </>
  );
}

function SwiperBookingNavigation({
  data,
  readGuestBookingRequestNotification,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: AxiosResponse<any, any> | undefined;
  readGuestBookingRequestNotification: (
    notificationID: string,
  ) => Promise<void>;
}) {
  return (
    <div className="flex w-full items-center justify-center gap-8 px-8 pb-0 pt-8 max-md:w-full max-md:p-4">
      <Swiper
        fadeEffect={{
          crossFade: true,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 0,
          },

          480: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <NavLink
            to={"/bookings/all"}
            className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600 max-md:p-2"
          >
            Requests
          </NavLink>
        </SwiperSlide>
        <SwiperSlide>
          <NavLink
            to={"/bookings/approved"}
            className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600 max-md:p-2"
          >
            Approved
          </NavLink>
        </SwiperSlide>
        <SwiperSlide>
          <NavLink
            to={"/bookings/pending"}
            className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600 max-md:p-2"
          >
            Pending
          </NavLink>
        </SwiperSlide>
        <SwiperSlide>
          <NavLink
            to={"/bookings/declined"}
            className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600 max-md:p-2"
          >
            Declined
          </NavLink>
        </SwiperSlide>
        <SwiperSlide>
          <NavLink
            to={"/bookings/cancelled"}
            className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600 max-md:p-2"
          >
            Cancelled
          </NavLink>
        </SwiperSlide>
        <SwiperSlide>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative w-max">
                <Button
                  size={"sm"}
                  variant={"outline"}
                  className="rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </Button>
                {data?.data.guestNotifications.filter(
                  (v: { read: boolean; notificationType: string }) =>
                    v.read === false && v.notificationType !== "New-Message",
                ).length > 0 && (
                  <span className="absolute right-0 top-[-5px] h-4 w-4 rounded-full bg-[#FF385C] text-center text-xs font-bold text-white outline outline-1 outline-white">
                    {
                      data?.data.guestNotifications.filter(
                        (v: { read: boolean }) => !v.read,
                      ).length
                    }
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-0">
              <DropdownMenuLabel className="p-4 text-base font-bold">
                Booking Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-60">
                {data?.data.guestNotifications.filter(
                  (v: { notificationType: string }) =>
                    v.notificationType != "New-Message",
                ).length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  data?.data.guestNotifications.map((v: any) => (
                    <>
                      {v.notificationType === "Booking-Declined" ? (
                        <>
                          <DropdownMenuItem className="w-full p-0">
                            <Link
                              onClick={() =>
                                readGuestBookingRequestNotification(v._id)
                              }
                              key={v._id}
                              to={"/bookings/declined"}
                              className="w-full p-4 hover:bg-[#F5F5F5]"
                            >
                              <div className="flex w-full items-center gap-3">
                                <div className="w-full">
                                  <p className="text-xs font-bold text-gray-600">
                                    {v.senderID.username} has sent you a{" "}
                                    {(v.notificationType as string)
                                      .split("-")
                                      .join(" ")}{" "}
                                  </p>
                                  <span className="text-xs font-bold text-red-600">
                                    {formatDistanceToNow(
                                      new Date(v.createdAt),
                                      {
                                        addSuffix: true,
                                      },
                                    )}
                                  </span>
                                </div>
                                {!v.read && (
                                  <CircleIcon
                                    height={10}
                                    width={10}
                                    color="blue"
                                    className="h-max w-max rounded-full bg-blue-600 fill-blue-600 p-0"
                                  />
                                )}
                              </div>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      ) : v.notificationType === "Booking-Approved" ? (
                        <>
                          <DropdownMenuItem className="w-full p-0">
                            <Link
                              onClick={() =>
                                readGuestBookingRequestNotification(v._id)
                              }
                              key={v._id}
                              to={`/reservation-details/${v.data?.reservationID}`}
                              className="w-full p-4 hover:bg-[#F5F5F5]"
                            >
                              <div className="flex w-full items-center gap-3">
                                <div className="w-full">
                                  <p className="text-xs font-bold text-gray-600">
                                    {v.senderID.username} has sent you a{" "}
                                    {(v.notificationType as string)
                                      .split("-")
                                      .join(" ")}{" "}
                                  </p>
                                  <span className="text-xs font-bold text-red-600">
                                    {formatDistanceToNow(
                                      new Date(v.createdAt),
                                      {
                                        addSuffix: true,
                                      },
                                    )}
                                  </span>
                                </div>
                                {!v.read && (
                                  <CircleIcon
                                    height={10}
                                    width={10}
                                    color="blue"
                                    className="h-max w-max rounded-full bg-blue-600 fill-blue-600 p-0"
                                  />
                                )}
                              </div>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ))
                ) : (
                  <div className="p-6 pt-2">
                    <p className="text-center text-base font-bold text-gray-600">
                      No notifications
                    </p>
                  </div>
                )}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default BookingsLayout;
