import { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

import { useAccountStore } from "@/shared";

export const AccountService = () => {
  const setAccounts = useAccountStore((state) => state.setAccounts);
  const setAccount = useAccountStore((state) => state.setAccount);
  const setDeleteAccount = useAccountStore((state) => state.deleteAccount);
  const setAddAccount = useAccountStore((state) => state.addAccount);

  const URL = "api/v1/member";

  const loadAllAccountList = async () => {
    const { data } = (await API.get(
      `${URL}/account`
    )) as AxiosResponse<User.LoadAccountListResDto>;

    setAccounts(data);
  };

  const addAccount = async (body: User.SignUpRepDto) => {
    const { data } = (await API.post(
      `${URL}/signUp`,
      body
    )) as AxiosResponse<User.User>;

    setAddAccount(data);
  };

  const editAccount = async (id: number, role: User.Role) => {
    console.log(role);
    console.log(id);
    await API.put(`${URL}/account/update`, {
      id: id,
      role: role,
    });

    setAccount(id, role);
  };

  const deleteAccount = async (id: number) => {
    await API.put(`${URL}/account/delete`, {
      id: id,
    });

    setDeleteAccount(id);
  };

  return { loadAllAccountList, addAccount, deleteAccount, editAccount };
};
