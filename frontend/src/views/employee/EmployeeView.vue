<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { NAMES, ROUTES } from '@/router';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const onClickLogout = () => auth.logout().then(() => router.push(ROUTES[NAMES.AUTH]));
</script>

<template>
  <v-app-bar app dark flat color="primary">
    <v-toolbar-title>MGT</v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn @click="onClickLogout">Выйти</v-btn>
    </v-toolbar-items>
  </v-app-bar>

  <v-main>
    <v-container>
      <router-view v-slot="{ Component }">
        <v-slide-y-reverse-transition mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </v-slide-y-reverse-transition>
      </router-view>
    </v-container>
  </v-main>
</template>
