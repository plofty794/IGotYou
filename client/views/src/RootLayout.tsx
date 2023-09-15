import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <main className="min-h-screen bg-hero-image bg-cover">
        <nav className="text-stone-100 flex justify-between items-center px-12 py-6">
          <div className="-tracking-tighter font-bold text-xl flex items-center justify-center gap-2 pointer-events-none">
            <h1 className="font-pacifico">IGotYou</h1>
          </div>
          <ul className="text-sm font-medium flex justify-center items-center gap-8">
            <NavLink className={"hover:text-blue-500"} to={"/about-us"}>
              About us
            </NavLink>
            <NavLink to={"/contact-us"}>Contact us</NavLink>
          </ul>
        </nav>
        <section>{<Outlet />}</section>
      </main>
    </>
  );
}

export default RootLayout;
