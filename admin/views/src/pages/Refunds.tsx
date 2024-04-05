import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import useGetRefunds from "@/hooks/useGetRefunds";
import RefundsTable from "@/partials/RefundsTable";
import { differenceInDays } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

type TUser = {
  email: string;
  username: string;
  userStatus: string;
  emailVerified: boolean;
  identityVerified: boolean;
  isDisabled: boolean;
  uid: string;
  reports: [];
};

type TRefunds = {
  createdAt: string;
  guestID: TUser;
  hostID: TUser;
  listingID: {
    cancellationPolicy: string;
    serviceTitle: string;
    price: string;
  };
  reservationID: {
    bookingEndsAt: string;
    bookingStartsAt: string;
    confirmServiceEnded: true;
    createdAt: string;
    guestID: string;
    hostCancellationReason: string;
    hostID: string;
    listingID: string;
    paymentAmount: number;
    paymentStatus: string;
    status: string;
    updatedAt: string;
    _id: string;
  };
  guestCancelReasons: string;
  status: string;
  _id: string;
};

const columns: ColumnDef<TRefunds>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <>
        <Badge
          className="text-red-600 font-bold capitalize"
          variant={"outline"}
        >
          {row.original?.status}
        </Badge>
      </>
    ),
  },
  {
    header: "Host",
    cell: ({ row }) => (
      <p className="font-bold text-xs capitalize">
        {row.original?.hostID.username}
      </p>
    ),
  },
  {
    header: "Guest",
    cell: ({ row }) => (
      <p className="font-bold text-xs capitalize">
        {row.original?.guestID.username}
      </p>
    ),
  },
  {
    header: "Service title",
    cell: ({ row }) => (
      <p className="font-bold text-xs capitalize">
        {row.original?.listingID.serviceTitle}
      </p>
    ),
  },
  {
    header: "Price",
    cell: ({ row }) => (
      <p className="font-bold text-xs capitalize text-green-600">
        {row.original?.listingID.price}
      </p>
    ),
  },
  {
    header: "Booking dates",
    cell: ({ row }) => (
      <p className="font-bold text-xs capitalize">
        {new Date(row.original?.reservationID.bookingStartsAt).toDateString()} -{" "}
        {new Date(row.original?.reservationID.bookingEndsAt).toDateString()}
      </p>
    ),
  },
  {
    header: "Cancellation policy",
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className={`capitalize font-bold ${
          row.original.listingID.cancellationPolicy === "Flexible"
            ? "text-green-600"
            : row.original.listingID.cancellationPolicy === "Moderate"
            ? "text-amber-600"
            : row.original.listingID.cancellationPolicy === "Non-refundable"
            ? "text-red-600"
            : "text-red-800"
        }`}
      >
        {row.original?.listingID.cancellationPolicy}
      </Badge>
    ),
  },
  {
    header: "Date of refund",
    cell: ({ row }) => (
      <p className="font-bold text-xs capitalize">
        {new Date(row.original?.createdAt).toDateString()}
      </p>
    ),
  },
  {
    header: "Refund amount",
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className="capitalize font-bold text-green-600"
      >
        {calculateRefund(
          row.original?.createdAt,
          row.original?.listingID.cancellationPolicy,
          row.original?.reservationID.paymentAmount
        )}
      </Badge>
    ),
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="center">
  //           <DropdownMenuItem
  //             className="p-0"
  //             onClick={() => copyToClipboard(row.original.reportedUser.email)}
  //           >
  //             <Button variant={"outline"} size={"sm"} className="gap-2">
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 strokeWidth={1.7}
  //                 stroke="currentColor"
  //                 className="w-4 h-4"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
  //                 />
  //               </svg>
  //               Copy email
  //             </Button>
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem className="p-0">
  //             {row.original.reportedUser.isDisabled ? (
  //               <EnableAccount userID={row.original.reportedUser.uid} />
  //             ) : (
  //               <DisableAccount userID={row.original.reportedUser.uid} />
  //             )}
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

function Refunds() {
  const { data, isPending, fetchNextPage } = useGetRefunds();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Refunds - Admin IGotYou";
  }, []);

  return (
    <section className="py-4 px-8">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <span className="font-bold text-3xl">Refunds</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() =>
                    queryClient.invalidateQueries({
                      queryKey: ["user-refunds"],
                    })
                  }
                  variant={"outline"}
                >
                  <ReloadIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reload</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {isPending ? (
          "Loading..."
        ) : (
          <RefundsTable
            columns={columns}
            data={
              data?.pages.flatMap(
                (page) => page.data.cancelledReservations
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ) as any[]
            }
            totalPages={data?.pages.flatMap((page) => page.data.totalPages)[0]}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </section>
  );
}

const calculateRefund = (
  cancellationDate: string,
  cancellationPolicy: string,
  bookingAmount: number
) => {
  let refundPercentage = 0;
  switch (cancellationPolicy) {
    case "Flexible":
      refundPercentage =
        differenceInDays(new Date(), new Date(cancellationDate)) >= 1 ? 100 : 0; // Full refund if cancelled 1 day prior
      break;
    case "Moderate":
      refundPercentage =
        differenceInDays(new Date(), new Date(cancellationDate)) >= 3 ? 100 : 0; // Full refund if cancelled at least 3 days prior
      break;
    case "Strict":
      if (differenceInDays(new Date(), new Date(cancellationDate)) >= 5)
        refundPercentage = 100; // Full refund if cancelled 5 days prior
      else if (differenceInDays(new Date(), new Date(cancellationDate)) >= 3)
        refundPercentage = 50; // 50% refund if cancelled 3-5 days prior
      break;
    case "Non-refundable":
      refundPercentage = 0; // Non-refundable policy
      break;
    default:
      refundPercentage = 0; // Default to no refund if policy not recognized
  }

  const refundAmount = (refundPercentage / 100) * bookingAmount; // Assuming bookingAmount is defined elsewhere
  return refundAmount.toFixed(2); // Return refund amount rounded to 2 decimal places
};

export default Refunds;
