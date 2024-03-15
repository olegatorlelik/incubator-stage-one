export type TUriParams<TParams extends Record<string, string> = any> =
  TParams & {
    id: string;
  };
