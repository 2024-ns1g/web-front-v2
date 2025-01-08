export const envKeys = {
  apiHost: 'VITE_API_HOST',
  defaultTimeout: 'VITE_API_DEFAULT_TIMEOUT',
  logLevel : 'VITE_LOG_LEVEL',
  minLogLevel: 'VITE_MIN_LOG_LEVEL',
} as const;

export const envLoader = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${key} is not defined and no default value was provided.`);
    }
    return defaultValue;
  }
  return value;
};
