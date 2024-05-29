import { create } from "zustand";

export const useUserStore = create<User.userStore>((set) => ({
  //State
  isSignIn: true,
  userId: -1,
  role: "ADMIN",

  //Set function
  signIn: (data) => {
    set(() => ({ isSignIn: true, userId: data.id, role: data.role }));
  },
}));
