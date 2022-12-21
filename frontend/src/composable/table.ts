import { ref, reactive, watch, type Ref } from 'vue';

const useDataTable = <T>(options: Options<T>) => {
  const loading = ref(false);
  const search = ref('');
  const rows: Ref<T[]> = ref([]);
  const total = ref(0);
  const page = ref(options.page);
  const pageSize = ref(options.pageSize);
  const order = ref(options.order);

  const fetch = () => {
    loading.value = true;
    const additionalParams = options.additionalParams?.() ?? {};
    return options
      .fetch({
        limit: pageSize.value,
        offset: (page.value - 1) * pageSize.value,
        search: search.value,
        order: order.value,
        ...additionalParams,
      })
      .then((data) => {
        rows.value = data.rows;
        total.value = data.total;
      })
      .finally(() => (loading.value = false));
  };

  watch([page, pageSize, order, search], fetch);

  return reactive({
    loading,
    search,
    rows,
    total,
    page,
    pageSize,
    order,
    fetch,
  });
};

type Options<T> = {
  order: string;
  page: number;
  pageSize: number;
  fetch: (options: FetchOptions) => Promise<FetchReturn<T>>;
  additionalParams?: () => Record<string, any>;
};

type FetchOptions = {
  limit: number;
  offset: number;
  search?: string;
  order?: string;
  [key: string]: any;
};

type FetchReturn<T> = {
  rows: T[];
  total: number;
};

export { useDataTable };
