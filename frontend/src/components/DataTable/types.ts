import type { RouteLocationRaw } from 'vue-router';

export type DataTableColumn = {
  key: string;
  title: string;
  orderKey?: string;
  format?: (value: any) => string;
  to?: (value: any, row: Record<string, any>) => RouteLocationRaw;
};
