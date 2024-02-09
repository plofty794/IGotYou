import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "./DatePicker";
import { formatValue } from "react-currency-input-field";
import useGetAdminOverview from "@/hooks/useGetAdminOverview";
import { AreaChart, Area } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DATA = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Overview() {
  const { data } = useGetAdminOverview();

  console.log(data?.data.allUsers);

  return (
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
                  data?.data.subscribedUsers.map((users: []) => users).length *
                    50
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
          <AreaChart width={500} height={400} data={data?.data.subscribedUsers}>
            <Area
              type="monotone"
              stroke="#7c3aed"
              fill="red"
              dataKey={"userStatus"}
            />
          </AreaChart>
        </Card>
        <Card className="w-2/5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data?.data.allUsers}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="userStatus" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="username"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="email" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </section>
  );
}

export default Overview;
