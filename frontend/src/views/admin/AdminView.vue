<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import { NAMES, ROUTES } from '@/router';

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const { logout } = useAuthStore();

const drawer = ref(true);
const menu = ref([
  { key: 'dashboard', to: ROUTES[NAMES.ADMIN_DASHBOARD], title: t('dashboard.title'), exact: true },
  { key: 'users', to: ROUTES[NAMES.ADMIN_USER_LIST], title: t('users.listTitle') },
  { key: 'columns', to: ROUTES[NAMES.ADMIN_COLUMN_LIST], title: t('columns.listTitle') },
]);

const onClickLogout = () => logout().then(() => router.push(ROUTES[NAMES.AUTH]));
</script>

<template>
  <v-app-bar app dark flat color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>MGT</v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn @click="onClickLogout">Выйти</v-btn>
    </v-toolbar-items>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app>
    <v-list nav>
      <v-list-item
        v-for="item in menu"
        :key="item.key"
        :to="item.to"
        :exact="item.exact"
        active-class="text-primary"
      >
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

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
