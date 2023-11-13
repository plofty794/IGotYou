import useGetAdminInfo from "@/hooks/useGetAdminInfo";
import Overview from "@/partials/dashboard/Overview";
import { useEffect } from "react";

function Dashboard() {
  useGetAdminInfo();

  useEffect(() => {
    document.title = "IGotYou - Admin Dashboard";
  }, []);

  return (
    <>
      <Overview />
    </>
  );
}

export default Dashboard;
