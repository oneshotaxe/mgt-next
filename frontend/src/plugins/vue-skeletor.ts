import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';
import type { App } from 'vue';

export default function (app: App) {
  app.component(Skeletor.name, Skeletor);
}
