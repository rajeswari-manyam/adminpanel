import { createApi } from "./axiosFactory";

export const apiMain = createApi(
  process.env.REACT_APP_API_BASE_MAIN!
);

export const apiVerify = createApi(
  process.env.REACT_APP_API_BASE_VERIFY!
);

export const apiDash = createApi(
  process.env.REACT_APP_API_BASE_DASH!
);
