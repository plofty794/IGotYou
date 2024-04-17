/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetAnalytics from "@/hooks/useGetAnalytics";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { ComposedChart, Line, Bar } from "recharts";
import { BarChart, Legend } from "recharts";

function Analytics() {
  const { isPending, data } = useGetAnalytics();
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "IGotYou © 2024",
    removeAfterPrint: true,
  });

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
                  <CardTitle>Verified Emails</CardTitle>
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
                      d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.data.percentageOfVerifiedEmailsIdentityMobile[0].verifiedEmailPercentage.toFixed(
                      2
                    ) + "%"}{" "}
                    <span className="text-sm font-bold">
                      of users has verified emails
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Verified Identities</CardTitle>
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
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                    />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.data.percentageOfVerifiedEmailsIdentityMobile[0].verifiedIdentityPercentage.toFixed(
                      2
                    ) + "%"}{" "}
                    <span className="text-sm font-bold">
                      of users has verified identities
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Verified Mobile phones</CardTitle>
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
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.data.percentageOfVerifiedEmailsIdentityMobile[0].verifiedMobilePercentage.toFixed(
                      2
                    ) + "%"}{" "}
                    <span className="text-sm font-bold">
                      of users has verified mobile phones
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Disabled Users</CardTitle>
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
                      d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      data?.data.percentageOfVerifiedEmailsIdentityMobile[0]
                        .disabledUsers
                    }{" "}
                    <span className="text-sm font-bold">users disabled</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4 flex gap-4">
              <Card className="w-2/4">
                <CardHeader>
                  <CardTitle className="font-bold text-xl">
                    Registration Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-96 p-4 pt-0">
                  <ResponsiveContainer>
                    <AreaChart
                      height={400}
                      data={data?.data.userRegistrationStats}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="_id" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="w-2/4">
                <CardHeader>
                  <CardTitle className="capitalize font-bold text-xl">
                    Booking requests per month
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-96 p-4 pt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      height={400}
                      data={data?.data.bookingRequestsPerDay}
                    >
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="_id" scale="band" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" barSize={40} fill="#413ea0" />
                      <Line type="monotone" dataKey="count" stroke="#ff7300" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-4 w-full">
              <CardHeader>
                <CardTitle className="font-bold text-xl capitalize">
                  Booking requests success rate
                </CardTitle>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={data?.data.bookingRequestsPercentageStatus}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" stackId="a" fill="#8884d8" />
                    <Bar dataKey="percentage" stackId="a" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="mt-4 w-full">
              <CardHeader>
                <CardTitle className="font-bold text-xl capitalize">
                  Booking requests per Service type
                </CardTitle>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <FunnelChart>
                    <Tooltip />
                    <Funnel
                      width={730}
                      fill="#83A6ED"
                      dataKey="count"
                      data={
                        data?.data.bookingRequestsByServiceType as
                          | any[]
                          | undefined
                      }
                      isAnimationActive
                    >
                      <LabelList
                        position="right"
                        fill="#000"
                        stroke="none"
                        dataKey="name"
                      />
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export default Analytics;
