import { GEOAPIFY_KEY } from "@/constants/API_Keys";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

type TSetServiceType = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function ServiceLocation() {
  const { setService, service } = useOutletContext<TSetServiceType>();
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) =>
      setCurrentLocation(pos.coords),
    );
  }, []);

  useEffect(() => {
    document.title = "IGotYou - Service location";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  return (
    <>
      <div
        className={`w-full transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="flex h-[70vh] flex-col items-center justify-center gap-4">
          <div className="flex w-2/4 flex-col gap-2 text-center">
            <h1 className="text-4xl font-semibold max-lg:text-2xl max-md:text-xl max-sm:text-lg">
              Where's your service located?
            </h1>
            <span className="text-lg font-medium text-gray-600 max-md:text-sm">
              Your service address is shared with guests across the platform.
            </span>
          </div>
          <GeoapifyContext apiKey={GEOAPIFY_KEY}>
            <div className="geo service-location mb-1 w-2/5 px-4 py-8 text-xl font-medium max-lg:w-2/4 max-lg:text-lg max-md:w-2/3 max-md:py-6 max-md:text-base max-sm:w-[90%] max-sm:px-2 max-sm:py-4">
              <GeoapifyGeocoderAutocomplete
                addDetails
                limit={10}
                biasByProximity={{
                  lat: currentLocation?.latitude ?? 0,
                  lon: currentLocation?.longitude ?? 0,
                }}
                filterByCountryCode={["ph"]}
                debounceDelay={300}
                value={service.serviceLocation}
                allowNonVerifiedHouseNumber={false}
                skipIcons={true}
                postprocessHook={(value) => {
                  setService((prev) => ({
                    ...prev,
                    serviceLocation: value.properties.formatted,
                  }));
                  return value.properties.formatted;
                }}
              />
            </div>
          </GeoapifyContext>
        </section>
      </div>
    </>
  );
}

export default ServiceLocation;
