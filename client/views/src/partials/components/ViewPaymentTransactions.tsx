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

function ViewPaymentTransactions() {
  const { data, fetchNextPage, isFetchingNextPage, error } =
    useGetPaymentTransactions();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"link"}>
          View payment transactions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0">
        <DialogHeader className="flex-row items-center justify-between p-6 pr-10">
          <DialogTitle>Service Payment Transactions</DialogTitle>
          <Button
            disabled={isFetchingNextPage || error != null}
            onClick={() => fetchNextPage()}
            className={`!mt-0 ${isFetchingNextPage ? "animate-spin" : ""}`}
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
          <div className="flex flex-col gap-4 p-6">
            {data?.pages.flatMap((page) =>
              page.data.reservationPaymentsTransactionLog.map((v) => (
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Button
                      variant={"outline"}
                      className="flex h-full items-center border shadow"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
                          clipRule="evenodd"
                        />
                        <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                      </svg>
                    </Button>
                    <div className="flex w-3/4 flex-col">
                      <p className="truncate text-sm font-semibold">
                        Received from {v.guestID.username}
                      </p>
                      <p className="text-xs font-medium">
                        {format(
                          new Date(v.fullPaymentDate ?? v.partialPaymentDate),
                          "PPpp",
                        )}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-xs font-semibold capitalize ${
                      v.paymentType.split("-").join(" ") === "full payment"
                        ? "text-blue-600"
                        : "text-amber-600"
                    }`}
                  >
                    {v.paymentType.split("-").join(" ")}
                  </p>
                  {v.fullPaymentVerificationStatus ? (
                    <p
                      className={`text-xs font-semibold capitalize ${
                        v.fullPaymentVerificationStatus === "success"
                          ? "text-green-600"
                          : v.fullPaymentVerificationStatus === "rejected"
                            ? "text-red-600"
                            : "text-amber-600"
                      }`}
                    >
                      {v.fullPaymentVerificationStatus}
                    </p>
                  ) : (
                    <p
                      className={`text-xs font-semibold capitalize ${
                        v.partialPaymentVerificationStatus === "success"
                          ? "text-green-600"
                          : v.partialPaymentVerificationStatus === "rejected"
                            ? "text-red-600"
                            : "text-amber-600"
                      }`}
                    >
                      {v.partialPaymentVerificationStatus}
                    </p>
                  )}

                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#16a34a"
                      className="h-5 w-5"
                    >
                      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                    </svg>
                    <p className="text-sm font-semibold text-green-600">
                      {formatValue({
                        value: String(
                          v.fullPaymentAmount ?? v.partialPaymentAmount,
                        ),
                        intlConfig: {
                          locale: "ph",
                          currency: "php",
                        },
                        decimalScale: 2,
                      })}
                    </p>
                  </div>
                </div>
              )),
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ViewPaymentTransactions;
