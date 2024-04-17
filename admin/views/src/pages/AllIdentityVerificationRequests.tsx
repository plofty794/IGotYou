import { Badge } from "@/components/ui/badge";
import { ring } from "ldrs";
import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import {
  CaretSortIcon,
  CheckCircledIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import EnableAccount from "@/partials/EnableAccount";
import DisableAccount from "@/partials/DisableAccount";
import { Link } from "react-router-dom";
import useGetIdentityVerificationRequests from "@/hooks/useGetIdentityVerificationRequests";
import IdentityVerificationRequestsTable from "@/partials/IdentityVerificationRequestsTable";

ring.register();

type VerifiedPayments = {
  createdAt: string;
  identityPhoto: string;
  identityVerificationStatus: string;
  user: {
    userStatus: string;
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
};

const columns: ColumnDef<VerifiedPayments>[] = [
  {
    accessorKey: "identityVerificationStatus",
    header: ({ column }) => {
      return (
        <Button
          className="font-medium"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        <Badge
          variant={"outline"}
          className={`font-bold capitalize ${
            row.original.identityVerificationStatus === "pending"
              ? " text-amber-600"
              : row.original.identityVerificationStatus === "reject"
              ? " text-red-600"
              : " text-green-600"
          }`}
        >
          {row.original.identityVerificationStatus}
        </Badge>
      </>
    ),
  },
  {
    accessorKey: "paymentProofPhoto",
    header: "Payment photo",
    cell: ({ row }) => (
      <a target="_blank" href={row.original.identityPhoto}>
        <img
          className="w-2/4 h-10 object-cover rounded border"
          src={row.original.identityPhoto}
        />
      </a>
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          className="font-medium"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props) => (
      <p className="font-bold text-xs">
        {new Date(props.getValue() as string).toDateString()}
      </p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <>
        <p className="font-bold text-xs">{row.original.user.email}</p>
        {row.original.user.isDisabled && (
          <Badge className="mt-2 rounded-full text-red-600" variant={"outline"}>
            Disabled
          </Badge>
        )}
      </>
    ),
  },
  {
    header: "Identity verified",
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className="capitalize font-bold text-green-600"
      >
        {String(row.original.user.identityVerified)}
      </Badge>
    ),
  },
  {
    header: "Email verified",
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className="capitalize font-bold text-green-600"
      >
        {String(row.original.user.emailVerified)}
      </Badge>
    ),
  },
  {
    header: "User status",
    cell: ({ row }) => (
      <Badge
        className={`font-bold capitalize ${
          row.original.user.userStatus === "host"
            ? "text-blue-600"
            : "text-green-600"
        }`}
        variant={"outline"}
      >
        {row.original.user.userStatus}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              className="p-0"
              onClick={() => copyToClipboard(row.original.user.email)}
            >
              <Button variant={"outline"} size={"sm"} className="gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
                Copy email
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              {row.original.user.isDisabled ? (
                <EnableAccount userID={row.original.user.uid} />
              ) : (
                <DisableAccount userID={row.original.user.uid} />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

async function copyToClipboard(email: string) {
  try {
    await navigator.clipboard.writeText(email);
    toast("Email copied to clipboard!", {
      duration: 2000,
      icon: (
        <CheckCircledIcon
          color="#FFF"
          className="inline-block rounded-full bg-[#39c152]"
        />
      ),
    });
  } catch (error) {
    toast("Oops! Something went wrong", {
      description: (error as Error).message as string,
    });
  }
}

function AllIdentityVerificationRequests() {
  const { data, isPending, fetchNextPage } =
    useGetIdentityVerificationRequests();

  useEffect(() => {
    document.title = "All Identity Verification Requests - Admin";
  }, []);

  return (
    <section className="py-8 px-12">
      <div className="w-full flex flex-col gap-4">
        <Link to={"/identity-photos"}>
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
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            All Identity verification request
          </h1>
          <span className="font-bold text-lg ">
            # of requests:{" "}
            {
              data?.pages.flatMap(
                (page) => page.data.identityVerificationRequests
              ).length
            }
          </span>
        </div>
        {isPending ? (
          "Loading..."
        ) : data?.pages == null ? (
          <IdentityVerificationRequestsTable
            columns={columns}
            data={[]}
            totalPages={0}
            fetchNextPage={fetchNextPage}
          />
        ) : (
          <IdentityVerificationRequestsTable
            columns={columns}
            data={
              data?.pages.flatMap(
                (page) => page.data.identityVerificationRequests
              ) as []
            }
            totalPages={
              data!.pages.flatMap(
                (page) => page.data.totalIdentityVerificationRequests
              ).length
            }
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </section>
  );
}

export default AllIdentityVerificationRequests;
