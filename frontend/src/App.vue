<script setup lang="ts">
import { provideDialog } from '@/composable/dialog';
import { provideAlert } from '@/composable/alert';

const dialogs = provideDialog();
const alerts = provideAlert();
</script>

<template>
  <v-app id="inspire">
    <router-view />

    <v-dialog
      v-if="dialogs.dialog"
      :model-value="!!dialogs.dialog"
      :width="dialogs.dialog.width"
      @input="!$event && dialogs.close()"
    >
      <component
        :is="dialogs.dialog.component"
        v-bind="dialogs.dialog.attrs"
        v-on="(dialogs.dialog && dialogs.dialog.on) || {}"
        @apply="dialogs.apply"
        @close="dialogs.close"
      />
    </v-dialog>

    <div class="alerts">
      <v-slide-y-transition group>
        <v-alert v-for="alert in alerts.alerts" :key="alert.id" dense :type="alert.type">
          {{ alert.text }}
        </v-alert>
      </v-slide-y-transition>
    </div>
  </v-app>
</template>

<style lang="scss">
.alerts {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  user-select: none;
  pointer-events: none;
  z-index: 9999;

  & > * {
    pointer-events: all;
  }
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
}
</style>
