export const envKeys = {
  apiHost: 'VITE_API_HOST',
} as const;

export const envLoader = (key: string, defaultValue: string | null = null): string | null => {
  const value = process.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  return value;
}
