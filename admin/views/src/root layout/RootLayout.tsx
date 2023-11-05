import { Outlet } from "react-router-dom";

function RootLayout() {
  return <main className="min-h-screen">{<Outlet />}</main>;
}

export default RootLayout;
