import useGetAdminInfo from "@/hooks/useGetAdminInfo";
import Overview from "@/partials/dashboard/Overview";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Dashboard() {
  useGetAdminInfo();
  const token = localStorage.getItem("isAdmin");

  useEffect(() => {
    document.title = "IGotYou - Admin Dashboard";
  }, []);

  return (
    <>
      {token == null && <Navigate to={"/login"} replace />}
      <Overview />
    </>
  );
}

export default Dashboard;
