import Overview from "@/partials/dashboard/Overview";
import { useEffect } from "react";

function Dashboard() {
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
