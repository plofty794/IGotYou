import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetPaymentTransactions from "@/hooks/useGetPaymentTransactions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatValue } from "react-currency-input-field";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

function ViewPaymentTransactions() {
  const { data, fetchNextPage, isFetchingNextPage, error } =
    useGetPaymentTransactions();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-0 font-bold" size={"sm"} variant={"link"}>
          View payment transactions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0">
        <DialogHeader className="flex-row items-center justify-between p-6 pb-0 pr-10">
          <DialogTitle>Service Payment Transactions</DialogTitle>
          <Button
            disabled={isFetchingNextPage || error != null}
            onClick={() => fetchNextPage()}
            className={`font-bold !mt-0 ${
              isFetchingNextPage ? "animate-spin" : ""
            }`}
            variant={"ghost"}
            size={"sm"}
          >
            {isFetchingNextPage ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : error ? (
              "Nothing more to load"
            ) : (
              "Load more"
            )}
          </Button>
        </DialogHeader>
        <Separator />
        <ScrollArea className="h-72">
          <Card className="p-4 pt-2 mx-8 mb-10">
            <Table>
              <TableCaption>
                A list of the recent service payments.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-0">Payment To</TableHead>
                  <TableHead className="p-0">Received From</TableHead>
                  <TableHead className="p-0">Payment Type</TableHead>
                  <TableHead className="p-0">Payment Status</TableHead>
                  <TableHead className="p-0">Service Status</TableHead>
                  <TableHead className="p-0">Amount</TableHead>
                  <TableHead className="p-0">Payment</TableHead>
                  <TableHead className="p-0 w-24"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.pages.flatMap((page) =>
                  page.data.reservationPaymentsTransactionLog.map((v) => (
                    <>
                      {v.paymentType === "partial-payment" ? (
                        <>
                          <TableRow>
                            <TableCell className="capitalize font-bold text-xs">
                              {v.listingID.serviceTitle}
                            </TableCell>
                            <TableCell className="capitalize font-bold text-xs">
                              {v.guestID.username}
                            </TableCell>
                            <TableCell className="capitalize font-bold text-xs">
                              {v.paymentType.split("-").join(" ")}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={"outline"}
                                className={`${
                                  v.partialPaymentVerificationStatus ===
                                  "success"
                                    ? "text-green-600"
                                    : v.partialPaymentVerificationStatus ===
                                      "pending"
                                    ? "text-amber-600"
                                    : "text-red-600"
                                }`}
                              >
                                {v.partialPaymentVerificationStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={"outline"}
                                className={`${
                                  v.status === "completed"
                                    ? "text-green-600"
                                    : v.status === "ongoing"
                                    ? "text-amber-600"
                                    : v.status === "scheduled"
                                    ? "text-blue-600"
                                    : "text-red-600"
                                }`}
                              >
                                {v.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <p className="text-xs font-semibold text-green-600">
                                {formatValue({
                                  value: String(v.partialPaymentAmount),
                                  intlConfig: {
                                    locale: "ph",
                                    currency: "php",
                                  },
                                  decimalScale: 2,
                                })}
                              </p>
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      className="p-0"
                                      size={"sm"}
                                      variant={"ghost"}
                                    >
                                      <Link
                                        target="_blank"
                                        to={
                                          v.partialPaymentProofPhoto.secure_url
                                        }
                                      >
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
                                            d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                          />
                                        </svg>
                                      </Link>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View payment</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              <p className="text-xs font-medium">
                                {format(new Date(v.partialPaymentDate), "PPpp")}
                              </p>
                            </TableCell>
                          </TableRow>
                          {v.fullPaymentAmount && (
                            <TableRow>
                              <TableCell className="capitalize font-bold text-xs">
                                {v.listingID.serviceTitle}
                              </TableCell>
                              <TableCell className="capitalize font-bold text-xs">
                                {v.guestID.username}
                              </TableCell>
                              <TableCell className="capitalize font-bold text-xs">
                                {v.paymentType.split("-").join(" ")}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={"outline"}
                                  className={`${
                                    v.fullPaymentVerificationStatus ===
                                    "success"
                                      ? "text-green-600"
                                      : v.fullPaymentVerificationStatus ===
                                        "pending"
                                      ? "text-amber-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {v.fullPaymentVerificationStatus}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={"outline"}
                                  className={`${
                                    v.status === "completed"
                                      ? "text-green-600"
                                      : v.status === "ongoing"
                                      ? "text-amber-600"
                                      : v.status === "scheduled"
                                      ? "text-blue-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {v.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <p className="text-xs font-semibold text-green-600">
                                  {formatValue({
                                    value: String(v.fullPaymentAmount),
                                    intlConfig: {
                                      locale: "ph",
                                      currency: "php",
                                    },
                                    decimalScale: 2,
                                  })}
                                </p>
                              </TableCell>
                              <TableCell>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        className="p-0"
                                        size={"sm"}
                                        variant={"ghost"}
                                      >
                                        <Link
                                          target="_blank"
                                          to={
                                            v.fullPaymentProofPhoto.secure_url
                                          }
                                        >
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
                                              d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                          </svg>
                                        </Link>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View payment</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                              <TableCell>
                                <p className="text-xs font-medium">
                                  {format(new Date(v.fullPaymentDate), "PPpp")}
                                </p>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ) : (
                        <TableRow>
                          <TableCell className="capitalize font-bold text-xs">
                            {v.listingID.serviceTitle}
                          </TableCell>

                          <TableCell className="capitalize font-bold text-xs">
                            {v.guestID.username}
                          </TableCell>

                          <TableCell className="capitalize font-bold text-xs">
                            {v.paymentType.split("-").join(" ")}
                          </TableCell>

                          <TableCell>
                            <Badge
                              variant={"outline"}
                              className={`${
                                v.fullPaymentVerificationStatus === "success"
                                  ? "text-green-600"
                                  : v.fullPaymentVerificationStatus ===
                                    "pending"
                                  ? "text-amber-600"
                                  : "text-red-600"
                              }`}
                            >
                              {v.fullPaymentVerificationStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={"outline"}
                              className={`${
                                v.status === "completed"
                                  ? "text-green-600"
                                  : v.status === "ongoing"
                                  ? "text-amber-600"
                                  : v.status === "scheduled"
                                  ? "text-blue-600"
                                  : "text-red-600"
                              }`}
                            >
                              {v.status}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <p className="text-xs font-semibold text-green-600">
                              {formatValue({
                                value: String(v.fullPaymentAmount),
                                intlConfig: {
                                  locale: "ph",
                                  currency: "php",
                                },
                                decimalScale: 2,
                              })}
                            </p>
                          </TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    className="p-0"
                                    size={"sm"}
                                    variant={"ghost"}
                                  >
                                    <Link
                                      target="_blank"
                                      to={v.fullPaymentProofPhoto.secure_url}
                                    >
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
                                          d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                      </svg>
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View payment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>
                            <p className="text-xs font-medium">
                              {format(new Date(v.fullPaymentDate), "PPpp")}
                            </p>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))
                )}
              </TableBody>
              <TableFooter className="bg-[#f5f5f5]">
                <TableRow>
                  <TableCell colSpan={8}>
                    <div className="h-5"></div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ViewPaymentTransactions;
