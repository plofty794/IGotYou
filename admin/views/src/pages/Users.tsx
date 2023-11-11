import useGetUsers from "@/hooks/useGetUsers";
import UsersTable from "@/partials/UsersTable";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  uid: string;
  email: string;
  user_status: string;
  listings: number;
  subscription_status: "pending" | "active" | "expired";
  username: string;
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
    accessorKey: "subscription_status",
    header: "Subscription status",
  },
  {
    accessorKey: "user_status",
    header: "User status",
  },
  {
    accessorKey: "listings",
    header: "# of Listings",
  },
];

function Users() {
  const users = useGetUsers();

  return (
    <section className="py-4 px-8">
      <div className="w-full flex flex-col gap-4">
        <h1 className="font-bold text-3xl">
          Users{" "}
          <span className="text-sm text-gray-600 font-semibold">
            (pending & active)
          </span>
        </h1>
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
