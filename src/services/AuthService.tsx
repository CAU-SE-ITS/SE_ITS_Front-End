import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

import { API, setAccess } from "@/configs/axios";
import { PAGE_URL } from "@/configs/path";

import useUserState from "@/stores/userStore";

const AuthService = () => {
  const setId = useUserState((state) => state.signIn);
  const navigate = useNavigate();

  const URL = "/api/v1/user";

  const signin = async (body: User.SignInReqDto) => {
    const {
      data: { id },
    } = (await API.post(
      `${URL}/sign-in`,
      body
    )) as AxiosResponse<User.SignInResDto>;

    setAccess(id);
    setId(id);

    navigate(PAGE_URL.Project);
  };

  return [signin];
};

export default AuthService;
