import { Input } from "@/components/ui/input";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

type TSetServiceType = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function ServiceTitle() {
  const { setService, service } = useOutletContext<TSetServiceType>();
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "Service Title - IGotYou";
    const timeout = setTimeout(() => setIsFadingIn(false), 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        className={`w-full transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="flex h-[70vh] flex-col items-center justify-center gap-4">
          <div className="w-2/4 text-center">
            <h1 className="text-4xl font-semibold max-lg:text-2xl max-md:text-xl max-sm:text-lg">
              What will you call your service?{" "}
            </h1>
            <span className="text-lg font-medium text-gray-600 max-md:text-sm">
              (Service title)
            </span>
          </div>
          <Input
            autoFocus
            maxLength={50}
            spellCheck="true"
            placeholder={"Ex. Mang Juan's Photography Service"}
            className="mb-2 w-2/5 px-4 py-8 text-xl font-medium max-lg:w-2/4 max-lg:text-lg max-md:w-2/3 max-md:py-6 max-md:text-base max-sm:w-[90%] max-sm:px-2 max-sm:py-4"
            value={service.serviceTitle}
            onChange={(e) =>
              setService((prev) => ({
                ...prev,
                serviceTitle: e.target.value,
              }))
            }
          />
        </section>
      </div>
    </>
  );
}

export default ServiceTitle;
