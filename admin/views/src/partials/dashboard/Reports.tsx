import useGetReports from "@/hooks/useGetReports";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ComposedChart, Line, Bar } from "recharts";
import { BarChart, Legend } from "recharts";

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
          </div>
        </>
      )}
    </>
  );
}

export default Reports;
