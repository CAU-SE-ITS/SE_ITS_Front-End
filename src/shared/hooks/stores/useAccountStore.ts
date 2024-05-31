import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useAccountStore = create<User.AccountStore>()(
  immer((set) => ({
    //State
    accounts: [],

    //Set function
    setAccounts: (accounts) => {
      set(() => ({ accounts: accounts }));
    },

    addAccount: (user) => {
      set((state) => {
        state.accounts.push(user);
      });
    },

    setAccount: (id, role) => {
      set((state) => {
        if (state.accounts.find((user) => user.id === id))
          state.accounts.find((user) => user.id === id)!.role = role;
      });
    },

    deleteAccount: (id) => {
      set((state) => {
        if (state.accounts.find((user) => user.id === id))
          state.accounts.splice(
            state.accounts.findIndex((user) => user.id === id),
            1
          );
      });
    },
  }))
);
