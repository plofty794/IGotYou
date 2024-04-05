import useGetUsers from "@/hooks/useGetUsers";
import UsersTable from "@/partials/UsersTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircledIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import EnableAccount from "@/partials/EnableAccount";
import DisableAccount from "@/partials/DisableAccount";

type User = {
  email: string;
  username: string;
  userStatus: string;
  emailVerified: boolean;
  identityVerified: boolean;
  isDisabled: boolean;
  uid: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "userStatus",
    header: "User status",
    cell: (props) => (
      <Badge
        className={`font-bold capitalize ${
          props.row.original.userStatus === "host"
            ? "text-blue-600"
            : "text-green-600"
        }`}
        variant={"outline"}
      >
        {props.getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <>
        <p className="font-bold text-xs">{row.original.email}</p>
        {row.original.isDisabled && (
          <Badge className="mt-2 rounded-full text-red-600" variant={"outline"}>
            Disabled
          </Badge>
        )}
      </>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <p className="font-bold text-xs">{row.original?.username}</p>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (props) => (
      <p className="font-bold text-xs">
        {new Date(props.getValue() as string).toDateString()}
      </p>
    ),
  },
  {
    accessorKey: "identityVerified",
    header: "Identity verified",
    cell: (props) => (
      <Badge
        variant={"outline"}
        className={`font-bold capitalize ${
          String(props.getValue()) === "true"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {String(props.getValue())}
      </Badge>
    ),
  },
  {
    accessorKey: "emailVerified",
    header: "Email verified",
    cell: (props) => (
      <Badge
        variant={"outline"}
        className={`font-bold capitalize ${
          String(props.getValue()) === "true"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {String(props.getValue())}
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
              onClick={() => copyToClipboard(row.original.email)}
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
              {row.original.isDisabled ? (
                <EnableAccount userID={row.original.uid} />
              ) : (
                <DisableAccount userID={row.original.uid} />
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

function Users() {
  const users = useGetUsers();

  useEffect(() => {
    document.title = "Users - Admin IGotYou";
  }, []);

  return (
    <section className="py-4 px-8">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <span className="font-bold text-3xl">Users</span>
          <span className="font-bold text-lg ">
            # of users:{" "}
            {users.data?.pages.flatMap((page) => page.data.totalUsers)[0]}
          </span>
        </div>
        {users.isPending ? (
          "Loading..."
        ) : (
          <UsersTable
            columns={columns}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data={users.data?.pages.flatMap((page) => page.data.users) as any[]}
            totalPages={
              users.data?.pages.flatMap((page) => page.data.totalPages)[0]
            }
            fetchNextPage={users.fetchNextPage}
          />
        )}
      </div>
    </section>
  );
}

export default Users;
