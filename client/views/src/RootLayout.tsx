import { MixIcon } from "@radix-ui/react-icons";
import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <main className="min-h-screen">
        <nav className="text-slate-950 flex justify-between items-center px-12 py-6 shadow">
          <div className="-tracking-wide font-bold text-xl flex items-center justify-center gap-2 pointer-events-none">
            <span className="bg-[#FF7262] text-white">
              <MixIcon width={35} height={35} />
            </span>
          </div>
          <ul className="font-semibold text-sm flex justify-center items-center gap-8">
            <NavLink className="hover:text-[#5551FF]" to={"/about-us"}>
              About us
            </NavLink>
            <NavLink
              className="bg-[#5551FF] hover:bg-[#2d2c2c] text-white rounded-md px-3 py-2"
              to={"/contact-us"}
            >
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
