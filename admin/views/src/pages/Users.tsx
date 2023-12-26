import useGetUsers from "@/hooks/useGetUsers";
import UsersTable from "@/partials/UsersTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

type User = {
  email: string;
  username: string;
  userStatus: string;
  emailVerified: boolean;
  identityVerified: boolean;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "userStatus",
    header: "User status",
    cell: (props) => (
      <Badge className="capitalize">{props.getValue() as string}</Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (props) => (
      <p>{new Date(props.getValue() as string).toDateString()}</p>
    ),
  },
  {
    accessorKey: "identityVerified",
    header: "Identity verified",
    cell: (props) => (
      <Badge
        variant={`${
          String(props.getValue()) === "true" ? "default" : "destructive"
        }`}
        className="capitalize"
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
        variant={`${
          String(props.getValue()) === "true" ? "default" : "destructive"
        }`}
        className="capitalize"
      >
        {String(props.getValue())}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      // const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.email)}
            >
              Copy payment ID
            </DropdownMenuItem> */}

            <DropdownMenuItem>Disable account</DropdownMenuItem>
            <DropdownMenuItem>Delete account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function Users() {
  const users = useGetUsers();

  useEffect(() => {
    document.title = "Users - IGotYou";
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
