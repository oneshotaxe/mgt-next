import { ref, reactive, computed, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import api, { type Bus } from '@/api';
import type { ActionsBlockItem, DataBlockField, DataTableColumn } from '@/components';
import { injectAlert, injectDialog, useDataTable } from '@/composable';
import { NAMES, ROUTES } from '@/router';
import { formatDateTime } from '@/utils';

const useEditorModule = (columnId: ComputedRef<number>, id: ComputedRef<number>) => {
  const { t } = useI18n();
  const router = useRouter();
  const dialogs = injectDialog();
  const alerts = injectAlert();

  const listRoute = computed(() => ROUTES[NAMES.EMPLOYEE_BUS_LIST](columnId.value));
  const viewRoute = (id: number) => ROUTES[NAMES.EMPLOYEE_BUS_VIEW](columnId.value, id);
  const cancelRoute = computed(() => (id.value ? viewRoute(id.value) : listRoute.value));

  const loading = ref(false);
  const model = reactive<Bus>({
    columnId: columnId.value,
    gateId: undefined,
    num: '',
  });
  const rules = computed(() => ({
    columnId: { required },
    num: { required },
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
        ? api.buses._id.put(id.value, model).then(() => id.value)
        : api.buses._id.post(model);
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
    return api.buses._id
      .get(id.value)
      .then((row: Bus) => Object.assign(model, row))
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

const useListModule = (columnId: ComputedRef<number>) => {
  const { t } = useI18n();
  const router = useRouter();

  const creatorRoute = computed(() => ROUTES[NAMES.EMPLOYEE_BUS_CREATOR](columnId.value));
  const viewRoute = (id: number) => ROUTES[NAMES.EMPLOYEE_BUS_VIEW](columnId.value, id);

  const columns = ref<DataTableColumn[]>([
    {
      key: 'num',
      orderKey: 'num',
      title: t('fields.num'),
    },
    {
      key: 'gate',
      title: t('fields.gate'),
      format: (value) => `${value.route?.num} / ${value.num}`,
      to: (value) => ROUTES[NAMES.EMPLOYEE_GATE_VIEW](columnId.value, value.id),
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
    fetch: api.buses.get,
    additionalParams: () => ({ columnId: columnId.value }),
  });

  const actions = computed<ActionsBlockItem[]>(() => [
    {
      key: 'create',
      to: creatorRoute.value,
      text: t('actions.create'),
      type: 'PRIMARY',
      prependIcon: 'mdi-plus',
    },
    {
      key: 'toColumn',
      to: ROUTES[NAMES.EMPLOYEE_COLUMN_VIEW](columnId.value),
      text: t('actions.toColumn'),
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

const useViewModule = (columnId: ComputedRef<number>, id: ComputedRef<number>) => {
  const { t } = useI18n();
  const router = useRouter();
  const dialogs = injectDialog();
  const alerts = injectAlert();

  const editorRoute = computed(() => ROUTES[NAMES.EMPLOYEE_BUS_EDITOR](columnId.value, id.value));
  const listRoute = computed(() => ROUTES[NAMES.EMPLOYEE_BUS_LIST](columnId.value));

  const loading = ref(false);
  const model = reactive<Bus>({ columnId: columnId.value, gateId: undefined, num: '' });

  const fields = ref<DataBlockField[]>([
    {
      key: 'num',
      title: t('fields.num'),
    },
    {
      key: 'gate',
      title: t('fields.gate'),
      format: (value) => `${value.route?.num} / ${value.num}`,
      to: (value) => ROUTES[NAMES.EMPLOYEE_GATE_VIEW](columnId.value, value.id),
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
      return api.buses._id
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
    return api.buses._id
      .get(id.value)
      .then((row: Bus) => Object.assign(model, row))
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
