// src/api/apiCaller.ts
import { getApi } from "./apiResolver";
import { ApiServiceKey } from "./apiConfig";

interface ApiCallOptions {
  service: ApiServiceKey;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: any;
  params?: any;
}

export const apiCall = async ({
  service,
  method = "GET",
  url,
  data,
  params,
}: ApiCallOptions) => {
  const api = getApi(service);

  const response = await api.request({
    method,
    url,
    data,
    params,
  });

  return response.data;
};
