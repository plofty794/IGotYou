import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChangeAvailability from "@/hooks/useChangeAvailability";
import useGetBlockedDates from "@/hooks/useGetBlockedDates";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

function HostCalendar() {
  const { data, isPending } = useGetBlockedDates();
  const { mutate } = useChangeAvailability();
  const [dates, setDates] = useState<Date[] | undefined>();
  const laptop = useMediaQuery("(max-width: 1024px)");
  const tablet = useMediaQuery("(max-width: 768px)");
  const cellphone = useMediaQuery("(max-width: 640px)");
  const cellphone2 = useMediaQuery("(max-width: 480px)");

  useEffect(() => {
    document.title = "Host Calendar - IGotYou";
  }, []);

  const blockedDates: Date[] = useMemo(() => {
    return data?.data.blockedDates.map((date: string) => new Date(date));
  }, [data?.data.blockedDates]);

  const sortedDates = useMemo(() => {
    const _sortedDates = dates?.sort((a, b) => a.getTime() - b.getTime());
    return (
      _sortedDates?.map((date) => new Date(date.setHours(0, 0, 0, 0))) ?? []
    );
  }, [dates]);

  return (
    <div className="max flex w-full justify-center gap-2 p-4 max-lg:flex-col max-lg:items-center">
      <ScrollArea className="h-screen max-lg:h-max">
        {isPending ? (
          "Loading"
        ) : (
          <>
            {cellphone2 ? (
              <Calendar
                className="flex w-full max-lg:items-center max-lg:justify-center"
                initialFocus
                fromDate={new Date()}
                selected={dates}
                onSelect={setDates}
                styles={{
                  nav_button_next: {
                    width: "20px",
                    height: "20px",
                    outline: "2px solid black",
                  },
                  nav_button_previous: {
                    width: "20px",
                    height: "20px",
                    outline: "2px solid black",
                  },
                  head_cell: {
                    width: "100%",
                    fontSize: "0.8rem",
                    color: "black",
                  },
                  day: {
                    margin: "1px",
                    fontWeight: "bold",
                    width: "40px",
                    height: "40px",
                  },
                  table: {
                    marginTop: "15px",
                  },
                }}
                modifiers={{
                  blockedDates,
                  subscriptionExpiresAt: new Date(
                    data?.data.subscriptionExpiresAt
                      .subscriptionExpiresAt as Date,
                  ),
                }}
                modifiersStyles={{
                  selected: {
                    color: "white",
                    backgroundColor: "#222222",
                  },
                  blockedDates: {
                    textDecoration: "line-through",
                    fontWeight: "bold",
                    color: "red",
                  },
                  today: {
                    outline: "2px solid black",
                  },
                  subscriptionExpiresAt: {
                    outline: "2px dashed #FF385C",
                  },
                }}
                disabled={{
                  before: new Date(),
                  after: new Date(
                    data?.data.subscriptionExpiresAt
                      .subscriptionExpiresAt as Date,
                  ),
                }}
                mode="multiple"
              />
            ) : cellphone ? (
              <Calendar
                className="flex w-full max-lg:items-center max-lg:justify-center"
                initialFocus
                fromDate={new Date()}
                selected={dates}
                onSelect={setDates}
                styles={{
                  nav_button_next: {
                    width: "30px",
                    height: "30px",
                    outline: "2px solid black",
                  },
                  nav_button_previous: {
                    width: "30px",
                    height: "30px",
                    outline: "2px solid black",
                  },
                  head_cell: {
                    width: "100%",
                    fontSize: "0.8rem",
                    color: "black",
                  },
                  day: {
                    margin: "1px",
                    fontWeight: "bold",
                    width: "60px",
                    height: "60px",
                  },
                  table: {
                    marginTop: "15px",
                  },
                }}
                modifiers={{
                  blockedDates,
                  subscriptionExpiresAt: new Date(
                    data?.data.subscriptionExpiresAt
                      .subscriptionExpiresAt as Date,
                  ),
                }}
                modifiersStyles={{
                  selected: {
                    color: "white",
                    backgroundColor: "#222222",
                  },
                  blockedDates: {
                    textDecoration: "line-through",
                    fontWeight: "bold",
                    color: "red",
                  },
                  today: {
                    outline: "2px solid black",
                  },
                  subscriptionExpiresAt: {
                    outline: "2px dashed #FF385C",
                  },
                }}
                disabled={{
                  before: new Date(),
                  after: new Date(
                    data?.data.subscriptionExpiresAt
                      .subscriptionExpiresAt as Date,
                  ),
                }}
                mode="multiple"
              />
            ) : tablet ? (
              <Calendar
                className="flex w-full max-lg:items-center max-lg:justify-center"
                initialFocus
                fromDate={new Date()}
                selected={dates}
                onSelect={setDates}
                styles={{
                  nav_button_next: {
                    width: "30px",
                    height: "30px",
                    outline: "2px solid black",
                  },
                  nav_button_previous: {
                    width: "35px",
                    height: "35px",
                    outline: "2px solid black",
                  },
                  head_cell: {
                    width: "100%",
                    fontSize: "0.8rem",
                    color: "black",
                  },
                  day: {
                    margin: "1px",
                    fontWeight: "bold",
                    width: "80px",
                    height: "80px",
                  },
                  table: {
                    marginTop: "20px",
                  },
                }}
                modifiers={{
                  blockedDates,
                  subscriptionExpiresAt: new Date(
                    data?.data.subscriptionExpiresAt
                      .subscriptionExpiresAt as Date,
                  ),
                }}
                modifiersStyles={{
                  selected: {
                    color: "white",
                    backgroundColor: "#222222",
                  },
                  blockedDates: {
                    textDecoration: "line-through",
                    fontWeight: "bold",
                    color: "red",
                  },
                  today: {
                    outline: "2px solid black",
                  },
                  subscriptionExpiresAt: {
                    outline: "2px dashed #FF385C",
                  },
                }}
                disabled={{
                  before: new Date(),
                  after: new Date(
                    data?.data.subscriptionExpiresAt
                      .subscriptionExpiresAt as Date,
                  ),
                }}
                mode="multiple"
              />
            ) : laptop ? (
              <Calendar
                className="flex w-full max-lg:items-center max-lg:justify-center"
                initialFocus
                fromDate={new Date()}
                selected={dates}
                onSelect={setDates}
                styles={{
                  nav_button_next: {
                    width: "30px",
                    height: "30px",
                    outline: "2px solid black",
                  },
                  nav_button_previous: {
                    width: "20px",
                    height: "20px",
                    outline: "2px solid black",
                  },
                  head_cell: {
                    width: "100%",
                    fontSize: "0.8rem",
                    color: "black",
                  },
                  day: {
                    margin: "1px",
                    fontWeight: "bold",
                    width: "100px",
                    height: "100px",
                  },
                  table: {
                    marginTop: "30px",
                  },
                }}
                modifiers={{
                  blockedDates,
                  subscriptionExpiresAt: new Date(
                    data?.data.subscriptionExpiresAt
                      .subscriptionExpiresAt as Date,
                  ),
                }}
                modifiersStyles={{
                  selected: {
                    color: "white",
                    backgroundColor: "#222222",
                  },
                  blockedDates: {
                    textDecoration: "line-through",
                    fontWeight: "bold",
                    color: "red",
                  },
                  today: {
                    outline: "2px solid black",
                  },
                  subscriptionExpiresAt: {
                    outline: "2px dashed #FF385C",
                  },
                }}
                disabled={{
                  before: new Date(),
                  after: new Date(
                    data?.data.subscriptionExpiresAt
                      .subscriptionExpiresAt as Date,
                  ),
                }}
                mode="multiple"
              />
            ) : (
              <Calendar
                initialFocus
                fromDate={new Date()}
                selected={dates}
                onSelect={setDates}
                styles={{
                  nav_button_next: {
                    width: "40px",
                    height: "40px",
                    outline: "2px solid black",
                  },
                  nav_button_previous: {
                    width: "40px",
                    height: "40px",
                    outline: "2px solid black",
                  },
                  head_cell: {
                    width: "100%",
                    fontSize: "1.1rem",
                    color: "black",
                  },
                  day: {
                    margin: "1px",
                    fontWeight: "bold",
                    width: "120px",
                    height: "120px",

                    minHeight: "20px",
                    minWidth: "20px",
                  },
                  table: {
                    marginTop: "40px",
                  },
                }}
                modifiers={{
                  blockedDates,
                  subscriptionExpiresAt: new Date(
                    data?.data.subscriptionExpiresAt
                      .subscriptionExpiresAt as Date,
                  ),
                }}
                modifiersStyles={{
                  selected: {
                    color: "white",
                    backgroundColor: "#222222",
                  },
                  blockedDates: {
                    textDecoration: "line-through",
                    fontWeight: "bold",
                    color: "red",
                  },
                  today: {
                    outline: "2px solid black",
                  },
                  subscriptionExpiresAt: {
                    outline: "2px dashed #FF385C",
                  },
                }}
                disabled={{
                  before: new Date(),
                  after: new Date(
                    data?.data.subscriptionExpiresAt
                      .subscriptionExpiresAt as Date,
                  ),
                }}
                mode="multiple"
              />
            )}
          </>
        )}
      </ScrollArea>
      <div className="w-2/4 rounded-lg border max-lg:w-full">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Your calendar</h1>
          <div className="py-4">
            {!sortedDates.length ? (
              <p className="text-lg font-medium">
                Pick a date to change its availability
              </p>
            ) : sortedDates.length === 1 ? (
              <Badge variant={"secondary"} className="text-lg font-medium">
                {format(sortedDates[0], "MMM d")}
              </Badge>
            ) : (
              <Badge variant={"secondary"} className="text-lg font-medium">
                {format(sortedDates[0], "MMM d")} -{" "}
                {format(sortedDates[sortedDates.length - 1], "MMM d")}
              </Badge>
            )}
          </div>
        </div>
        <Card className="border-none">
          <CardHeader className="max-lg:p-4">
            <CardTitle className="text-2xl font-semibold">
              Manage your availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Button
                  disabled={!sortedDates.length}
                  onClick={() => mutate({ sortedDates })}
                  className="bg-gray-950 p-6 text-lg"
                >
                  Change availability
                </Button>

                <Button
                  disabled={!sortedDates.length}
                  onClick={() => {
                    setDates([]);
                  }}
                  className="p-6 text-lg"
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HostCalendar;
