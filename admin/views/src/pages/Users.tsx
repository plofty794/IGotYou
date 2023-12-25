import useGetUsers from "@/hooks/useGetUsers";
import UsersTable from "@/partials/UsersTable";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";

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
  },
  {
    accessorKey: "emailVerified",
    header: "Email verified",
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
        <span className="font-bold text-3xl">Users</span>
        <span className="font-bold text-lg text-gray-600">
          # of users:{" "}
          {users.data?.pages.flatMap((page) => page.data.users).length}
        </span>
        {users.isPending ? (
          "Loading..."
        ) : (
          <UsersTable
            columns={columns}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data={users.data?.pages.flatMap((page) => page.data.users) as any[]}
          />
        )}
      </div>
    </section>
  );
}

export default Users;
