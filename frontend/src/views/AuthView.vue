<script setup lang="ts">
import { reactive, computed, onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { NAMES, ROUTES } from '@/router';

const router = useRouter();
const auth = useAuthStore();

const model = reactive({ nick: '', password: '' });

const needRoleSelection = computed(() => auth.user?.roles && auth.user.roles.length > 1);

const onSubmit = () => {
  return auth.login(model).then(() => {
    if (needRoleSelection.value) return;

    const route = roleToRoute(auth.user?.roles[0]);
    if (!route) return;
    return router.push(route);
  });
};

const hasRole = (role: string) => {
  return auth.user?.roles.includes(role);
};

const roleToRoute = (role?: string) => {
  switch (role) {
    case 'admin':
      return ROUTES[NAMES.ADMIN];
    case 'employee':
      return ROUTES[NAMES.EMPLOYEE];
    default:
      return undefined;
  }
};

onBeforeMount(() => {
  if (!auth.isAuthorized || needRoleSelection.value) return;
  const route = roleToRoute(auth.user?.roles[0]);
  if (!route) return;
  return router.push(route);
});
</script>

<template>
  <div class="auth-wrapper">
    <form @submit.prevent="onSubmit">
      <div class="auth">
        <div class="auth__title">Авторизация</div>

        <template v-if="auth.isAuthorized && needRoleSelection">
          <v-btn
            v-if="hasRole('admin')"
            :to="ROUTES[NAMES.ADMIN]"
            rounded
            dark
            block
            flat
            size="large"
            color="primary"
          >
            Войти как администратор
          </v-btn>
          <v-btn
            v-if="hasRole('employee')"
            :to="ROUTES[NAMES.EMPLOYEE]"
            rounded
            dark
            block
            flat
            size="large"
            color="primary"
          >
            Войти как сотрудник
          </v-btn>
        </template>

        <template v-else>
          <v-text-field v-model="model.nick" hide-details label="Логин" color="primary" />
          <v-text-field
            v-model="model.password"
            hide-details
            type="password"
            label="Пароль"
            color="primary"
          />

          <div class="auth__options">
            <v-checkbox hide-details label="Запомнить меня" color="primary" />
          </div>

          <div class="auth__action">
            <v-btn rounded dark block flat size="large" type="submit" color="primary">
              Войти
            </v-btn>
          </div>
        </template>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.auth {
  display: grid;
  gap: 32px;
  grid-template-columns: auto;
  width: 460px;
  padding: 60px;
  border-radius: 20px;
  background: #e2edfd;

  &-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    font-weight: 700;
    font-size: 36px;
    line-height: 42px;
    text-align: center;
    color: #302f30;
  }
}
</style>
