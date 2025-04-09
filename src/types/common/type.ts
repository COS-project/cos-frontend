export interface ResponseType<T> {
  responseCode: 'string';
  message?: string;
  result: T;
}
