<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ActionsBlock, DataBlock } from '@/components';
import { useViewModule } from './composable';

const { t } = useI18n();

const route = useRoute();
const id = computed(() => +route.params.id);
const columnId = computed(() => +route.params.columnId);

const { loading, model, fields, actions, fetch } = useViewModule(columnId, id);

onMounted(() => {
  if (id.value) {
    fetch();
  }
});
</script>

<template>
  <div>
    <h1>{{ t('routes.viewTitle') }}</h1>

    <data-block :fields="fields" :model="model" :loading="loading" />

    <actions-block :actions="actions" class="pt-8" />
  </div>
</template>
