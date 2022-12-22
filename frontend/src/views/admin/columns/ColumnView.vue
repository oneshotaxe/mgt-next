<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import FileSaver from 'file-saver';
import api from '@/api';
import { ActionsBlock, DataBlock } from '@/components';
import { ROUTES, NAMES } from '@/router';
import { buildAgreement, buildMagazine, buildMagazineMini, buildMagazineNew } from '@/excels';
import { injectDialog } from '@/composable';
import { useViewModule } from './composable';
import DialogFile from '@/components/DialogFile.vue';
import DialogMonth from '@/components/DialogMonth.vue';

const { t } = useI18n();

const dialogs = injectDialog();
const route = useRoute();
const id = computed(() => +route.params.id);

const { loading, model, fields, actions, fetch } = useViewModule(id);

const selectFile = () => {
  dialogs.open({
    width: 450,
    component: DialogFile,
    onApply: async (files: File[]) => {
      if (!files || files.length === 0) return;

      const file = files[0];
      return api.columns._id.upload(id.value, JSON.parse(await file.text()));
    },
  });
};

const downloadJournal = async () => {
  dialogs.open({
    width: 450,
    component: DialogMonth,
    onApply: async (month) => {
      const pages = await api.columns._id.journal(id.value, month);
      const buf = await buildMagazine(pages);
      await FileSaver.saveAs(new Blob([buf]), 'magazine.xlsx');
    },
  });
};

const downloadJournalMini = async () => {
  dialogs.open({
    width: 450,
    component: DialogMonth,
    onApply: async (month) => {
      const pages = await api.columns._id.journal(id.value, month);
      const buf = await buildMagazineMini(pages);
      await FileSaver.saveAs(new Blob([buf]), 'magazine mini.xlsx');
    },
  });
};

const downloadJournalNew = async () => {
  dialogs.open({
    width: 450,
    component: DialogMonth,
    onApply: async (month) => {
      const pages = await api.columns._id.journal(id.value, month);
      const buf = await buildMagazineNew(pages);
      await FileSaver.saveAs(new Blob([buf]), 'magazine new.xlsx');
    },
  });
};

const downloadAgreement = async () => {
  dialogs.open({
    width: 450,
    component: DialogMonth,
    onApply: async (month) => {
      const resDrivers = await api.columns._id.agreement(id.value);
      const resTemplate = await axios.get('/agree.xlsx', { responseType: 'arraybuffer' });
      const buf = await buildAgreement(resTemplate.data, resDrivers, month);
      await FileSaver.saveAs(new Blob([buf]), 'agreement.xlsx');
    },
  });
};

onMounted(() => {
  if (id.value) {
    fetch();
  }
});
</script>

<template>
  <div>
    <h1>{{ t('columns.viewTitle') }}</h1>

    <data-block :fields="fields" :model="model" :loading="loading" />

    <actions-block :actions="actions" class="pt-8" />

    <v-row class="pt-8">
      <v-col cols="12" md="4">
        <h2>Данные</h2>

        <v-list>
          <v-list-item :to="ROUTES[NAMES.EMPLOYEE_DRIVER_LIST](id)">Водители</v-list-item>
          <v-list-item :to="ROUTES[NAMES.EMPLOYEE_BUS_LIST](id)">Автобусы</v-list-item>
          <v-list-item :to="ROUTES[NAMES.EMPLOYEE_ROUTE_LIST](id)">Маршруты</v-list-item>
          <v-list-item :to="ROUTES[NAMES.EMPLOYEE_GATE_LIST](id)">Выходы</v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="4">
        <h2>Выгрузки</h2>

        <v-list>
          <v-list-item @click="downloadJournal">Журнал</v-list-item>
          <v-list-item @click="downloadJournalMini">Журнал мини</v-list-item>
          <v-list-item @click="downloadJournalNew">Новый журнал</v-list-item>
          <v-list-item @click="downloadAgreement">Согласие</v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="4">
        <h2>Резервное копирование</h2>

        <v-list>
          <v-list-item @click="selectFile">Загрузить</v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>
