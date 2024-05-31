import { create } from "zustand";

export const useAccountStore = create<User.AccountStore>((set) => ({
  //State
  accounts: [{ name: "정상제", id: 1, role: "PL" }],

  //Set function
  setAccounts: (accounts) => {
    set(() => ({ accounts: accounts }));
  },

  setAccount: (id, role) => {
    set((state) => {
      if (state.accounts.find((user) => user.id === id))
        state.accounts.find((user) => user.id === id)!.role = role;

      return {};
    });
  },

  deleteAccount: (id) => {
    set((state) => {
      if (state.accounts.find((user) => user.id === id))
        state.accounts.splice(
          state.accounts.findIndex((user) => user.id === id),
          1
        );

      return {};
    });
  },
}));
