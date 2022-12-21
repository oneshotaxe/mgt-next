<script setup lang="ts">
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import cloneDeep from 'lodash/cloneDeep';
import type { Graphic } from '@/api';
import graphics from '@/assets/graphics.json';

dayjs.locale('ru');
dayjs.extend(weekOfYear);

const props = defineProps<Props>();
const emit = defineEmits(['update:model-value']);

const month = ref(dayjs().date(1));
const weekShift = computed(() => (month.value.day() + 6) % 7);

const statuses = computed(() => {
  if (!props.modelValue) return [];
  return statusesByDate(
    props.modelValue,
    month.value.format('YYYY-MM-DD'),
    month.value.daysInMonth()
  );
});

const prevMonth = () => {
  month.value = month.value.subtract(1, 'month');
};

const nextMonth = () => {
  month.value = month.value.add(1, 'month');
};

const onSelectUpdate = (value: Graphic) => {
  const newValue = {
    ...value,
    items: value.format.split(''),
  };
  emit('update:model-value', newValue);
};

const onItemClick = (index: number) => {
  if (!props.modelValue) return;
  emit('update:model-value', rollItem(props.modelValue, index));
};

const onAppendClick = () => {
  if (!props.modelValue) return;
  emit('update:model-value', appendItems(props.modelValue));
};

const onRemoveClick = () => {
  if (!props.modelValue) return;
  emit('update:model-value', removeItems(props.modelValue));
};

function appendItems(graphic: Graphic) {
  const newGraphic = cloneDeep(graphic);
  newGraphic.items = newGraphic.items.concat(graphic.format.split(''));
  return newGraphic;
}

function removeItems(graphic: Graphic) {
  const newGraphic = cloneDeep(graphic);
  newGraphic.items = newGraphic.items.slice(0, -graphic.format.length);
  return newGraphic;
}

const workStatuses = ['Р', '1', '2'];

function rollItem(graphic: Graphic, index: number) {
  const newGraphic = cloneDeep(graphic);
  const curStatus = newGraphic.items[index];
  const nextStatus = _nextItemInArr(curStatus, workStatuses);
  newGraphic.items[index] = nextStatus;
  return newGraphic;
}

function _nextItemInArr<T>(curItem: T, arr: T[]) {
  const curIndex = arr.findIndex((val) => val == curItem);
  const nextIndex = (curIndex + 1) % arr.length;
  return arr[nextIndex];
}

function statusesByDate(graphic: Graphic, date: string, count = 1) {
  const statuses = [];
  const startDate = dayjs(graphic.date);
  const items = graphic.items;

  let curDate = dayjs(date);
  for (let i = 0; i < count; i++) {
    const diff = curDate.diff(startDate, 'days');
    const itemIndex = ((diff % items.length) + items.length) % items.length;

    const status = items[itemIndex];

    statuses.push({
      date: curDate.format('YYYY-MM-DD'),
      value: status,
    });

    curDate = curDate.add(1, 'days');
  }

  return statuses;
}

type Props = {
  modelValue?: Graphic;
  label?: string;
};
</script>

<template>
  <div>
    <v-autocomplete
      :model-value="modelValue"
      :items="graphics"
      :menu-props="{ maxHeight: '300px' }"
      :label="label"
      return-object
      hide-details
      item-value="name"
      item-title="name"
      @update:model-value="onSelectUpdate"
    />

    <div v-if="modelValue" class="ge-statuses">
      <div
        v-for="(item, i) in modelValue.items"
        class="ge-statuses__item"
        :class="{
          'ge-statuses__item--clickable': item !== 'В',
          'ge-statuses__item--disabled': item === 'В',
        }"
        @click="item !== 'В' && onItemClick(i)"
      >
        {{ item }}
      </div>
      <div
        v-if="modelValue.format.length < modelValue.items.length"
        class="ge-statuses__item ge-statuses__item--clickable"
        @click="onRemoveClick"
      >
        -
      </div>
      <div class="ge-statuses__item ge-statuses__item--clickable" @click="onAppendClick">+</div>
    </div>

    <div v-if="modelValue" class="ge-calendar">
      <div class="ge-calendar__header">
        <div class="ge-calendar__prev">
          <v-btn rounded icon flat size="small" @click="prevMonth">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </div>
        <div class="ge-calendar__title">{{ month.format('MMM YYYY') }}</div>
        <div class="ge-calendar__next">
          <v-btn rounded icon flat size="small" @click="nextMonth">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="ge-calendar__body">
        <div v-for="_ in weekShift" class="ge-calendar__day" />
        <div v-for="status in statuses" class="ge-calendar__day">
          <div class="ge-calendar__day-index">
            {{ dayjs(status.date).date() }}
          </div>
          <div class="ge-calendar__day-value">
            {{ status.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ge-statuses {
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% / 7);
    height: 32px;
    border-radius: 4px;
    user-select: none;
    font-size: 1.1em;

    &--clickable {
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    &--disabled {
      opacity: 0.5;
    }
  }
}
.ge-calendar {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    font-size: 1.4em;
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
  }

  &__day {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% / 7);
    height: 56px;
    border-radius: 4px;
    user-select: none;

    &--clickable {
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    &-index {
      position: absolute;
      top: 4px;
      right: 6px;
      font-size: 0.9em;
    }

    &-value {
      font-size: 1.1em;
    }
  }
}
</style>
