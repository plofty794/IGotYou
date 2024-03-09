import Overview from "@/partials/dashboard/Overview";
import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard - Admin IGotYou";
  }, []);

  return (
    <>
      <Overview />
    </>
  );
}

export default Dashboard;
