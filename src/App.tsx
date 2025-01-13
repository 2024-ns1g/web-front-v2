import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import DebugPage from "./pages/debug";
import { RouterGuard } from "./pages/router-guard";

function App() {

  // Utility function
  const makeCommonPrivateRoute = (component: React.ReactNode) => {
    return (
      <RouterGuard
        component={component}
        checkAccess={[
          (auth) => auth.isAuthenticated,
        ]}
      />
    );
  }

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={makeCommonPrivateRoute(<DebugPage />)} path="/debug" />


      <Route element={<Login />} path="/auth/login" />
      <Route element={<Register />} path="/auth/register" />
    </Routes>
  );
}

export default App;
