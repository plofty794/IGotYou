import { axiosRoute } from "@/axios/axiosRoute";
import { GEOAPIFY_KEY } from "@/constants/API_Keys";

function useGeoding() {
  return async (address: string) => {
    const { data } = await axiosRoute.get(
      `https://api.geoapify.com/v1/geocode/search?text=${address}&filter=countrycode:ph&format=json&apiKey=${GEOAPIFY_KEY}`
    );
    return data;
  };
}

export default useGeoding;
