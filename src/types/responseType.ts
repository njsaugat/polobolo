export type ResponseType<T = any> = {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
};
