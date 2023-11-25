import useVisitListing from "@/hooks/useVisitListing";
import Loader from "@/partials/loaders/Loader";
import { Link, Outlet } from "react-router-dom";

function BookingLayout() {
  const { data, isPending } = useVisitListing();

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <main>
          <nav className="py-8 px-16 border-b">
            <Link to={"/"}>
              <img
                className="object-cover w-[30px] max-h-full max-w-full"
                loading="lazy"
                src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                alt="logo"
              />
            </Link>
          </nav>
          {<Outlet context={data?.data} />}
        </main>
      )}
    </>
  );
}

export default BookingLayout;
