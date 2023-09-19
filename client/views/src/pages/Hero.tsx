import { buttonVariants } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Hero() {
  useEffect(() => {
    document.title = "IGotYou - Where Artistry Meets Opportunity";
  }, []);

  return (
    <>
      <div className="text-center w-4/5 mx-auto flex items-center flex-col gap-6 pt-28">
        <h1 className="text-[#222222] font-black text-5xl">
          Unlock Your Creative Vision with IGotYou: Your Gateway to Multimedia
          Excellence.
        </h1>
        <div className="font-semibold w-4/5 mx-auto">
          <h2 className="text-[#222222]">
            Discover a world of creative possibilities with IGotYou, the
            ultimate platform for{" "}
            <span className="text-[#FF385C] font-bold">
              connecting customers with multimedia artists.{" "}
            </span>{" "}
            From breathtaking photography and captivating videography to
            stunning graphic arts and more, IGotYou is your{" "}
            <span className="text-[#FF385C] font-bold">
              one-stop destination{" "}
            </span>{" "}
            to bring your vision to life.
          </h2>
        </div>
        <Link
          to={"/login"}
          className={`mt-2 text-white w-max bg-[#FF385C] hover:bg-[#E8204E] ${buttonVariants(
            {
              variant: "secondary",
            }
          )}`}
        >
          Get Started
        </Link>
      </div>
    </>
  );
}

export default Hero;
