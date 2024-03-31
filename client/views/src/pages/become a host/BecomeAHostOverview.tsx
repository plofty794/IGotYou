import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

function BecomeAHostOverview() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "Add a Listing Overview - IGotYou";
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
        <section className="my-8 flex h-[70vh] items-center gap-28 max-lg:gap-20 max-md:flex-col max-md:justify-center max-md:gap-12 max-sm:gap-6">
          <div className="ml-16 w-max max-md:ml-0 ">
            <h1 className="text-5xl font-semibold max-lg:text-4xl max-md:text-2xl max-sm:text-base">
              It’s easy to get started on IGotYou
            </h1>
          </div>
          <div className="flex w-full flex-col gap-10 text-2xl max-lg:gap-8 max-md:gap-4 max-md:text-sm max-sm:text-xs">
            <span className="font-medium max-md:w-full max-md:text-center">
              1. Tell us about your service{" "}
              <p className="ml-6 text-base font-normal text-zinc-500 max-md:text-sm max-sm:text-xs">
                Share some basic info, like what it is.
              </p>
            </span>
            <Separator />
            <span className="font-medium max-md:w-full max-md:text-center">
              2. Make it stand out{" "}
              <p className="ml-7 text-base font-normal text-zinc-500 max-md:ml-0 max-md:px-4 max-md:text-sm max-sm:text-xs">
                Add 5 or more photos plus a title and description—we’ll help you
                out.
              </p>
            </span>
            <Separator />
            <span className="font-medium max-md:w-full max-md:text-center">
              3. Finish up and publish{" "}
              <p className="ml-7 text-base font-normal text-zinc-500 max-md:ml-0 max-md:px-4 max-md:text-sm max-sm:text-xs">
                Set a starting price, cancellation policy, and publish your
                listing.
              </p>
            </span>
          </div>
        </section>
      </div>
    </>
  );
}

export default BecomeAHostOverview;
