import { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

import { useAccountStore } from "@/shared";

export const ProjectService = () => {
  const setAccounts = useAccountStore((state) => state.setAccounts);
  const setAccount = useAccountStore((state) => state.setAccount);
  const setDeleteAccount = useAccountStore((state) => state.deleteAccount);

  const URL = "api/v1/member/account";

  const loadAllAccountList = async () => {
    const { data } = (await API.get(
      `${URL}`
    )) as AxiosResponse<User.LoadAccountListResDto>;

    setAccounts(data);
  };

  const editAccount = async (id: number, role: User.Role) => {
    await API.put(`${URL}/update`, {
      data: { id: id, role: role },
    });

    setAccount(id, role);
  };

  const deleteAccount = async (id: number) => {
    await API.put(`${URL}/delete`, {
      data: { id: id },
    });

    setDeleteAccount(id);
  };

  return { loadAllAccountList, deleteAccount, editAccount };
};
