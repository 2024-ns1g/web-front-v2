import { apiEndpoints } from '@/apis/endpoints';
import { useApiClient } from '@/contexts/api-client-context';
import { useLogger } from './use-logger';
import type { UseApis } from '@/types/api-wrapper';
import { useStateContext } from '@/contexts/state-context';

export const useApis = (): UseApis => {
  const state = useStateContext();
  const apiClient = useApiClient();
  const log = useLogger('api');

  // 共通処理を抽象化
  const createApiMethod = <P, R>(
    apiFunction: (client: any, log: any, state: any, params: P) => Promise<R>
  ): (params: P) => Promise<R> => {
    return (params: P): Promise<R> => {
      return apiFunction(apiClient, log, state, params);
    };
  };

  return {
    auth: {
      login: createApiMethod(apiEndpoints.auth.login),
      register: createApiMethod(apiEndpoints.auth.register),
    },
    room: {
      getJoinedRoomList: createApiMethod(apiEndpoints.room.getJoinedRoomList),
      createRoom: createApiMethod(apiEndpoints.room.createRoom)
    },
    slide: {
      getLinkedSlideList: createApiMethod(apiEndpoints.slide.getLinkedSlideList),
      createSlide: createApiMethod(apiEndpoints.slide.createSlide)
    },
    session: {
      audience: {
        verifyAudienceOtp: createApiMethod(apiEndpoints.session.audience.verifyAudienceOtp)
      },
      presenter: {
        verifyPresenterOtp: createApiMethod(apiEndpoints.session.presenter.verifyPresenterOtp)
      },
    }
  };
};
