export type Response<T = Record<string, never>> = {
  success: boolean;
  message?: string;
  data: T;
};
