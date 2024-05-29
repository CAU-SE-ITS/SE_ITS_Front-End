import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PAGE_URL, useUserStore } from "@/shared";

const AuthRouter = ({ children }: { children: React.ReactNode }) => {
  const isSignIn = useUserStore((state) => state.isSignIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignIn) navigate(PAGE_URL.SignIn);
  }, []);

  return <>{children}</>;
};

export default AuthRouter;
