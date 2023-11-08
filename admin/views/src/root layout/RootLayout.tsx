import Navigation from "@/partials/Navigation";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main className="min-h-screen">
      <Navigation />
      {<Outlet />}
    </main>
  );
}

export default RootLayout;
