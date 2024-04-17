import { useEffect } from "react";
import { formatValue } from "react-currency-input-field";
import { DonutChart, List, ListItem } from "@tremor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useGetEarnings from "@/hooks/useGetEarnings";
import { Skeleton } from "@/components/ui/skeleton";
import ViewPaymentTransactions from "@/partials/components/ViewPaymentTransactions";

type TTotalEarnings = {
  bookingStartsAt: string;
  bookingEndsAt: string;
  paymentAmount: number;
  listingID: {
    serviceTitle: string;
  };
  _id: string;
};

function HostEarnings() {
  const { data, isPending } = useGetEarnings();

  useEffect(() => {
    document.title = "Earnings - IGotYou";
  }, []);

  return (
    <div className="p-12 max-md:p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-medium">Earnings</h1>
          <div className="mt-4">
            <h2 className="text-5xl font-medium">You've made</h2>
            <p className="text-5xl font-medium">
              <span className="text-gray-600">
                {isPending ? (
                  <Skeleton className="inline-block h-12 w-44" />
                ) : (
                  formatValue({
                    value: String(
                      data?.data.currentMonthEarnings[0].totalRevenue,
                    ),
                    intlConfig: {
                      locale: "ph",
                      currency: "php",
                    },
                    decimalScale: 2,
                  })
                )}
              </span>{" "}
              this month
            </p>
          </div>
        </div>
        <ViewPaymentTransactions />
      </div>

      <Card className="mx-auto mt-16 max-w-5xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Total earnings</CardTitle>
          <DonutChart
            showAnimation
            className="mt-8 text-lg font-medium capitalize"
            customTooltip={(props) => {
              const { payload, active } = props;
              if (!active || !payload) return null;
              const categoryPayload = payload?.[0];
              if (!categoryPayload) return null;

              return (
                <div className="rounded-md border bg-white p-2 shadow">
                  <div className="flex gap-8">
                    <div className="flex flex-1 space-x-2.5">
                      <span
                        className={`bg-${categoryPayload.color}-600 w-[6px] rounded-full`}
                      ></span>
                      <p className="text-sm font-medium text-gray-600">
                        {categoryPayload.name}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-green-600">
                      {formatValue({
                        value: String(categoryPayload.value),
                        intlConfig: {
                          locale: "ph",
                          currency: "php",
                        },
                        decimalScale: 2,
                      })}
                    </p>
                  </div>
                </div>
              );
            }}
            data={data?.data.totalEarnings}
            index="listingID.serviceTitle"
            category="earnings"
            valueFormatter={(value) =>
              formatValue({
                value: String(value),
                intlConfig: {
                  locale: "ph",
                  currency: "php",
                },
                decimalScale: 2,
              })
            }
          />
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <Badge className="text-sm font-medium">Service Title</Badge>
            <Badge className="text-sm font-medium">Booked Dates</Badge>
          </div>
          <List className="mt-2 divide-y">
            {data?.data.totalEarnings.map((v: TTotalEarnings) => (
              <ListItem key={v._id} className="space-x-6">
                <div className="w-2/4">
                  <p className="truncate text-sm font-medium capitalize text-gray-600">
                    {v.listingID.serviceTitle}
                  </p>
                </div>

                <Badge variant={"secondary"} className="font-medium capitalize">
                  {new Date(v.bookingStartsAt).toDateString()} -{" "}
                  {new Date(v.bookingEndsAt).toDateString()}
                </Badge>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default HostEarnings;
