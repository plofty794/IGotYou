import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/firebase config/config";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { TUser } from "./Home";
import { formatValue } from "react-currency-input-field";
import { formatDistance, subDays } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useUnSubscribeHosting from "@/hooks/useUnSubscribeHosting";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function Subscription() {
  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData<AxiosResponse<{ user: TUser }>>([
    "profile",
    auth.currentUser?.uid,
  ]);

  useEffect(() => {
    document.title = "Subscription Details - IGotYou";
  }, []);

  return (
    <div className="flex justify-center gap-4 p-12 max-lg:flex-col max-md:gap-2 max-md:p-8">
      <Card className="w-full shadow-lg">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">
            Subscription details
          </CardTitle>
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
              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
            />
          </svg>
        </CardHeader>
        <Card className="mx-5 mb-5">
          <div className="flex w-full items-center justify-between p-6 hover:bg-gray-100">
            <p className="text-sm font-bold text-gray-600">Status</p>
            <Badge
              className={`font-bold capitalize ${
                profileData?.data.user.subscriptionStatus === "active"
                  ? "bg-green-500 hover:bg-green-600"
                  : ""
              }`}
            >
              {profileData?.data.user.subscriptionStatus}
            </Badge>
          </div>
          <Separator />
          <div className="flex w-full items-center justify-between p-6 hover:bg-gray-100">
            <p className="text-sm font-bold text-gray-600">Terms</p>
            <Badge variant={"secondary"} className="font-bold capitalize">
              {formatValue({
                value: "50",
                intlConfig: {
                  locale: "ph",
                  currency: "php",
                },
              })}{" "}
              / monthly
            </Badge>
          </div>
          <Separator />
          <div className="flex w-full items-center justify-between p-6 hover:bg-gray-100">
            <p className="text-sm font-bold text-gray-600">Initial Amount</p>
            <Badge variant={"secondary"} className="font-bold capitalize">
              {formatValue({
                value: "50",
                intlConfig: {
                  locale: "ph",
                  currency: "php",
                },
              })}{" "}
            </Badge>
          </div>
          <Separator />
          <div className="flex w-full items-center justify-between p-6 hover:bg-gray-100">
            <p className="text-sm font-bold text-gray-600">Start date</p>
            <Badge variant={"secondary"} className="font-bold capitalize">
              {subDays(
                new Date(profileData!.data.user.subscriptionExpiresAt),
                30,
              ).toDateString()}
            </Badge>
          </div>
          <Separator />
          <div className="flex w-full items-center justify-between p-6 hover:bg-gray-100">
            <p className="text-sm font-bold text-gray-600">End date</p>
            <Badge variant={"secondary"} className="font-bold capitalize">
              {new Date(
                profileData!.data.user.subscriptionExpiresAt,
              ).toDateString()}
            </Badge>
          </div>
        </Card>
      </Card>
      <Card className="h-max w-2/4 max-lg:w-full">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold max-md:text-2xl">
            {formatDistance(
              new Date(profileData!.data.user.subscriptionExpiresAt),
              new Date().setHours(0, 0, 0, 0),
              {
                addSuffix: true,
              },
            )}{" "}
          </CardTitle>
          <span className="text-lg font-medium max-lg:text-sm">
            before subscription ends
          </span>
        </CardHeader>
        <CardFooter className="ml-auto w-max">
          <AlertDialogUnSubscribe />
        </CardFooter>
      </Card>
    </div>
  );
}

function AlertDialogUnSubscribe() {
  const { mutate } = useUnSubscribeHosting();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 rounded-full" variant={"destructive"}>
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
              d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          Unsubscribe
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            Are you sure you want to unsubscribe from becoming a host on
            IGotYou?
          </AlertDialogTitle>
          <AlertDialogDescription>
            By unsubscribing, you will lose access to hosting features and
            opportunities to showcase your skills to potential clients.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="rounded-full bg-red-600 hover:bg-red-500"
            onClick={() => mutate()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Subscription;
