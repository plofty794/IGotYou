import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

function Service() {
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
        <section className="my-8 h-[400px] flex flex-col items-center justify-center gap-8">
          <div className="text-center w-[1024px]">
            <h1 className="text-3xl font-semibold">
              "Which of these best describes your service?"
            </h1>
          </div>

          <RadioGroup
            onValueChange={(value) =>
              setService((prev) => ({
                ...prev,
                serviceType: value,
              }))
            }
            defaultValue={service.serviceType}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Events and Entertainment" id="r1" />
              <Label htmlFor="r1">Events and Entertainment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Audio and Sound Services" id="r2" />
              <Label htmlFor="r2">Audio and Sound Services</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Photography and Videography" id="r3" />
              <Label htmlFor="r3">Photography and Videography</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Content and Marketing" id="r3" />
              <Label htmlFor="r3">Content and Marketing</Label>
            </div>
          </RadioGroup>
        </section>
      </ScrollArea>
    </>
  );
}

export default Service;
