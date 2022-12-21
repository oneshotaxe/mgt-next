import type { ErrorObject } from '@vuelidate/core';

const extractErrors = (errors: ErrorObject[]): string[] => {
  return errors.map((e) => e.$message as string).slice(0, 1);
};

export { extractErrors };
