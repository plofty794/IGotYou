import { useEffect, useState } from "react";
import confetti from "../../../assets/confetti.json";
import Lottie from "lottie-react";

function Success() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "Congratulations- IGotYou";
    const Timeout = setTimeout(() => setIsFadingIn(false), 400);

    return () => clearTimeout(Timeout);
  }, []);

  return (
    <>
      <div
        className={`w-full transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-8 flex h-[70vh] items-center justify-center gap-28 max-lg:gap-20 max-md:flex-col max-md:gap-12 max-sm:gap-2">
          <h1 className="text-7xl font-bold max-lg:text-5xl max-md:text-3xl">
            {isFadingIn ? "Loading..." : "Congratulations!"}
          </h1>
          <Lottie
            animationData={confetti}
            className="h-[250px] w-[250px] max-md:h-[150px] max-md:w-[150px]"
          />
        </section>
      </div>
    </>
  );
}

export default Success;
