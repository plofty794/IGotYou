import { axiosPrivate } from "@/axios/axiosRoute";
import { useAccessTokenStore } from "@/store/accessTokenStore";
import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import useAccessToken from "./useAccessToken";
import { auth } from "@/firebase config/config";

interface AxiosConfig extends AxiosRequestConfig {
  sent: boolean;
}

export function useAxiosPrivate() {
  const newAccessToken = useAccessToken();
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  auth.currentUser?.getIdToken().then((token) => setAccessToken(token));
  console.log(accessToken);
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevRequest = error.config as AxiosConfig;
        if (error.response.status === 400) {
          const IdToken = await newAccessToken();
          accessToken && setAccessToken(IdToken!);
          prevRequest.headers!.Authorization = `Bearer ${IdToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, newAccessToken, setAccessToken]);

  return axiosPrivate;
}
