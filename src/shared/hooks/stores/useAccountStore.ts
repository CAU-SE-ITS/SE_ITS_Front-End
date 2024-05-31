import { create } from "zustand";

export const useAccountStore = create<User.AccountStore>((set) => ({
  //State
  accounts: [],

  //Set function
  setAccounts: (accounts) => {
    set(() => ({ accounts: accounts }));
  },
}));
