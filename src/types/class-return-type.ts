export type ClassReturnType<T extends new (...args: any[]) => any> =
  InstanceType<T>;
