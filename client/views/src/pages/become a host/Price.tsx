import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import { BASE_PRICE, PRICE_CAP } from "@/constants/price";
import { useToast } from "@/components/ui/use-toast";
import ErrorMessage from "@/partials/components/ErrorMessage";

type TServiceProps = {
  serviceType?: string;
  serviceDescription?: string;
  listingPhotos?: TFileType[];
  price: number;
};

type TFileType = {
  public_id: string;
  secure_url: string;
  original_filename: string;
  bytes: number;
  thumbnail_url: string;
  format: string;
};

type TSetServiceType = {
  setService: Dispatch<React.SetStateAction<TServiceProps | undefined>>;
  service: TServiceProps;
};

function Price() {
  const { setService, service } = useOutletContext<TSetServiceType>();
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    document.title = "IGotYou - Price";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  useEffect(() => {
    if (service.price > PRICE_CAP || service.price < BASE_PRICE) {
      setErrorMessage(
        `Please enter a base price between ₱${BASE_PRICE} and ₱${PRICE_CAP}.`
      );
    } else {
      setErrorMessage("");
    }
  }, [service.price, toast]);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-8 h-[400px] flex flex-wrap flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold">Now, set your price</h1>
            <span className="text-base font-medium text-zinc-500">
              You can change it anytime.
            </span>
          </div>
          <CurrencyInput
            autoFocus
            className="text-[#222222] w-[400px] p-2 rounded border-none focus:outline-none text-6xl font-semibold"
            prefix="₱"
            allowNegativeValue={false}
            decimalsLimit={2}
            value={service.price}
            onValueChange={(value) =>
              setService((prev) => ({
                ...prev,
                price: parseInt(value ?? "0"),
              }))
            }
          />
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </section>
      </ScrollArea>
    </>
  );
}

export default Price;
