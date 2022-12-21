import type { RouteLocationRaw } from 'vue-router';

export type ActionsBlockItem = {
  loading?: boolean;
  text: string;
  type?: ActionsBlockItemType;
  buttonType?: string;
  key: string;
  to?: RouteLocationRaw;
  click?: (e: MouseEvent) => void;
  prependIcon?: string;
};

export type ActionsBlockItemType = 'PRIMARY' | 'ERROR' | 'DEFAULT';
