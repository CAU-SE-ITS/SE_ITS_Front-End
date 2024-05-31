import { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

import { useAccountStore } from "@/shared";

export const AccountService = () => {
  const setAccounts = useAccountStore((state) => state.setAccounts);

  const URL = "ap/v1/member/account";

  const loadAllAccountList = async () => {
    const { data } = (await API.get(
      `${URL}`
    )) as AxiosResponse<User.LoadAccountListResDto>;

    setAccounts(data);
  };

  const editAccount = async (id: number, role: User.Role) => {
    await API.post(`${URL}`, {
      data: { id: id, role: role },
    });
  };

  const deleteAccount = async (id: number) => {
    await API.delete(`${URL}`, {
      data: { id: id },
    });
  };

  return { loadAllAccountList, deleteAccount, editAccount };
};
