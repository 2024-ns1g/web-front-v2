import { apiEndpoints } from "@/apis/endpoints";
import { useApiClient } from "@/contexts/api-client-context";
import { useLogger } from "@/hooks/use-logger";

export const useApi = () => {
  const log = useLogger("api");
  const apiClient = useApiClient();

  const wrappedEndpoints = Object.keys(apiEndpoints).reduce((acc, key) => {
    acc[key] = (...args: any[]) => {
      return (apiEndpoints as any)[key](log, apiClient, ...args);
    };
    return acc;
  }, {} as Record<string, (...args: any[]) => Promise<any>>);

  return {
    ...wrappedEndpoints,
  };
};
