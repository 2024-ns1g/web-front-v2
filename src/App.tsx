import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import DebugPage from "./pages/debug";
import { RouterGuard } from "./pages/router-guard";
import { useAuth } from "./contexts/auth-context";
import { useStateContext } from "./contexts/state-context";
import ChooseRoom from "./pages/choose/room";
import ChooseSlide from "./pages/choose/slide";

function App() {
  const auth = useAuth();
  const state = useStateContext();

  // Access control methods
  const isAuthenticated = () => auth.isAuthenticated;
  const activeRoomSelected = () => state.activeRoomId !== null && state.activeRoomId !== "";
  const activeSlideSelected = () => state.activeSlideId !== null && state.activeSlideId !== "";
  const activeSlideSelectedAndRoomSelected = () => activeRoomSelected() && activeSlideSelected();

  // Utility function
  const makeCommonPrivateRoute = (component: React.ReactNode) => {
    return (
      <RouterGuard
        component={component}
        checkAccess={[
          { check: isAuthenticated, redirectPath: "/auth/login" },
          { check: activeSlideSelectedAndRoomSelected, redirectPath: "/choose/room" },
        ]}
      />
    );
  }

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={makeCommonPrivateRoute(<DebugPage />)} path="/debug" />

      <Route element={<RouterGuard
        component={<ChooseRoom />}
        checkAccess={[
          { check: isAuthenticated, redirectPath: "/auth/loign" },
        ]}
      />
      } path="/choose/room" />

      <Route element={<RouterGuard
        component={<ChooseSlide />}
        checkAccess={[
          { check: isAuthenticated, redirectPath: "/auth/login" },
          { check: activeRoomSelected, redirectPath: "/choose/room" },
        ]}
      />
      } path="/choose/slide" />

      <Route element={<Login />} path="/auth/login" />
      <Route element={<Register />} path="/auth/register" />
    </Routes>
  );
}

export default App;
