import { createApp } from 'vue';

import App from '@/App.vue';
import router from '@/router';
import { pinia } from '@/stores';
import { vuetify } from '@/plugins/vuetify';
import skeletor from '@/plugins/vue-skeletor';
import i18n from '@/plugins/vue-i18n';
import '@/assets/global.scss';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(skeletor);
app.use(i18n);

app.mount('#app');
