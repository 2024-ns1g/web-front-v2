import { useAuth } from "@/contexts/auth-context";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  component: React.ReactNode;
}

export const RouteAuthGuard: React.VFC<Props> = (props) => {
  const auth = useAuth();


  let allowRoute = false;
  if (auth.isAuthenticated) {
    // allowRoute = props.allowroles ? props.allowroles.includes(authUser.role) : true;
    // TODO: Impl role check system
    allowRoute = true;
  }

  if (!allowRoute) {
    // return <Navigate to={props.redirect} state={{from:useLocation()}} replace={false} />
    return <Navigate to="/auth/login" state={{from:useLocation()}} replace={false} />
  }

  return <>{props.component}</>;

}
