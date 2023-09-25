import { GEOAPIFY_KEY } from "@/constants/API_Keys";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import ErrorMessage from "../../ErrorMessage";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";

function Address() {
  const { mutate, error } = useUpdateUserProfile();
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  error && console.log(error);

  function handleAddressSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address) return setErrorMessage("Zip code is required");
    mutate({ address });
    setErrorMessage("");
  }

  return (
    <Dialog>
      <DialogTrigger
        className={`hover:bg-[#e9e9e9] w-full font-medium text-md
           shadow-md flex justify-start items-center pl-4 pr-6 py-8 rounded`}
      >
        <span className="mr-2">
          <HomeIcon color="black" width={25} height={25} />
        </span>
        Where I live
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl">Where do you live?</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddressSubmit} className="mt-4">
          <Label className="text-sm font-medium" htmlFor="address">
            Your Municipality/City's zip code
          </Label>
          <GeoapifyContext apiKey={GEOAPIFY_KEY}>
            <div className="geo mb-1">
              <GeoapifyGeocoderAutocomplete
                type="postcode"
                filterByCountryCode={["ph"]}
                placeSelect={(value) => console.log(value)}
                allowNonVerifiedHouseNumber={false}
                skipIcons={true}
                placeholder="Enter zip code"
                postprocessHook={(value) => {
                  setAddress(
                    `${
                      value.properties.formatted
                    }, ${value.properties.country_code.toUpperCase()}`
                  );
                  return value.properties.formatted;
                }}
              />
            </div>
            {errorMessage && <ErrorMessage message={errorMessage} />}
          </GeoapifyContext>
          <div className="flex gap-2 items-center pt-2">
            <Button
              className="bg-[#222222] text-white font-medium disabled:cursor-not-allowed"
              size={"lg"}
              variant={"secondary"}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Address;
