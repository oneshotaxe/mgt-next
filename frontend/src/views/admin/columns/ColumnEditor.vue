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
const title = computed(() => (id.value ? t('columns.editorTitle') : t('columns.creatorTitle')));

const { loading, model, v$, actions, fetch, save } = useEditorModule(id);

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
      <v-col cols="12">
        <server-autocomplete
          v-model="model.user"
          v-model:model-value-id="model.userId"
          :fetch="api.users.get"
          :disabled="loading"
          :error="v$.userId.$error"
          :error-messages="extractErrors(v$.userId.$errors)"
          :label="t('fields.user')"
          item-title="nick"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-text-field
          v-model="model.title"
          :disabled="loading"
          :error="v$.title.$error"
          :error-messages="extractErrors(v$.title.$errors)"
          :label="t('fields.title')"
        />
      </v-col>
    </v-row>

    <actions-block :actions="actions" class="pt-8" />
  </form>
</template>
