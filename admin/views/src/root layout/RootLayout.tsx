import Navigation from "@/partials/Navigation";
import { Outlet } from "react-router-dom";
import useGetAdminInfo from "@/hooks/useGetAdminInfo";

function RootLayout() {
  const { data } = useGetAdminInfo();

  return (
    <main className="min-h-screen">
      <Navigation />
      {<Outlet context={data?.data.admin} />}
    </main>
  );
}

export default RootLayout;
