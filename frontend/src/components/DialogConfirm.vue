<script setup lang="ts">
import { onMounted, ref, type Component } from 'vue';

defineProps<{ text?: string }>();

const applyRef = ref<{ $el: HTMLButtonElement } | null>(null);

onMounted(() => {
  if (applyRef.value) {
    applyRef.value.$el.focus();
  }
});
</script>

<template>
  <v-card>
    <v-card-title>Внимание!</v-card-title>

    <v-card-text>{{ text }}</v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn text plain class="mr-1" @click="$emit('close')"> Отмена </v-btn>
      <v-btn ref="applyRef" depressed color="primary" @click="$emit('apply')"> Подтвердить </v-btn>
    </v-card-actions>
  </v-card>
</template>
