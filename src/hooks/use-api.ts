import { apiEndpoints } from '@/apis/endpoints';
import { useApiClient } from '@/contexts/api-client-context';
import { useLogger } from './use-logger';
import type { UseApis } from '@/types/api-wrapper';

export const useApis = (): UseApis => {
  const apiClient = useApiClient();
  const log = useLogger('api');

  // 共通処理を抽象化
  const createApiMethod = <P, R>(
    apiFunction: (client: any, log: any, params: P) => Promise<R>
  ): (params: P) => Promise<R> => {
    return (params: P) => {
      return apiFunction(apiClient, log, params);
    };
  };

  return {
    auth: {
      login: createApiMethod(apiEndpoints.auth.login),
      register: createApiMethod(apiEndpoints.auth.register),
    },
    room: {
      getJoinedRoomList: createApiMethod(apiEndpoints.room.getJoinedRoomList),
      createRoom: createApiMethod(apiEndpoints.room.createRoom),
    },
    // Add other namespaces and methods as needed
  };
};
