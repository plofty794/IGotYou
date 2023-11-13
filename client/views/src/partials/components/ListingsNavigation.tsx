import { NavLink, useLocation } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/constants/categories";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function ListingsNavigation() {
  const location = useLocation();
  const [pathname, setPathName] = useState("Home");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPathName("Home");
        break;
      case "/category/audio&sound_services":
        setPathName("Audio and Sound");
        break;
      case "events&entertainment":
        setPathName("Events and Entertainment");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <div className="flex items-start justify-between w-full gap-8 px-8 pt-8 pb-0 max-md:w-full max-md:p-4">
        <Swiper
          fadeEffect={{
            crossFade: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            480: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination]}
          className="max-md:text-xs"
        >
          {CATEGORIES.map((category) => (
            <SwiperSlide key={category}>
              <NavLink
                to={`/category/photography&videography`}
                className="flex flex-col items-center justify-center gap-1 opacity-70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                  />
                </svg>
                <span className="active text-xs font-semibold text-gray-600">
                  {category}
                </span>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"secondary"}
              className="max-sm:hidden p-5 border flex items-center justify-center gap-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent>hello</DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default ListingsNavigation;
