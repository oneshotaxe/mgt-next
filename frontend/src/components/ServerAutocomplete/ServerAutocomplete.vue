<script setup lang="ts">
import { ref, computed } from 'vue';
import get from 'lodash/get';
import debounce from 'lodash/debounce';

const props = withDefaults(defineProps<Props>(), {
  itemValue: 'id',
  itemTitle: 'name',
});
const emit = defineEmits(['update:model-value-id', 'update:model-value', 'update:loading']);

const loading = ref(false);
const search = ref('');
const offset = ref(0);
const limit = ref(10);
const isLast = ref(false);
const items = ref<unknown[]>([]);

const onModelValueUpdate = (value: unknown) => {
  emit('update:model-value', value);
  if (value) {
    emit('update:model-value-id', get(value, props.itemValue));
  } else {
    emit('update:model-value-id', null);
  }
};

const onClickClear = () => {
  onModelValueUpdate(null);
};

const makeSearch = async (searchValue: string) => {
  if (searchValue === get(props.modelValue, props.itemTitle)) return;
  loading.value = true;

  const data = await props.fetch({ limit: limit.value, offset: offset.value, search: searchValue });
  if (data.total <= offset.value + limit.value) {
    isLast.value;
  }
  const rows = props.filter ? data.rows.filter(props.filter) : data.rows;
  items.value = props.mapper ? rows.map(props.mapper) : rows;

  loading.value = false;
};

const makeScroll = async () => {
  if (isLast.value) {
    return;
  }

  offset.value += limit.value;
  loading.value = true;

  const data = await props.fetch({
    limit: limit.value,
    offset: offset.value,
    search: search.value,
  });
  if (data.total <= offset.value + limit.value) {
    isLast.value;
  }
  items.value = items.value.concat(data.rows);

  loading.value = false;
};

const debouncedSearch = debounce(makeSearch, 200);

const onSearchInput = (searchValue: string) => {
  items.value = [];
  isLast.value = false;
  offset.value = 0;
  search.value = searchValue;
  if (!search.value) return;
  if (loading.value) return;

  debouncedSearch(search.value);
};

type Props = {
  modelValue?: unknown;
  modelValueId?: unknown;
  itemValue?: string;
  itemTitle?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: boolean;
  errorMessages?: string[];
  fetch: (params: {
    limit: number;
    offset: number;
    search: string;
  }) => Promise<{ total: number; rows: unknown[] }>;
  filter?: (item: any) => boolean;
  mapper?: (item: any) => any;
};
</script>

<template>
  <v-autocomplete
    :model-value="modelValue"
    :items="items"
    :loading="loading"
    :search-input="search"
    :placeholder="placeholder"
    :item-title="itemTitle"
    :item-value="itemValue"
    :label="label"
    :disabled="disabled"
    :error="error"
    :error-messages="errorMessages"
    clearable
    return-object
    hide-no-data
    no-filter
    @update:model-value="onModelValueUpdate"
    @update:search="onSearchInput"
    @click:clear="onClickClear"
  />
</template>
