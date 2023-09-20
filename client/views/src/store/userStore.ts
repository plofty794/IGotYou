import { auth } from "@/firebase config/config";
import { create } from "zustand";

type TUserSchema = {
  username: string;
  email: string;
  _id: string;
  email_verified: false;
};

type TUser = {
  user: TUserSchema | null;
  setUser: (payload: TUserSchema) => void;
  logOutUser: () => void;
};

export const useUserStore = create<TUser>((set) => ({
  user: null,
  setUser: (payload) => {
    set({ user: payload });
    localStorage.setItem("ID", payload._id);
  },
  logOutUser: async () => {
    await auth.signOut();
    localStorage.clear();
  },
}));
