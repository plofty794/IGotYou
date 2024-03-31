import ServiceUploader from "@/pages/become a host/ServiceUploader";
import { useEffect, useState } from "react";

function ServiceAssets() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "IGotYou - Make it Stand out";
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
        <section className="flex h-[70vh] flex-col items-center justify-center gap-8 max-md:gap-4 max-sm:px-4">
          <div className="w-full text-center">
            <h1 className="text-4xl font-semibold max-lg:text-2xl max-md:text-xl">
              Upload your works
            </h1>
            <p className="text-center text-lg font-semibold text-zinc-500 max-md:text-base">
              You'll need 5 images/videos/audio to start. You can add more and
              make changes later.
            </p>
          </div>
          <div className="flex w-[600px] flex-col items-center gap-2">
            <ServiceUploader />
          </div>
        </section>
      </div>
    </>
  );
}

export default ServiceAssets;
