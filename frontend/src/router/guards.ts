import type { NavigationGuard } from 'vue-router';
import { pinia } from '@/stores';
import { useAuthStore } from '@/stores/auth';

const forNotAuthorized: NavigationGuard = (to, from, next) => {
  const auth = useAuthStore(pinia);
  if (auth.isAuthorized) {
    return next({ name: 'admin' });
  }
  next();
};
const forAuthorized: NavigationGuard = (to, from, next) => {
  const auth = useAuthStore(pinia);
  if (!auth.isAuthorized) {
    return next({ name: 'auth' });
  }
  next();
};
const beforeEach: NavigationGuard = async (to, from, next) => {
  const auth = useAuthStore(pinia);
  if (!auth.user) {
    await auth.fetchUser();
  }
  next();
};

export { forAuthorized, forNotAuthorized, beforeEach };
