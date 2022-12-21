<script setup lang="ts">
import get from 'lodash/get';
import type { DataBlockField } from './types';

defineProps<Props>();

const randomWidth = () => `${Math.random() * 50 + 10}%`;

const getValue = (row: Record<string, any>, field: DataBlockField) => {
  return get(row, field.key);
};

const getFormattedValue = (row: Record<string, any>, field: DataBlockField) => {
  const value = getValue(row, field);
  if (!field.format) return value;
  return field.format(value);
};

type Props = {
  fields: DataBlockField[];
  model: Record<string, any>;
  loading: boolean;
};
</script>

<template>
  <v-row class="pt-8">
    <template v-for="field in fields" :key="field.key">
      <v-col cols="12" md="6" class="text-right font-weight-bold">
        {{ field.title }}
      </v-col>
      <v-col cols="12" md="6">
        <skeletor v-if="loading" :width="randomWidth()" />
        <template v-else>
          <template v-if="$slots[`field-${field.key}`]">
            <slot
              :name="`field-${field.key}`"
              :field="field"
              :model="model"
              :value="getValue(model, field)"
            ></slot>
          </template>
          <router-link
            v-else-if="getValue(model, field) && field.to"
            :to="field.to(getValue(model, field), model)"
          >
            {{ getFormattedValue(model, field) }}
          </router-link>
          <span v-else-if="getValue(model, field)">
            {{ getFormattedValue(model, field) }}
          </span>
        </template>
      </v-col>
    </template>
  </v-row>
</template>
