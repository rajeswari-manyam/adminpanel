// src/api/apiConfig.ts
export const API_BASES = {
  MAIN: process.env.REACT_APP_API_BASE_MAIN!,
  VERIFY: process.env.REACT_APP_API_BASE_VERIFY!,
  DASH: process.env.REACT_APP_API_BASE_DASH!,
} as const;

export type ApiServiceKey = keyof typeof API_BASES;
