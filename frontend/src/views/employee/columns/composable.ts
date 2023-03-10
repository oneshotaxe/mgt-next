import { ref, reactive, computed, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import api, { type Column } from '@/api';
import type { ActionsBlockItem, DataBlockField, DataTableColumn } from '@/components';
import { injectAlert, injectDialog, useDataTable } from '@/composable';
import { NAMES, ROUTES } from '@/router';
import { formatDateTime } from '@/utils';
import { useAuthStore } from '@/stores/auth';

const useEditorModule = (id: ComputedRef<number>) => {
  const auth = useAuthStore();
  const { t } = useI18n();
  const router = useRouter();
  const dialogs = injectDialog();
  const alerts = injectAlert();

  const viewRoute = (id: number) => ROUTES[NAMES.EMPLOYEE_COLUMN_VIEW](id);
  const cancelRoute = computed(() => viewRoute(id.value));

  const loading = ref(false);
  const model = reactive<Column>({
    userId: auth.user?.id,
    title: '',
  });
  const rules = computed(() => ({
    userId: { required },
    title: { required },
  }));

  const v$ = useVuelidate(rules, model);

  const actions = computed<ActionsBlockItem[]>(() => {
    return [
      {
        key: 'save',
        text: t('actions.save'),
        buttonType: 'submit',
        type: 'PRIMARY',
        loading: loading.value,
      },
      {
        key: 'cancel',
        text: t('actions.cancel'),
        to: cancelRoute.value,
      },
    ];
  });

  const save = async () => {
    if (!(await v$.value.$validate())) {
      return;
    }
    return dialogs.confirm(t('dialogs.saveConfirm'), () => {
      loading.value = true;
      return api.columns._id
        .put(id.value, model)
        .then(() => {
          alerts.success(t('alerts.saveSuccess'));
          return router.push(viewRoute(id.value));
        })
        .finally(() => {
          loading.value = false;
        });
    });
  };

  const fetch = () => {
    loading.value = true;
    return api.columns._id
      .get(id.value)
      .then((row: Column) => Object.assign(model, row))
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    model,
    v$,
    actions,
    save,
    fetch,
  };
};

const useListModule = () => {
  const auth = useAuthStore();
  const { t } = useI18n();
  const router = useRouter();

  const viewRoute = (id: number) => ROUTES[NAMES.EMPLOYEE_COLUMN_VIEW](id);

  const columns = ref<DataTableColumn[]>([
    {
      key: 'title',
      orderKey: 'title',
      title: t('fields.title'),
    },
    {
      key: 'createdAt',
      orderKey: 'created_at',
      title: t('fields.createdAt'),
      format: formatDateTime,
    },
    {
      key: 'updatedAt',
      title: t('fields.updatedAt'),
      format: formatDateTime,
    },
  ]);

  const table = useDataTable({
    order: 'created_at desc',
    page: 1,
    pageSize: 10,
    fetch: api.columns.get,
    additionalParams: () => ({ userId: auth.user?.id }),
  });

  const actions = computed<ActionsBlockItem[]>(() => []);

  const onRowClick = (id: number) => {
    return router.push(viewRoute(id));
  };

  return {
    columns,
    table,
    actions,
    onRowClick,
  };
};

const useViewModule = (id: ComputedRef<number>) => {
  const auth = useAuthStore();
  const { t } = useI18n();

  const editorRoute = computed(() => ROUTES[NAMES.EMPLOYEE_COLUMN_EDITOR](id.value));
  const listRoute = computed(() => ROUTES[NAMES.EMPLOYEE_COLUMN_LIST]);

  const loading = ref(false);
  const model = reactive<Column>({ userId: auth.user?.id, title: '' });

  const fields = ref<DataBlockField[]>([
    {
      key: 'title',
      title: t('fields.title'),
    },
    {
      key: 'createdAt',
      title: t('fields.createdAt'),
      format: formatDateTime,
    },
    {
      key: 'updatedAt',
      title: t('fields.updatedAt'),
      format: formatDateTime,
    },
  ]);

  const actions = computed<ActionsBlockItem[]>(() => {
    return [
      {
        key: 'edit',
        text: t('actions.edit'),
        to: editorRoute.value,
        type: 'PRIMARY',
      },
      {
        key: 'cancel',
        text: t('actions.toList'),
        to: listRoute.value,
      },
    ];
  });

  const fetch = () => {
    loading.value = true;
    return api.columns._id
      .get(id.value)
      .then((row: Column) => Object.assign(model, row))
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    model,
    fields,
    actions,
    fetch,
  };
};

export { useEditorModule, useListModule, useViewModule };
