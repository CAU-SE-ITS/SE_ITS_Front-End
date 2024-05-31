import { create } from "zustand";

export const useAccountStore = create<User.AccountStore>((set) => ({
  //State
  accounts: [{ name: "정상제", id: 1, role: "PL" }],

  //Set function
  setAccounts: (accounts) => {
    set(() => ({ accounts: accounts }));
  },
}));
