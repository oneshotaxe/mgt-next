<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ActionsBlock } from '@/components';
import { extractErrors } from '@/utils';
import { useEditorModule } from './composable';

const { t } = useI18n();

const route = useRoute();
const id = computed(() => +route.params.id);
const title = computed(() => (id.value ? t('users.editorTitle') : t('users.creatorTitle')));

const { roles, showPasswordField, loading, model, v$, actions, fetch, save } = useEditorModule(id);

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
          v-model="model.nick"
          :disabled="loading"
          :error="v$.nick.$error"
          :error-messages="extractErrors(v$.nick.$errors)"
          :max-errors="1"
          :label="t('fields.nick')"
        />
      </v-col>

      <v-col v-if="showPasswordField" cols="12" md="6" lg="4">
        <v-text-field
          v-model="model.password"
          :disabled="loading"
          :error="v$.password.$error"
          :error-messages="extractErrors(v$.password.$errors)"
          :label="t('fields.password')"
          type="password"
        />
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-select
          v-model="model.roles"
          :items="roles"
          :disabled="loading"
          :error="v$.roles.$error"
          :error-messages="extractErrors(v$.roles.$errors)"
          :label="t('fields.roles')"
          multiple
        />
      </v-col>
    </v-row>

    <actions-block :actions="actions" class="pt-8" />
  </form>
</template>
