import { GEOAPIFY_KEY } from "@/constants/API_Keys";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { useState } from "react";

function GeoApify() {
  const [feature, setFeature] = useState("");

  console.log(feature);

  return (
    <>
      <GeoapifyContext apiKey={GEOAPIFY_KEY}>
        <GeoapifyGeocoderAutocomplete
          type="postcode"
          filterByCountryCode={["ph"]}
          allowNonVerifiedHouseNumber={false}
          postprocessHook={(value) => {
            setFeature(value);
            return value.properties.formatted;
          }}
        />
      </GeoapifyContext>
      <button disabled={!feature} onClick={() => console.log("YES")}>
        Save
      </button>
    </>
  );
}

export default GeoApify;
