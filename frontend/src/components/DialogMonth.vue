<script setup lang="ts">
import { injectAlert } from '@/composable';
import { onMounted, ref } from 'vue';

const emit = defineEmits(['apply']);

const alerts = injectAlert();

const applyRef = ref<{ $el: HTMLButtonElement } | null>(null);

const month = ref('');

const onApplyClick = () => {
  try {
    if (month.value.length !== 7) {
      return alerts.error('Неверный формат');
    }

    const [y, m] = month.value.split('-');

    if (
      y.length !== 4 ||
      m.length !== 2 ||
      isNaN(+y) ||
      isNaN(+m) ||
      +m > 12 ||
      +m < 1 ||
      +y > 3000 ||
      +y < 2000
    ) {
      return alerts.error('Неверный формат');
    }

    emit('apply', month.value);
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  if (applyRef.value) {
    applyRef.value.$el.focus();
  }
});
</script>

<template>
  <v-card>
    <v-card-title>Введите месяц в формате 2000-01</v-card-title>

    <v-card-text>
      <v-text-field v-model="month" />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn text plain class="mr-1" @click="$emit('close')"> Отмена </v-btn>
      <v-btn ref="applyRef" depressed color="primary" @click="onApplyClick"> Подтвердить </v-btn>
    </v-card-actions>
  </v-card>
</template>
