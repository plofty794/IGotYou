import useGetReports from "@/hooks/useGetReports";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ComposedChart, Line, Bar } from "recharts";
import { BarChart, Legend } from "recharts";
import { Separator } from "@/components/ui/separator";
import { formatValue } from "react-currency-input-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Reports() {
  const { isPending, data } = useGetReports();
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "IGotYou © 2024",
    removeAfterPrint: true,
  });

  console.log(data?.data);

  return (
    <>
      {isPending ? (
        "Loading..."
      ) : (
        <>
          <div className="w-max ml-auto">
            <Button
              className="mb-2"
              variant={"outline"}
              onClick={() => {
                handlePrint(null, () => contentToPrint.current);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                />
              </svg>
            </Button>
          </div>
          <div ref={contentToPrint}>
            <div className="w-full grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Scheduled Reservations</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.data.reservationStatusOvertime[0].scheduled}{" "}
                    <span className="text-sm font-bold">
                      scheduled reservations
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Ongoing Reservations</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.data.reservationStatusOvertime[0].ongoing}{" "}
                    <span className="text-sm font-bold">
                      ongoing reservations
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Completed Reservations</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.data.reservationStatusOvertime[0].completed}{" "}
                    <span className="text-sm font-bold">
                      completed reservations
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Cancelled Reservations</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.data.reservationStatusOvertime[0].cancelled}{" "}
                    <span className="text-sm font-bold">
                      cancelled reservations
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4 flex gap-4">
              <Card className="w-2/4">
                <CardHeader>
                  <CardTitle className="font-bold text-xl">
                    Reservations Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-96 p-4 pt-0">
                  <ResponsiveContainer>
                    <AreaChart data={data?.data.reservationsRevenue}>
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorPv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="_id" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="totalRevenue"
                        stroke="#00593F"
                        fillOpacity={1}
                        fill="url(#colorPv)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="w-2/4">
                <CardHeader>
                  <CardTitle className="capitalize font-bold text-xl">
                    Reservations per month
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-96 p-4 pt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data?.data.reservationsPerDay}>
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="_id" scale="band" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" barSize={30} fill="#413ea0" />
                      <Line type="monotone" dataKey="count" stroke="#ff7300" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-4 w-full">
              <CardHeader>
                <CardTitle className="font-bold text-xl capitalize">
                  Selected Payment Type Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data?.data.reservationPaymentAndVerificationStatus}
                  >
                    <XAxis dataKey={"count"} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="partialPayments" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="fullPayments" stackId="b" fill="#FFC658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="mt-10 p-8">
              <div className="w-full flex flex-col gap-6">
                <div className="flex gap-4">
                  <Card className="w-2/4">
                    <CardHeader className="flex-row items-center justify-between">
                      <CardTitle>Total Ratings</CardTitle>
                      <p className="font-semibold text-2xl">
                        {formatValue({
                          value: String(
                            (data?.data.avgRatings[0].totalGuestRatings ?? 0) +
                              (data?.data.avgRatings[0].totalHostRatings ?? 0)
                          ),
                        })}
                      </p>
                    </CardHeader>
                    <Separator />
                    <CardHeader className="flex-row items-center justify-between">
                      <CardTitle>Average Ratings</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                        />
                      </svg>
                    </CardHeader>
                    <CardContent className="mt-2 flex flex-col gap-6">
                      <div className="flex flex-col gap-4">
                        <CardTitle>For Hosts</CardTitle>
                        <div className="flex items-center justify-center">
                          <p className="text-4xl font-bold">
                            {data?.data.avgRatings[0].avgHostRating}
                          </p>
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
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <CardTitle>For Guests</CardTitle>
                        <div className="flex items-center justify-center">
                          <p className="text-4xl font-bold">
                            {data?.data.avgRatings[0].avgGuestRating.toFixed(2)}
                          </p>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-full">
                    <CardHeader className="flex-row items-center justify-between pb-8">
                      <CardTitle>Rating Distributions</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                        />
                      </svg>
                    </CardHeader>
                    <Separator />
                    <div className="flex items-center justify-between px-14 py-4">
                      <h1 className="text-lg font-semibold">Guest</h1>
                      <h1 className="text-lg font-semibold">Host</h1>
                    </div>
                    <CardContent className="h-52 flex p-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data.guestRatingDistribution}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="_id" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="count"
                            fill="#82ca9d"
                            activeBar={
                              <Rectangle fill="gold" stroke="purple" />
                            }
                          />
                        </BarChart>
                      </ResponsiveContainer>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data.hostRatingDistribution}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="_id" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="count"
                            fill="#82ca9d"
                            activeBar={
                              <Rectangle fill="gold" stroke="purple" />
                            }
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex gap-8">
                  <Card className="w-full">
                    <CardHeader className="flex-row items-center justify-between">
                      <CardTitle>Top rated Guests</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                        />
                      </svg>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="flex flex-col gap-2">
                        {data?.data.topRatedGuests &&
                        data.data.topRatedGuests.length > 0 ? (
                          data?.data.topRatedGuests.map((v) => (
                            <CardContent className="w-full flex justify-between items-center">
                              <div className="flex items-center justify-center gap-4">
                                <Avatar>
                                  <AvatarImage src={v.guestID.photoUrl} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <p className="text-sm font-bold">
                                    {v.guestID.username}
                                  </p>
                                  <p className="text-sm font-semibold text-gray-600">
                                    {v.guestID.email}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-center gap-1">
                                <p className="font-bold text-lg">
                                  {v.averageRating.toFixed(2)}
                                </p>
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
                              </div>
                            </CardContent>
                          ))
                        ) : (
                          <p className="mt-10 text-center text-base font-bold text-gray-600">
                            No users to show
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-full">
                    <CardHeader className="flex-row items-center justify-between">
                      <CardTitle>Top Rated Hosts</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                        />
                      </svg>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="flex flex-col gap-2">
                        {data?.data.topRatedHosts &&
                        data.data.topRatedHosts.length > 0 ? (
                          data?.data.topRatedHosts.map((v) => (
                            <CardContent className="w-full flex justify-between items-center">
                              <div className="flex items-center justify-center gap-4">
                                <Avatar>
                                  <AvatarImage src={v.hostID.photoUrl} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <p className="text-sm font-bold">
                                    {v.hostID.username}
                                  </p>
                                  <p className="text-sm font-semibold text-gray-600">
                                    {v.hostID.email}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-center gap-1">
                                <p className="font-bold text-lg">
                                  {v.averageRating.toFixed(2)}
                                </p>
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
                              </div>
                            </CardContent>
                          ))
                        ) : (
                          <p className="mt-10 text-center text-base font-bold text-gray-600">
                            No users to show
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export default Reports;
