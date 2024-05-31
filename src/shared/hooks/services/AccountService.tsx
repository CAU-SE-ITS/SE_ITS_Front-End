import { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

import { useAccountStore } from "@/shared";

export const AccountService = () => {
  const setAccounts = useAccountStore((state) => state.setAccounts);

  const URL = "/api/v1/account";

  const loadAllAccountList = async () => {
    const { data } = (await API.get(
      `${URL}`
    )) as AxiosResponse<User.LoadAccountListResDto>;

    setAccounts(data);
  };

  return { loadAllAccountList };
};
