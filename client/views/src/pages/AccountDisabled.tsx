import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useGetReportedUser from "@/hooks/useGetReportedUser";
import { useState } from "react";
import { useDocumentTitle } from "usehooks-ts";

function AccountDisabled() {
  useDocumentTitle("Account Disabled - IGotYou");
  const { data } = useGetReportedUser();
  const [email, setEmail] = useState("");

  if (
    sessionStorage.getItem("disabledUser") == null &&
    sessionStorage.getItem("googleSignIn") == null
  ) {
    return (window.location.pathname = "/");
  }

  if (sessionStorage.getItem("googleSignIn")) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Dialog modal>
          <DialogTrigger asChild>
            <Button variant="destructive" className="font-semibold">
              Why your account is disabled? Click here.
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enter your email address</DialogTitle>
              <DialogDescription>
                To see why is your account disabled.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <Button
                onClick={() => {
                  sessionStorage.removeItem("googleSignIn");
                  sessionStorage.setItem("disabledUser", email);
                  window.location.reload();
                }}
                size={"sm"}
                className=" bg-gray-950"
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => {
            sessionStorage.clear();
            window.location.pathname = "/login";
          }}
          size={"sm"}
          variant={"link"}
        >
          Go back
        </Button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Your account has been disabled
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-sm font-semibold">
            We regret to inform you that your account has been disabled due to
            endless reports from your fellow users. Below are the reasons for
            the disablement and the number of reports received:
          </p>
          <ul className="list-decimal">
            <p className="text-sm font-semibold text-gray-600">
              Reasons for disablement:
            </p>
            <div className="ml-4">
              {data?.data.reportedUser.map(
                (v: { _id: string; reason: string }) => (
                  <li key={v._id} className="text-sm font-bold text-red-600">
                    {v.reason}
                  </li>
                ),
              )}
            </div>
          </ul>
          <p className="text-sm font-semibold text-gray-600">
            Number of Reports:{" "}
            <span className="font-bold text-red-600">
              {data?.data.reportedUser.length}
            </span>
          </p>
          <Badge className="mx-auto w-max">Photo evidence</Badge>
          <Carousel
            opts={{
              align: "start",
            }}
            className="mx-auto w-full max-w-sm"
          >
            <CarouselContent>
              {data?.data.reportedUser.map(
                (v: { _id: string; evidence: { secure_url: string } }) => (
                  <CarouselItem key={v._id} className="lg:basis-1/2">
                    <a
                      href={v.evidence.secure_url}
                      className="hover:cursor-zoom-in"
                      target="_blank"
                    >
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-2">
                          <img
                            src={v.evidence.secure_url}
                            className="h-full w-full object-cover"
                          />
                        </CardContent>
                      </Card>
                    </a>
                  </CarouselItem>
                ),
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
        <Separator />
        <CardFooter className="mt-4 pb-4">
          <Button
            onClick={() => {
              sessionStorage.clear();
              window.location.pathname = "/login";
            }}
            className="ml-auto rounded-full bg-gray-950"
          >
            Go back
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default AccountDisabled;
