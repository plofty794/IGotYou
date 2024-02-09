import { NavLink } from "react-router-dom";
import AdminDropdownMenu from "./AdminDropdownMenu";

function Navigation() {
  return (
    <nav className="py-4 px-8 flex justify-between items-center border-b">
      <div className="flex justify-between items-center gap-4">
        <ul className="font-medium text-base flex items-center justify-center gap-4">
          <NavLink className="font-bold opacity-70" to={"/dashboard"}>
            Dashboard
          </NavLink>
          <NavLink className="font-bold opacity-70" to={"/users"}>
            Users
          </NavLink>
          <NavLink className="font-bold opacity-70" to={"/identity-photos"}>
            ID's
          </NavLink>
          <NavLink className="font-bold opacity-70" to={"/subscriptions"}>
            Subscriptions
          </NavLink>
          <NavLink className="font-bold opacity-70" to={"/reservations"}>
            Reservations
          </NavLink>
        </ul>
      </div>
      <AdminDropdownMenu />
    </nav>
  );
}

export default Navigation;
