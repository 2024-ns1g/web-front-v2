import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { useLogger } from "@/hooks/use-logger";

type Props = {
  component: React.ReactNode;
  checkAccess: Array<(auth: ReturnType<typeof useAuth>) => boolean>; // コールバックの配列
  redirectPath?: string; // リダイレクト先のパス (デフォルト値: "/auth/login")
};

export const RouterGuard: React.FC<Props> = ({ component, checkAccess, redirectPath = "/auth/login" }) => {
  const auth = useAuth();
  const log = useLogger("RouteAuthGuard");
  const location = useLocation();

  // 全ての条件を評価
  const allowRoute = checkAccess.every((check) => check(auth));

  if (!allowRoute) {
    log.info("Access denied. Redirecting to login.");
    return <Navigate to={redirectPath} state={{ from: location }} replace={false} />;
  }

  log.info("Access granted.");
  return <>{component}</>;
};
