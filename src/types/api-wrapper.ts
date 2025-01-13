// types/api-wrapper.ts
import { apiEndpoints } from '@/apis/endpoints';

// Utility type to transform API endpoints
type ApiEndpoints = typeof apiEndpoints;

// Helper type to transform each API function
type TransformApiFunction<T> = T extends (client: any, log: any, state: any, params: infer P) => Promise<infer R>
  ? (params: P) => Promise<R>
  : T extends object
  ? { [K in keyof T]: TransformApiFunction<T[K]> }
  : T;

// Final type for useApis return value
export type UseApis = TransformApiFunction<ApiEndpoints>;
