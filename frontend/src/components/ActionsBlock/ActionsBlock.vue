<script setup lang="ts">
import type { ActionsBlockItem, ActionsBlockItemType } from './types';

withDefaults(defineProps<Props>(), {
  actions: () => [],
});

const actionToAttrs = (action: ActionsBlockItem) => {
  return {
    to: action.to,
    flat: true,
    color: typeToColor(action.type),
    border: !action.type || action.type === 'DEFAULT',
    loading: action.loading,
    type: action.buttonType,
  };
};

const actionToListeners = (action: ActionsBlockItem) => {
  return {
    click: action.click,
  };
};

const typeToColor = (type?: ActionsBlockItemType) => {
  switch (type) {
    case 'PRIMARY':
      return 'primary';
    case 'ERROR':
      return 'error';
    default:
      return undefined;
  }
};

type Props = {
  actions?: ActionsBlockItem[];
  reverse?: boolean;
  title?: string;
};
</script>

<template>
  <div class="actions-block" :class="{ 'actions-block--reverse': reverse }">
    <v-btn
      v-for="(action, i) in actions"
      :key="action.key"
      :class="{ 'ml-4': reverse ? i !== actions.length - 1 : i !== 0 }"
      v-bind="actionToAttrs(action)"
      v-on="actionToListeners(action)"
    >
      {{ action.text }}
    </v-btn>

    <v-spacer />

    <h2 v-if="title">{{ title }}</h2>
  </div>
</template>

<style lang="scss">
.actions-block {
  display: flex;

  &--reverse {
    flex-direction: row-reverse;
  }
}
</style>
