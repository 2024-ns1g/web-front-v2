import { createContext, useContext, ReactNode } from 'react';
import { apiEndpoints } from '@/apis/endpoints';

interface ApiContextValue {
  apis: typeof apiEndpoints;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ApiContext.Provider value={{ apis: apiEndpoints }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApis = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApis must be used within an ApiProvider');
  }
  return context.apis;
};
