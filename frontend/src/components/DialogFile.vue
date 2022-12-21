<script setup lang="ts">
import { onMounted, ref } from 'vue';

const applyRef = ref<{ $el: HTMLButtonElement } | null>(null);

const files = ref<File[]>();

onMounted(() => {
  if (applyRef.value) {
    applyRef.value.$el.focus();
  }
});
</script>

<template>
  <v-card>
    <v-card-title>Выберите файл</v-card-title>

    <v-card-text>
      <v-file-input v-model="files" />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn text plain class="mr-1" @click="$emit('close')"> Отмена </v-btn>
      <v-btn ref="applyRef" depressed color="primary" @click="$emit('apply', files)">
        Подтвердить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
