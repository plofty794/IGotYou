import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

type TServiceType = {
  serviceType: string;
  serviceDescription?: string;
};

type TSetServiceType = {
  setService: Dispatch<React.SetStateAction<TServiceType | undefined>>;
  service: TServiceType;
};

const CATEGORIES = [
  "Digital Audio Services",
  "Digital Video Services",
  "Graphic Design and Visual Arts",
  "Photography Services",
  "Animation and 3D Modeling",
  "Live Events and Concerts",
  "Digital Advertising and Marketing",
];

function Service() {
  const { setService, service } = useOutletContext<TSetServiceType>();
  const [selected, setSelected] = useState("");
  const [isFadingIn, setIsFadingIn] = useState(true);
  useEffect(() => {
    document.title = "IGotYou - Service";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  console.log(service);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-16 flex flex-col items-center justify-center gap-8">
          <div className="text-center w-3/4">
            <h1 className="text-3xl font-semibold">
              Which of these best categories describes your service?
            </h1>
          </div>
          <div className="flex items-center justify-center flex-wrap w-3/5 max-md:w-full gap-4 px-8">
            {CATEGORIES.map((category) => (
              <Button
                onClick={() => {
                  setSelected(category);
                  setService((prev) => ({
                    ...prev,
                    serviceType: category,
                  }));
                }}
                type="button"
                className={`h-max flex flex-col gap-2 border text-950 bg-white p-6 hover:outline-gray-950 hover:outline hover:bg-white ${
                  selected === category ? "outline-gray-950 outline" : ""
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>
      </ScrollArea>
    </>
  );
}

export default Service;
