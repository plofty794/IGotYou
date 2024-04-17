import { NavLink } from "react-router-dom";

function ReservationsTabs() {
  return (
    <div className="reservations flex items-center gap-8 py-2">
      <NavLink className="font-semibold text-gray-600" to={"all"}>
        All
      </NavLink>

      <NavLink className="font-semibold text-gray-600" to={"upcoming"}>
        Upcoming
      </NavLink>

      <NavLink className="font-semibold text-gray-600" to={"previous"}>
        Previous
      </NavLink>
    </div>
  );
}

export default ReservationsTabs;
