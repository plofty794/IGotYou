import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="text-white">
      <div className="text-center w-4/5 mx-auto flex items-center flex-col gap-6 pt-28">
        <h1 className="font-black text-5xl">
          Unlock Your Creative Vision with IGotYou: Your Gateway to Multimedia
          Excellence.
        </h1>
        <div className="w-4/5 mx-auto">
          <h2 className="text-slate-300">
            Discover a world of creative possibilities with IGotYou, the
            ultimate platform for{" "}
            <span className="text-sky-400 font-semibold">
              connecting customers{" "}
            </span>{" "}
            with multimedia artists. From breathtaking photography and
            captivating videography to stunning graphic arts and more, IGotYou
            is your{" "}
            <span className="text-sky-400 font-semibold">
              one-stop destination{" "}
            </span>{" "}
            to bring your vision to life.
          </h2>
        </div>
        <Link
          to={"/login"}
          className={`text-slate-700 font-extrabold w-max ${buttonVariants({
            variant: "secondary",
          })}`}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Hero;
