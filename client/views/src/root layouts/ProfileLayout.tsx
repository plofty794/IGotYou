import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { Link, Outlet } from "react-router-dom";

function ProfileLayout() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] pb-10">
      <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
        <Link to={"/"}>
          <span>
            <img
              className="w-[30px] h-[30px]"
              loading="lazy"
              src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
              alt="logo"
            />
          </span>
        </Link>
        <ul className="text-sm font-medium flex justify-center items-center gap-5">
          <UserDropDownButton />
        </ul>
      </nav>
      {<Outlet />}
    </main>
  );
}

export default ProfileLayout;
