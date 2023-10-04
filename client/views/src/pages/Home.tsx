import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.title = "IGotYou";
  }, []);

  return (
    <main className="min-h-screen bg-[#F2F2F2]">
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
          <li>Become a Host</li>

          <UserDropDownButton />
        </ul>
      </nav>
      <section className="p-8">
        <h1>HOME</h1>
      </section>
    </main>
  );
}

export default Home;
