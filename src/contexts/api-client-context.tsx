import { createContext, useContext, ReactNode, useMemo } from 'react';
import createApiClient from '@/apis/client';

interface ApiClientContextValue {
  apiClient: ReturnType<typeof createApiClient>;
}

const ApiClientContext = createContext<ApiClientContextValue | undefined>(undefined);

export const ApiClientProvider = ({ children }: { children: ReactNode }) => {
  const apiClient = useMemo(() => createApiClient(true), []); // 必要なら `auth` を変更可能

  return (
    <ApiClientContext.Provider value={{ apiClient }}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error('useApiClient must be used within an ApiProvider');
  }
  return context.apiClient;
};
