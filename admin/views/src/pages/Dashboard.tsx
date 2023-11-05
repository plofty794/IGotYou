import useGetAdminInfo from "@/hooks/useGetAdminInfo";
import Navigation from "@/partials/Navigation";
import Overview from "@/partials/dashboard/Overview";
import { useEffect } from "react";

function Dashboard() {
  const { data } = useGetAdminInfo();

  useEffect(() => {
    document.title = "IGotYou - Admin Dashboard";
  }, []);

  console.log(data);

  return (
    <>
      <Navigation />
      <Overview />
    </>
  );
}

export default Dashboard;
