import { useAuth } from "@/contexts/auth-context";
import { useLogger } from "@/hooks/use-logger";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  component: React.ReactNode;
};

export const RouteAuthGuard = (props: Props) => {
  const auth = useAuth();
  const log = useLogger("RouteAuthGuard");

  let allowRoute = false;
  if (!auth.isAuthenticated) {
    // allowRoute = props.allowroles ? props.allowroles.includes(authUser.role) : true;
    // TODO: Impl role check system
    allowRoute = true;
  } else {
    log.info("Not authenticated");
  }

  if (!allowRoute) {
    // return <Navigate to={props.redirect} state={{from:useLocation()}} replace={false} />
    return <Navigate to="/auth/login" state={{ from: useLocation() }} replace={false} />;
  } else log.info("Authenticated");

  return <>{props.component}</>;
};
