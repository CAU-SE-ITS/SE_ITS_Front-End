import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

import { API, setAccess } from "@/shared/configs/axios";
import { PAGE_URL } from "@/shared/configs/path";

import { useUserStore } from "@/shared";

export const AuthService = () => {
  const signIn = useUserStore((state) => state.signIn);
  const navigate = useNavigate();

  const URL = "/api/v1/member";

  const signin = async (body: User.SignInReqDto) => {
    const { data } = (await API.post(
      `${URL}/signIn`,
      body
    )) as AxiosResponse<User.SignInResDto>;

    setAccess(data.id);
    signIn({ ...data });

    navigate(PAGE_URL.Setting);
  };

  return { signin };
};
