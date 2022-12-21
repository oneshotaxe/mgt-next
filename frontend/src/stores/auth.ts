import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);

  const isAuthorized = ref(!!localStorage.getItem('IS_AUTHORIZED'));

  const login = (body: Credentials) =>
    axios
      .post('/api/v1/auth/login', body)
      .then(() => {
        localStorage.setItem('IS_AUTHORIZED', '1');
        isAuthorized.value = true;
        return fetchUser();
      })
      .catch(reset);

  const fetchUser = () => {
    if (isAuthorized.value) {
      return axios
        .get('/api/v1/user')
        .then((res) => {
          user.value = res.data;
        })
        .catch(reset);
    }
  };

  const logout = () => axios.post('/api/v1/auth/logout').finally(reset);

  const reset = () => {
    localStorage.removeItem('IS_AUTHORIZED');
    isAuthorized.value = false;
    user.value = null;
  };

  return {
    user,
    isAuthorized,
    login,
    fetchUser,
    logout,
  };
});

type User = {
  createdAt: string;
  updatedAt: string;
  nick: string;
  roles: string[];
  id: number;
};

type Credentials = {
  nick: string;
  password: string;
};
