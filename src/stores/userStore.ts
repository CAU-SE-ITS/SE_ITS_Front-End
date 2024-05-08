import { create } from "zustand";

const useUserState = create<User.userStore>((set) => ({
  //State
  isSignIn: false,
  userId: "",

  //Set function
  signIn: (id: string) => {
    set(() => ({ isSignIn: true, userId: id }));
  },
}));

export default useUserState;
