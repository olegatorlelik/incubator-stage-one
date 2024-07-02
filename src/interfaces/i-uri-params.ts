export type TUriParams<
  TParams extends Record<string, string> = Record<string, string>,
> = TParams & {
  id: string;
};
