import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <main className="min-h-screen">
        <nav className="text-slate-950 flex justify-between items-center px-12 py-6 shadow">
          <div className="-tracking-wide font-bold text-xl flex items-center justify-center gap-2 pointer-events-none">
            <h1 className="text-[#FF385C]">IGotYou</h1>
          </div>
          <ul className="font-semibold text-sm flex justify-center items-center gap-8">
            <NavLink className="hover:text-[#FF385C]" to={"/about-us"}>
              About us
            </NavLink>
            <NavLink className="hover:text-[#FF385C]" to={"/contact-us"}>
              Contact us
            </NavLink>
          </ul>
        </nav>
        <section>{<Outlet />}</section>
      </main>
    </>
  );
}

export default RootLayout;
