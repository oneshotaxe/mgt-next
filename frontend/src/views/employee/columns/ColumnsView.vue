<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { ActionsBlock, DataTable } from '@/components';
import { useListModule } from './composable';

const { t } = useI18n();

const { columns, table, actions, onRowClick } = useListModule();

onMounted(table.fetch);
</script>

<template>
  <div>
    <h1>{{ t('columns.listTitle') }}</h1>

    <actions-block :actions="actions" reverse />

    <data-table
      v-model:page="table.page"
      :columns="columns"
      :rows="table.rows"
      :loading="table.loading"
      :page-size="table.pageSize"
      :server-total="table.total"
      @row-click="(row) => onRowClick(row.id)"
    />
  </div>
</template>
