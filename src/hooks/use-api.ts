import { apiEndpoints } from '@/apis/endpoints';
import { useApiClient } from '@/contexts/api-client-context';
import { useLogger } from './use-logger';

export const useApis = () => {
  const apiClient = useApiClient();
  const log = useLogger('api');

  // 共通処理を抽象化
  const createApiMethod = <T extends (...args: any[]) => any>(
    apiFunction: T
  ) => {
    return async (params: Parameters<T>[2]) => {
      return await apiFunction(apiClient, log, params);
    };
  };

  return {
    auth: {
      login: createApiMethod(apiEndpoints.auth.login),
      register: createApiMethod(apiEndpoints.auth.register),
    },
    room: {
      getJoinedRoomList: createApiMethod(apiEndpoints.room.getJoinedRoomList),
    },
  };
};
