// src/api/apiResolver.ts
import { API_BASES, ApiServiceKey } from "./apiConfig";
import { createApi } from "./axiosFactory";

const apiCache: Record<string, ReturnType<typeof createApi>> = {};

export const getApi = (service: ApiServiceKey) => {
  if (!apiCache[service]) {
    apiCache[service] = createApi(API_BASES[service]);
  }
  return apiCache[service];
};
