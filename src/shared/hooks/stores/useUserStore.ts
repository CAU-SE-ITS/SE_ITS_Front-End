import { create } from "zustand";

export const useUserStore = create<User.UserStore>((set, get) => ({
  //State
  isSignIn: false,
  userId: -1,
  role: "ADMIN",

  //Set function
  signIn: (data) => {
    set(() => ({ isSignIn: true, userId: data.id, role: data.role }));
  },

  isAdmin: () => get().role === "ADMIN",
  isPl: () => get().role === "PL",
  isDev: () => get().role === "DEV",
  isTester: () => get().role === "TESTER",
}));
