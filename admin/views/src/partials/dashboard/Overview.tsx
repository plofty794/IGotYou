import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "./DatePicker";
import { formatValue } from "react-currency-input-field";
import useGetAdminOverview from "@/hooks/useGetAdminOverview";
import { Bar, XAxis, YAxis, BarChart } from "recharts";
import { ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Overview() {
  const { data, isPending } = useGetAdminOverview();

  const totalUsers = useMemo(() => {
    const guests = data?.data.allUsers.filter(
      (user: { userStatus: string }) => user.userStatus === "guest"
    );
    const hosts = data?.data.allUsers.filter(
      (user: { userStatus: string }) => user.userStatus === "host"
    );
    return [
      {
        totalUsers: guests?.length + hosts?.length,
        name: "Users",
      },
      {
        totalGuests: guests?.length,
        name: "Guests",
      },
      {
        totalHosts: hosts?.length,
        name: "Hosts",
      },
    ];
  }, [data?.data.allUsers]);

  return (
    <>
      {isPending ? (
        "Loading..."
      ) : (
        <section className="py-4 px-8 w-full">
          <div className="w-full flex items-center justify-between">
            <h1 className="font-bold text-3xl">Dashboard</h1>
            <DatePicker />
          </div>
          <div className="my-4 w-full grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Total Revenue</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatValue({
                    value: String(
                      data?.data.subscribedUsers.map((users: []) => users)
                        .length * 50
                    ),
                    intlConfig: {
                      locale: "ph",
                      currency: "php",
                    },
                  })}{" "}
                  <span className="text-sm font-bold">
                    as of {new Date().toDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Subscriptions</CardTitle>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.data.subscribedUsers.map((users: []) => users).length}{" "}
                  <span className="text-sm font-bold">
                    subscribed users as of {new Date().toDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>All Users</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.data.allUsers.map((users: []) => users).length}{" "}
                  <span className="text-sm font-bold">
                    users as of {new Date().toDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4">
            <Card className="w-3/5">
              <CardHeader>
                <CardTitle className="font-bold text-xl">Users</CardTitle>
              </CardHeader>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={totalUsers}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    fontWeight={700}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    fontWeight={700}
                    axisLine={false}
                  />
                  <Bar
                    dataKey="totalUsers"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                  <Bar
                    dataKey="totalGuests"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                  <Bar
                    dataKey="totalHosts"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="w-2/5">
              <CardHeader>
                <CardTitle className="font-bold text-xl">
                  Recent subscriptions
                </CardTitle>
              </CardHeader>
              <div className="flex flex-col gap-2">
                {data?.data.subscribedUsers.length > 0 ? (
                  data?.data.subscribedUsers.map((user: { user: TUser }) => (
                    <CardContent className="w-full flex justify-between items-center">
                      <div className="flex items-center justify-center gap-4">
                        <Avatar>
                          <AvatarImage src={user.user.photoUrl} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-bold">
                            {user.user.username}
                          </p>
                          <p className="text-sm font-semibold text-gray-600">
                            {user.user.email}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-lg">
                        {formatValue({
                          value: "50",
                          intlConfig: {
                            locale: "ph",
                            currency: "php",
                          },
                        })}
                      </p>
                    </CardContent>
                  ))
                ) : (
                  <p className="mt-10 text-center text-base font-bold text-gray-600">
                    No users to show
                  </p>
                )}
              </div>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}

type TUser = {
  username: string;
  email: string;
  photoUrl: string;
  subscriptionExpiresAt: string;
};
export default Overview;
