import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { Link, Outlet } from "react-router-dom";

function ProfileLayout() {
  return (
    <main className="min-h-screen pb-10">
      <nav className="shadow py-5 px-28 flex justify-between items-center w-full max-w-screen-2xl mx-auto 2xl:rounded-b-lg">
        <Link to={"/"}>
          <span>
            <img
              className="object-cover w-[30px] max-h-full max-w-full"
              loading="lazy"
              src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
              alt="logo"
            />
          </span>
        </Link>
        <UserDropDownButton />
      </nav>
      {<Outlet />}
    </main>
  );
}

export default ProfileLayout;
