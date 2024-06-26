import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function HostingTabs() {
  return (
    <div className="flex w-2/4 items-center justify-between py-2 max-lg:w-full">
      <NavLink to={"current-reservations"}>
        <Button
          variant={"outline"}
          className="rounded-full font-semibold max-lg:text-xs max-lg:font-bold"
        >
          Current reservation
        </Button>
      </NavLink>
      <NavLink to={"upcoming-reservations"}>
        <Button
          variant={"outline"}
          className="rounded-full font-semibold max-lg:text-xs max-lg:font-bold"
        >
          Upcoming reservations
        </Button>
      </NavLink>
      <NavLink to={"previous-reservations"}>
        <Button
          variant={"outline"}
          className="rounded-full font-semibold max-lg:text-xs max-lg:font-bold"
        >
          Previous reservations
        </Button>
      </NavLink>
    </div>
  );
}

export default HostingTabs;
