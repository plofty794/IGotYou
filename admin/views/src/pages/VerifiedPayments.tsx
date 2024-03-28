import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useGetVerifiedPayments from "@/hooks/useGetVerifiedPayments";
import AdminDropdownMenu from "@/partials/AdminDropdownMenu";
import { ring } from "ldrs";
import Lottie from "lottie-react";
import noPendingPayment from "../assets/no-pending-payments.json";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { axiosPrivateRoute } from "@/api/axiosRoute";
ring.register();

function VerifiedPayments() {
  const { data, isPending } = useGetVerifiedPayments();
  const [verifiedPayments, setVerifiedPayments] = useState<[]>();
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.title = "Verified Payments - Admin";
  }, []);

  useEffect(() => {
    data?.pages.map((page) => setVerifiedPayments(page.data.verifiedPayments));
  }, [data?.pages]);

  useMemo(() => {
    if (username == null) return;
    (async () => {
      const { data } = await axiosPrivateRoute.get(
        `/api/subscriptions/verified/search/${username}`
      );
      setTimeout(() => {
        setVerifiedPayments(data.verifiedPayments);
      }, 500);
    })();
  }, [username]);

  return (
    <main className="min-h-screen">
      <nav className="py-4 px-8 flex justify-between items-center border-b">
        <Link to={"/subscriptions"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="gray"
            className="w-5 h-5 hover:stroke-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </Link>
        <AdminDropdownMenu />
      </nav>
      <>
        <section className="py-4 px-8">
          <div className="w-full flex justify-between">
            <h1 className="font-bold text-3xl">Verified Payments</h1>
            <div className="w-64 flex items-center gap-2 relative">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full font-medium p-4 pr-8"
                placeholder="Search by username..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute right-2 z-10 bg-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>

          {verifiedPayments?.length ? (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {isPending
                ? "Loading..."
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  verifiedPayments?.map((v: any) => (
                    <>
                      {v.paymentStatus === "success" && (
                        <Card key={v._id}>
                          <CardHeader className="p-0">
                            <Dialog>
                              <DialogTrigger className="overflow-hidden rounded-md ">
                                <img
                                  className="h-72 w-full object-cover hover:scale-105 transition-transform"
                                  src={v.paymentProofPhoto}
                                  alt=""
                                  loading="lazy"
                                />
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl w-max p-0">
                                <img
                                  className=" object-cover rounded-md"
                                  src={v.paymentProofPhoto}
                                  alt=""
                                  loading="lazy"
                                />
                              </DialogContent>
                            </Dialog>
                            <Badge className="w-max mx-auto text-xs font-bold bg-gray-950">
                              Verified
                            </Badge>
                          </CardHeader>
                          <CardContent className="px-4 mt-2">
                            <CardDescription className="text-gray-600 font-medium text-sm w-max ">
                              {v.user.username}
                            </CardDescription>
                            <CardDescription className="text-gray-600 font-medium text-sm w-max">
                              {v.user.email}
                            </CardDescription>
                            <CardDescription className="text-gray-600 font-medium text-sm w-max">
                              Sent at: {new Date(v.createdAt).toLocaleString()}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col gap-2 justify-center items-center">
              <Lottie
                loop={false}
                animationData={noPendingPayment}
                className="w-56 h-56"
              />
              <span className="text-gray-600 font-semibold text-lg">
                No pending payments.
              </span>
            </div>
          )}
        </section>
      </>
    </main>
  );
}

export default VerifiedPayments;
