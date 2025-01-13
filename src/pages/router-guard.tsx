import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLogger } from "@/hooks/use-logger";

type AccessCheck = {
  check: () => boolean;
  redirectPath?: string;
};

type Props = {
  component: React.ReactNode;
  checkAccess: AccessCheck[]; // チェック条件の配列
  defaultRedirectPath?: string; // 全体のデフォルトリダイレクト先
};

export const RouteAuthGuard: React.FC<Props> = ({ component, checkAccess, defaultRedirectPath = "/auth/login" }) => {
  const log = useLogger("RouteAuthGuard");
  const location = useLocation();

  for (const { check, redirectPath } of checkAccess) {
    if (!check()) {
      const targetPath = redirectPath || defaultRedirectPath; // 指定されたリダイレクト先かデフォルトを使用
      log.info(`Access denied. Redirecting to ${targetPath}.`);
      return <Navigate to={targetPath} state={{ from: location }} replace={false} />;
    }
  }

  log.info("Access granted.");
  return <>{component}</>;
};
