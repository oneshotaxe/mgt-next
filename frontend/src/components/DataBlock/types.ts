import type { RouteLocationRaw } from 'vue-router';

export type DataBlockField = {
  key: string;
  title: string;
  format?: (value: any) => string;
  to?: (value: any, row: Record<string, any>) => RouteLocationRaw;
};
