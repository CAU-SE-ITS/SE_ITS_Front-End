import { Suspense, lazy } from "react";
import {
  BrowserRouter as RootRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Loading from "../entities/Loading";

import { PAGE_URL } from "../shared/configs/path";

const SignIn = lazy(() => import("../pages/auth/signin/SignInPage"));

const PageRouter = () => (
  <Suspense fallback={<Loading />}>
    <RootRouter>
      <Routes>
        <Route>
          <Route index element={<Navigate to={PAGE_URL.SignIn} replace />} />
          <Route path={PAGE_URL.SignIn} element={<SignIn />} />
        </Route>
      </Routes>
    </RootRouter>
  </Suspense>
);

export default PageRouter;
