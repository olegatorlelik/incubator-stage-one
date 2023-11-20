const date = (str: string): boolean =>
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str);

export default date;
