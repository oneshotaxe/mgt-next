import { ref, reactive, computed, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import api, { type PublicUser, type UserDto } from '@/api';
import type { ActionsBlockItem, DataBlockField, DataTableColumn } from '@/components';
import { injectAlert, injectDialog, useDataTable } from '@/composable';
import { NAMES, ROUTES } from '@/router';
import { formatDateTime } from '@/utils';

const useEditorModule = (id: ComputedRef<number>) => {
  const { t } = useI18n();
  const router = useRouter();
  const dialogs = injectDialog();
  const alerts = injectAlert();

  const listRoute = computed(() => ROUTES[NAMES.ADMIN_USER_LIST]);
  const viewRoute = (id: number) => ROUTES[NAMES.ADMIN_USER_VIEW](id);
  const cancelRoute = computed(() => (id.value ? viewRoute(id.value) : listRoute.value));

  const roles = ref(['admin', 'employee']);
  const showPasswordField = computed(() => !id.value);
  const loading = ref(false);
  const model = reactive<UserDto>({
    nick: '',
    password: undefined,
    roles: [],
  });
  const passwordRules = computed(() =>
    showPasswordField.value ? { required, minLength: minLength(8) } : {}
  );
  const rules = computed(() => ({
    nick: { required },
    password: passwordRules.value,
    roles: { required },
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
        ? api.users._id.put(id.value, model).then(() => id.value)
        : api.users._id.post(model);
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
    return api.users._id
      .get(id.value)
      .then((row: PublicUser) => Object.assign(model, row))
      .finally(() => (loading.value = false));
  };

  return {
    roles,
    showPasswordField,
    loading,
    model,
    v$,
    actions,
    save,
    fetch,
  };
};

const useListModule = () => {
  const { t } = useI18n();
  const router = useRouter();

  const creatorRoute = computed(() => ROUTES[NAMES.ADMIN_USER_CREATOR]);
  const viewRoute = (id: number) => ROUTES[NAMES.ADMIN_USER_VIEW](id);

  const columns = ref<DataTableColumn[]>([
    {
      key: 'id',
      title: t('fields.id'),
    },
    {
      key: 'nick',
      title: t('fields.nick'),
    },
    {
      key: 'roles',
      title: t('fields.roles'),
      format: (roles) => roles.join(', '),
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

  const table = useDataTable({
    order: 'created_at desc',
    page: 1,
    pageSize: 10,
    fetch: api.users.get,
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

  const editorRoute = computed(() => ROUTES[NAMES.ADMIN_USER_EDITOR](id.value));
  const listRoute = computed(() => ROUTES[NAMES.ADMIN_USER_LIST]);

  const loading = ref(false);
  const model = reactive<PublicUser>({ nick: '', roles: [] });

  const fields = ref<DataBlockField[]>([
    {
      key: 'id',
      title: t('fields.id'),
    },
    {
      key: 'nick',
      title: t('fields.nick'),
    },
    {
      key: 'roles',
      title: t('fields.roles'),
      format: (roles) => roles.join(', '),
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
      return api.users._id
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
    return api.users._id
      .get(id.value)
      .then((row: PublicUser) => Object.assign(model, row))
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
