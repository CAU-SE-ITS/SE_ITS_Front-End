import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUserState from "../shared/hooks/userStore";
import { PAGE_URL } from "../shared/configs/path";

const AuthRouter = ({ children }: { children: React.ReactNode }) => {
  const isSignIn = useUserState((state) => state.isSignIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignIn) navigate(PAGE_URL.SignIn);
  }, []);

  return <>{children}</>;
};

export default AuthRouter;
