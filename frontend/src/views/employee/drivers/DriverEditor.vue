<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import api from '@/api';
import { ActionsBlock, ServerAutocomplete, GraphicEditor } from '@/components';
import { extractErrors } from '@/utils';
import { useEditorModule } from './composable';

const { t } = useI18n();

const route = useRoute();
const id = computed(() => +route.params.id);
const columnId = computed(() => +route.params.columnId);
const title = computed(() => (id.value ? t('drivers.editorTitle') : t('drivers.creatorTitle')));

const { loading, model, v$, actions, fetch, save } = useEditorModule(columnId, id);

const fetchBuses = (params: { limit: number; offset: number; search: string }) =>
  api.buses.get({ ...params, columnId: columnId.value });

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
        <v-row>
          <v-col cols="12">
            <server-autocomplete
              v-model="model.bus"
              v-model:model-value-id="model.busId"
              :fetch="fetchBuses"
              :disabled="loading"
              :error="v$.busId.$error"
              :error-messages="extractErrors(v$.busId.$errors)"
              :label="t('fields.bus')"
              item-title="num"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="model.num"
              :disabled="loading"
              :error="v$.num.$error"
              :error-messages="extractErrors(v$.num.$errors)"
              :label="t('fields.num')"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="model.fullName"
              :disabled="loading"
              :error="v$.fullName.$error"
              :error-messages="extractErrors(v$.fullName.$errors)"
              :label="t('fields.fullName')"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <graphic-editor v-model="model.graphic" :label="t('fields.graphic')" />
      </v-col>
    </v-row>

    <actions-block :actions="actions" class="pt-8" />
  </form>
</template>
