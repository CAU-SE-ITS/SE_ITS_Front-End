import { Suspense, lazy } from "react";
import {
  BrowserRouter as RootRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppStyles from "./AppStyles";
import AuthRouter from "./AuthRouter";

import { Loading } from "@/entities";

import { PAGE_URL } from "@/shared";

const SignIn = lazy(() => import("@/pages/auth/signin/SignInPage"));
const Setting = lazy(() => import("@/pages/setting/SettingPage"));
const Project = lazy(() => import("@/pages/project/ProjectPage"));
const Issue = lazy(() => import("@/pages/issue/IssuePage"));

const PageRouter = () => (
  <Suspense fallback={<Loading />}>
    <RootRouter>
      <AppStyles />
      <AuthRouter>
        <Routes>
          <Route>
            <Route index element={<Navigate to={PAGE_URL.SignIn} replace />} />
            <Route path={PAGE_URL.SignIn} element={<SignIn />} />
            <Route path={PAGE_URL.Setting} element={<Setting />} />
            <Route path={PAGE_URL.Project} element={<Project />} />
            <Route path={PAGE_URL.Issue} element={<Issue />} />
          </Route>
        </Routes>
      </AuthRouter>
    </RootRouter>
  </Suspense>
);

export default PageRouter;
