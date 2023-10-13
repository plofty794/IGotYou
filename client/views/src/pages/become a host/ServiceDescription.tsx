import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

type TServiceProps = {
  serviceType?: string;
  serviceDescription?: string;
};

type TSetServiceType = {
  setService: Dispatch<React.SetStateAction<TServiceProps | undefined>>;
  service: TServiceProps;
};

function ServiceDescription() {
  const { setService, service } = useOutletContext<TSetServiceType>();
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "IGotYou - Service";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-8 h-[400px] flex flex-col items-center justify-center gap-4">
          <div className="text-center w-[1024px]">
            <h1 className="text-3xl font-semibold">
              "What will you call your service?"{" "}
            </h1>
            <span className="text-sm font-medium">(Service name)</span>
          </div>

          <Input
            autoFocus
            spellCheck
            placeholder={"Ex. Mang Juan's Photography service"}
            className="w-[400px] mb-2"
            value={service.serviceDescription}
            onChange={(e) =>
              setService((prev) => ({
                ...prev,
                serviceDescription: e.target.value,
              }))
            }
          />
        </section>
      </ScrollArea>
    </>
  );
}

export default ServiceDescription;
