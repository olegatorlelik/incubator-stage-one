export const array = (array: string[], values: string[]): boolean =>
  array.every((item) => values.includes(item));
