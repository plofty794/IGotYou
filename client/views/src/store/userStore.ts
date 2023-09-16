import { axiosRoute } from "@/axios/axiosRoute";
import { create } from "zustand";

type TUserSchema = {
  id: string;
  username: string;
};

type TUser = {
  user: TUserSchema | null;
  setUser: (payload: TUserSchema) => void;
  logOutUser: () => void;
};

export const useUserStore = create<TUser>((set) => ({
  user: null,
  setUser: (payload) => set({ user: payload }),
  logOutUser: async () => await axiosRoute.delete("/api/users/logout"),
}));
