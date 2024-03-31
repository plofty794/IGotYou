import aboutservice from "../../../assets/about-service.json";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

function AboutYourService() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "About your Service - IGotYou";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  return (
    <>
      <div
        className={`w-full transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-8 flex h-[70vh] items-center gap-28 max-lg:gap-20 max-md:flex-col max-md:justify-center max-md:gap-12 max-sm:gap-2">
          <div className="flex w-full flex-col items-end gap-4 pl-16 font-semibold max-md:items-center max-md:gap-0 max-md:p-0 max-md:px-6">
            <p>Step 1</p>
            <h1 className="text-4xl max-lg:text-2xl max-md:text-base">
              Tell us about your service
            </h1>
            <p className="text-right font-medium text-zinc-500 max-md:text-center max-md:text-sm">
              In this step, we'll ask you which type of service you have. Then
              let us know the name of your service.
            </p>
          </div>
          <div className="w-full">
            <span className="font-medium">
              <Lottie
                className="h-[400px] w-full max-md:h-[250px]"
                animationData={aboutservice}
                loop={false}
              />
            </span>
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutYourService;
