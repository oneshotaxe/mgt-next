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
const title = computed(() => (id.value ? t('routes.editorTitle') : t('routes.creatorTitle')));

const { loading, model, v$, actions, fetch, save } = useEditorModule(columnId, id);

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
        <v-text-field
          v-model="model.num"
          :disabled="loading"
          :error="v$.num.$error"
          :error-messages="extractErrors(v$.num.$errors)"
          :label="t('fields.num')"
        />
      </v-col>
    </v-row>

    <actions-block :actions="actions" class="pt-8" />
  </form>
</template>
