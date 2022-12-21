<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ActionsBlock, DataTable } from '@/components';
import { useListModule } from './composable';

const { t } = useI18n();
const route = useRoute();

const columnId = computed(() => +route.params.columnId);
const { columns, table, actions, onRowClick } = useListModule(columnId);

onMounted(table.fetch);
</script>

<template>
  <div>
    <h1>{{ t('drivers.listTitle') }}</h1>

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
