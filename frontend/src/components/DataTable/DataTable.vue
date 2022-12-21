<script setup lang="ts">
import get from 'lodash/get';
import { computed } from 'vue';
import type { DataTableColumn } from './types';

const props = withDefaults(defineProps<Props>(), {
  itemKey: 'id',
  page: 1,
  pageSize: 10,
  serverTotal: 0,
});

const length = computed(() => Math.ceil(props.serverTotal / props.pageSize));

const randomWidth = () => `${Math.random() * 50 + 50}%`;

const getValue = (row: Record<string, any>, column: DataTableColumn) => {
  return get(row, column.key);
};

const getFormattedValue = (row: Record<string, any>, column: DataTableColumn) => {
  const value = getValue(row, column);
  if (!column.format) return value;
  return column.format(value);
};

type Props = {
  columns: DataTableColumn[];
  rows: Record<string, any>[];
  loading: boolean;
  pageSize: number;
  page: number;
  itemKey?: string;
  serverTotal: number;
};
</script>

<template>
  <div class="data-table">
    <v-table>
      <thead>
        <tr>
          <th width="72px"></th>
          <th v-for="column in columns" :key="column.key">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="i in pageSize" :key="i">
            <td></td>
            <td v-for="column in columns" :key="column.key">
              <span><skeletor :width="randomWidth()" /></span>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="row in rows" :key="get(row, itemKey)">
            <td>
              <v-btn rounded icon flat size="small" @click="$emit('row-click', row)">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </td>
            <td v-for="column in columns" :key="column.key">
              <template v-if="$slots[`item-${column.key}`]">
                <slot
                  :name="`item-${column.key}`"
                  :column="column"
                  :row="row"
                  :value="getValue(row, column)"
                ></slot>
              </template>
              <router-link
                v-else-if="getValue(row, column) && column.to"
                :to="column.to(getValue(row, column), row)"
              >
                {{ getFormattedValue(row, column) }}
              </router-link>
              <span v-else-if="getValue(row, column)">
                {{ getFormattedValue(row, column) }}
              </span>
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>

    <div class="d-flex justify-end">
      <v-pagination
        dense
        density="comfortable"
        :model-value="page"
        :length="length"
        :total-visible="5"
        @update:model-value="$emit('update:page', $event)"
      />
    </div>
  </div>
</template>
