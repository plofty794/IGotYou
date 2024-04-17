import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import useGetRefunds from "@/hooks/useGetRefunds";
import RefundsTable from "@/partials/RefundsTable";
import { formatValue } from "react-currency-input-field";

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
    partialPaymentAmount: number;
    fullPaymentAmount: number;
    refundAmount: string;
    _id: string;
  };
  guestCancelReasons: string;
  status: string;
  _id: string;
};

const columns: ColumnDef<TRefunds>[] = [
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
    header: "To pay",
    cell: ({ row }) => (
      <p className="font-bold text-xs capitalize text-green-600">
        {formatValue({
          value: String(row.original?.reservationID.paymentAmount),
          intlConfig: {
            locale: "ph",
            currency: "php",
          },
          decimalScale: 2,
        })}
      </p>
    ),
  },
  {
    header: "Paid amount",
    cell: ({ row }) => (
      <p className="font-bold text-xs capitalize text-green-600">
        {formatValue({
          value: isNaN(
            row.original?.reservationID.paymentStatus === "partially-paid"
              ? row.original?.reservationID.partialPaymentAmount
              : row.original?.reservationID.paymentAmount
          )
            ? "0"
            : String(
                row.original?.reservationID.paymentStatus === "partially-paid"
                  ? row.original?.reservationID.partialPaymentAmount
                  : row.original?.reservationID.paymentAmount
              ),
          intlConfig: {
            locale: "ph",
            currency: "php",
          },
          decimalScale: 2,
        })}
      </p>
    ),
  },
  {
    header: "Payment Status",
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className={`font-bold capitalize ${
          row.original.reservationID.paymentStatus === "pending"
            ? "text-amber-600"
            : row.original.reservationID.paymentStatus === "fully-paid"
            ? "text-green-600"
            : "text-blue-600"
        }`}
      >
        {row.original?.reservationID.paymentStatus}
      </Badge>
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
        className="capitalize font-bold text-amber-600"
      >
        {formatValue({
          value: String(row.original.reservationID.refundAmount),
          intlConfig: {
            locale: "ph",
            currency: "php",
          },
          decimalScale: 2,
        })}
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

  useEffect(() => {
    document.title = "Refunds - Admin IGotYou";
  }, []);

  return (
    <section className="py-4 px-8">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <span className="font-bold text-3xl">Refunds</span>
        </div>
        {isPending ? (
          "Loading..."
        ) : data?.pages == null ? (
          <RefundsTable
            columns={columns}
            data={[]}
            totalPages={0}
            fetchNextPage={fetchNextPage}
          />
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

export default Refunds;
