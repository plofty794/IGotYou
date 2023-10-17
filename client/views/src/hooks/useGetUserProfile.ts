import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useEffect, useState } from "react";

function useGetUserProfile() {
  const axiosPrivate = useAxiosPrivate();
  const [ID, setID] = useState<string | null>(null);

  useEffect(() => {
    const ID = localStorage.getItem("ID");
    ID && setID(ID);
  }, []);

  return useQuery({
    queryKey: ["profile", ID && ID],
    queryFn: async () => {
      return await axiosPrivate.get(`/api/users/profile/${ID}`);
    },
    enabled: ID != null,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    suspense: true,
  });
}

export default useGetUserProfile;
