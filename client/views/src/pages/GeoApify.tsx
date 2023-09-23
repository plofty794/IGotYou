import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { GEOAPIFY_KEY } from "@/constants/API_Keys";

function GeoApify() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      });
    }
  }, []);

  const config = {
    method: "get",
    url: `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_KEY}`,
    headers: {},
  };

  function getCurrentLocation() {
    axios(config)
      .then(function (response) {
        console.log(response.data.features[0].properties);
        setAddress(
          response.data.features[0].properties?.suburb +
            " " +
            response.data.features[0].properties.address_line1 +
            " " +
            response.data.features[0].properties.address_line2
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function findLocation() {
    if (!address) return;
    const { data } =
      await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${address}&filter=countrycode:ph&format=json&apiKey=${GEOAPIFY_KEY}
    `);
    if (!data.results.length) {
      return alert("Invalid location");
    }
    if (data.results.length > 1) {
      alert(JSON.stringify(data.results));
    }
    return data;
  }

  async function handleLocationSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = await findLocation();
    if (!data) return;
    console.log(data);
  }

  return (
    <>
      <button onClick={getCurrentLocation}>Get Current Location</button>
      <br></br>
      <form onSubmit={handleLocationSubmit}>
        <input
          className="w-[400px]"
          placeholder="Barangay"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button>Search location</button>
      </form>
    </>
  );
}

export default GeoApify;
