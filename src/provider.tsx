import type { NavigateOptions } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/system";
import { useHref, useNavigate } from "react-router-dom";
import ToastProvider from "./contexts/toast-context";
import { ApiClientProvider } from "./contexts/api-client-context";
import { ApiProvider } from "./contexts/api-context";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider>
        <ApiClientProvider>
          <ApiProvider>
            {children}
          </ApiProvider>
        </ApiClientProvider>
      </ToastProvider>
    </NextUIProvider>
  );
}
