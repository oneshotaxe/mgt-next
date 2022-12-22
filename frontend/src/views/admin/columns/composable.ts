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
  const { t } = useI18n();
  const router = useRouter();
  const dialogs = injectDialog();
  const alerts = injectAlert();

  const listRoute = computed(() => ROUTES[NAMES.ADMIN_COLUMN_LIST]);
  const viewRoute = (id: number) => ROUTES[NAMES.ADMIN_COLUMN_VIEW](id);
  const cancelRoute = computed(() => (id.value ? viewRoute(id.value) : listRoute.value));

  const loading = ref(false);
  const model = reactive<Column>({
    userId: undefined,
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
      const promise = id.value
        ? api.columns._id.put(id.value, model).then(() => id.value)
        : api.columns._id.post(model);
      return promise
        .then((id) => {
          alerts.success(t('alerts.saveSuccess'));
          return router.push(viewRoute(id));
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

  const creatorRoute = computed(() => ROUTES[NAMES.ADMIN_COLUMN_CREATOR]);
  const viewRoute = (id: number) => ROUTES[NAMES.ADMIN_COLUMN_VIEW](id);

  const columns = ref<DataTableColumn[]>([
    {
      key: 'user',
      title: t('fields.user'),
      format: (value) => value.nick,
      to: (value) => ROUTES[NAMES.ADMIN_COLUMN_VIEW](value.id),
    },
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
  });

  const actions = computed<ActionsBlockItem[]>(() => [
    {
      key: 'create',
      to: creatorRoute.value,
      text: t('actions.create'),
      type: 'PRIMARY',
      prependIcon: 'mdi-plus',
    },
  ]);

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
  const { t } = useI18n();
  const router = useRouter();
  const dialogs = injectDialog();
  const alerts = injectAlert();

  const editorRoute = computed(() => ROUTES[NAMES.ADMIN_COLUMN_EDITOR](id.value));
  const listRoute = computed(() => ROUTES[NAMES.ADMIN_COLUMN_LIST]);

  const loading = ref(false);
  const model = reactive<Column>({ userId: undefined, title: '' });

  const fields = ref<DataBlockField[]>([
    {
      key: 'user',
      title: t('fields.user'),
      format: (value) => value.nick,
      to: (value) => ROUTES[NAMES.ADMIN_COLUMN_VIEW](value.id),
    },
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
        key: 'remove',
        text: t('actions.remove'),
        click: remove,
        type: 'ERROR',
        loading: loading.value,
      },
      {
        key: 'cancel',
        text: t('actions.toList'),
        to: listRoute.value,
      },
    ];
  });

  const remove = () => {
    return dialogs.confirm(t('dialogs.removeConfirm'), () => {
      loading.value = true;
      return api.columns._id
        .delete(id.value)
        .then(() => {
          alerts.success(t('alerts.removeSuccess'));
          return router.push(listRoute.value);
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
    fields,
    actions,
    fetch,
  };
};

export { useEditorModule, useListModule, useViewModule };
