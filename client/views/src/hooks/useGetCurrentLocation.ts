import { axiosRoute } from "@/axios/axiosRoute";
import { GEOAPIFY_KEY } from "@/constants/API_Keys";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrentLocation() {
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_KEY}`;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      });
    }
  }, []);

  return useQuery({
    queryKey: ["user-loc"],
    queryFn: async () => await axiosRoute.get(url),
    enabled: longitude != undefined && latitude != undefined,
  });
}
