export const string = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return Boolean(value.trim() && /^[a-zA-Z0-9_. ]{2,50}$/.test(value));
};
