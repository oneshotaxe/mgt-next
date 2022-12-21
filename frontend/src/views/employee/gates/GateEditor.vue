<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import api from '@/api';
import { ActionsBlock, ServerAutocomplete } from '@/components';
import { extractErrors } from '@/utils';
import { useEditorModule } from './composable';

const { t } = useI18n();

const route = useRoute();
const id = computed(() => +route.params.id);
const columnId = computed(() => +route.params.columnId);
const title = computed(() => (id.value ? t('gates.editorTitle') : t('gates.creatorTitle')));

const { loading, model, v$, actions, fetch, save } = useEditorModule(columnId, id);

const fetchRoutes = (params: { limit: number; offset: number; search: string }) =>
  api.routes.get({ ...params, columnId: columnId.value });

onMounted(() => {
  if (id.value) {
    fetch();
  }
});
</script>

<template>
  <form @submit.prevent="save">
    <h1>{{ title }}</h1>

    <v-row class="pt-8">
      <v-col cols="12" md="6" lg="4">
        <server-autocomplete
          v-model="model.route"
          v-model:model-value-id="model.routeId"
          :fetch="fetchRoutes"
          :disabled="loading"
          :error="v$.routeId.$error"
          :error-messages="extractErrors(v$.routeId.$errors)"
          :label="t('fields.route')"
          item-title="num"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model="model.num"
          :disabled="loading"
          :error="v$.num.$error"
          :error-messages="extractErrors(v$.num.$errors)"
          :label="t('fields.num')"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model="model.durationFirstSmene"
          :disabled="loading"
          :label="t('fields.durationFirstSmene')"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model="model.durationSecondSmene"
          :disabled="loading"
          :label="t('fields.durationSecondSmene')"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model="model.outPark"
          :disabled="loading"
          :label="t('fields.outPark')"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model="model.change"
          :disabled="loading"
          :label="t('fields.change')"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model="model.endWork"
          :disabled="loading"
          :label="t('fields.endWork')"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model="model.lunchFirstSmene"
          :disabled="loading"
          :label="t('fields.lunchFirstSmene')"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model="model.lunchSecondSmene"
          :disabled="loading"
          :label="t('fields.lunchSecondSmene')"
        />
      </v-col>
    </v-row>

    <actions-block :actions="actions" class="pt-8" />
  </form>
</template>
