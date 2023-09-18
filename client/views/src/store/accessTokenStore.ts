import { create } from "zustand";

type TAccessToken = {
  accessToken: string | null;
  setAccessToken: (payload: string) => void;
};

export const useAccessTokenStore = create<TAccessToken>((set) => ({
  accessToken: null,
  setAccessToken: async (payload) => {
    set({ accessToken: payload });
  },
}));
