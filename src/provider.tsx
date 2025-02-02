import type { NavigateOptions } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/system";
import { useHref, useNavigate } from "react-router-dom";
import ToastProvider from "./contexts/toast-context";
import { ApiClientProvider } from "./contexts/api-client-context";
import { AuthProvider } from "./contexts/auth-context";
import { CacheProvider } from "./contexts/cache-context";
import { StateProvider } from "./contexts/state-context";
import { LayoutProvider } from "./contexts/layout-context";
import { AudienceProvider } from "./contexts/audience-context";
import { PresenterProvider } from "./contexts/presenter-context";

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
        <AuthProvider>
          <ApiClientProvider>
            <CacheProvider>
              <StateProvider>
                <LayoutProvider>
                  {/* <AudienceProvider> */}
                    <PresenterProvider>
                      {children}
                    </PresenterProvider>
                  {/* </AudienceProvider> */}
                </LayoutProvider>
              </StateProvider>
            </CacheProvider>
          </ApiClientProvider>
        </AuthProvider>
      </ToastProvider>
    </NextUIProvider>
  );
}
