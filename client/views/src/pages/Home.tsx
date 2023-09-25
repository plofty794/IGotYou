import UserDropDownButton from "@/partials/UserDropDownButton";
import { MixIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
        <Link to={"/"} className="font-bold text-xl bg-[#FF7262] text-white">
          <MixIcon width={35} height={35} />
        </Link>
        <ul className="text-sm font-medium flex justify-center items-center gap-5">
          <li>Become a Host</li>

          <UserDropDownButton />
        </ul>
      </nav>
    </div>
  );
}

export default Home;
