import { Badge } from "@/components/ui/badge";
import { ring } from "ldrs";
import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import AllPaymentsTable from "@/partials/AllPaymentsTable";
import { Link } from "react-router-dom";
import useGetServicePayments from "@/hooks/useGetServicePayments";
import ViewPaymentTransactions from "@/partials/ViewPaymentTransactions";
ring.register();

type TUser = {
  email: string;
  emailVerified: boolean;
  identityVerified: boolean;
  mobileVerified: boolean;
  subscriptionExpiresAt: string;
  username: string;
  isDisabled: boolean;
  uid: string;
  _id: string;
};

type AllServicePayments = {
  confirmServiceEnded: boolean;
  paymentType: string;
  createdAt: string;
  hostID: TUser;
  guestID: TUser;
  listingID: {
    serviceTitle: string;
  };
  paymentAmount: number;
  fullPaymentDate: string;
};

const columns: ColumnDef<AllServicePayments>[] = [
  {
    accessorKey: "paymentType",
    header: ({ column }) => {
      return (
        <Button
          className="font-medium"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        <Badge
          variant={"outline"}
          className="font-bold capitalize text-green-600"
        >
          {row.original.paymentType}
        </Badge>
      </>
    ),
  },

  {
    header: "Host",
    cell: ({ row }) => (
      <>
        <p className="font-bold text-xs">{row.original.hostID.email}</p>
        {row.original.hostID.isDisabled && (
          <Badge className="mt-2 rounded-full text-red-600" variant={"outline"}>
            Disabled
          </Badge>
        )}
      </>
    ),
  },
  {
    header: "Guest",
    cell: ({ row }) => (
      <>
        <p className="font-bold text-xs">{row.original.guestID.email}</p>
        {row.original.guestID.isDisabled && (
          <Badge className="mt-2 rounded-full text-red-600" variant={"outline"}>
            Disabled
          </Badge>
        )}
      </>
    ),
  },
  {
    header: "Service name",
    cell: ({ row }) => (
      <p className="text-xs capitalize font-bold">
        {String(row.original.listingID.serviceTitle)}
      </p>
    ),
  },

  {
    accessorKey: "Full payment date",
    header: ({ column }) => {
      return (
        <Button
          className="font-medium"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full payment date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        <p className="text-xs font-bold capitalize">
          {new Date(row.original.fullPaymentDate).toDateString()}
        </p>
      </>
    ),
  },
  {
    accessorKey: "paymentAmount",
    header: ({ column }) => {
      return (
        <Button
          className="font-medium"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        <Badge
          variant={"outline"}
          className="font-bold capitalize text-green-600"
        >
          {row.original.paymentAmount}
        </Badge>
      </>
    ),
  },
];

function AllServicePayments() {
  const { data, isPending, fetchNextPage } = useGetServicePayments();

  useEffect(() => {
    document.title = "All Service Payments - Admin";
  }, []);

  return (
    <section className="py-8 px-12">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link className="w-max" to={"/payments"}>
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
          <ViewPaymentTransactions />
        </div>
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold">All Service payments</h1>
          <span className="font-bold text-lg ">
            # of complete payments:{" "}
            {
              data?.pages?.flatMap((page) => page.data.allServicePayments)
                .length
            }
          </span>
        </div>
        {isPending ? (
          "Loading..."
        ) : data?.pages == null ? (
          <AllPaymentsTable
            totalAmount={0}
            columns={columns}
            data={[]}
            totalPages={0}
            fetchNextPage={fetchNextPage}
          />
        ) : (
          <AllPaymentsTable
            totalAmount={
              data?.pages?.flatMap((page) =>
                page.data.allServicePayments.reduce(
                  (acc: number, v: { paymentAmount: number }) =>
                    v.paymentAmount + acc,
                  0
                )
              )[0] as number
            }
            columns={columns}
            data={
              data?.pages.flatMap((page) => page.data.allServicePayments) as []
            }
            totalPages={data!.pages.flatMap((page) => page.data.totalPages)[0]}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </section>
  );
}

export default AllServicePayments;
