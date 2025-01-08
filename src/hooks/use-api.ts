import { apiEndpoints } from '@/apis/endpoints';
import { useApiClient } from '@/contexts/api-client-context';
import { useLogger } from './use-logger';

export const useApis = () => {
  const apiClient = useApiClient();
  const log = useLogger('api');

  return {
    auth: {
      login: async (params: Parameters<typeof apiEndpoints.auth.login>[2]) => {
        return await apiEndpoints.auth.login(apiClient, log, params);
      },
    }
  }
};
