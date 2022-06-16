<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

import { useWidth } from '../composables/columnsWidth';

const props = defineProps({
  tableData: Object
})

let headers = ref(props.tableData.header);

const emit = defineEmits(['click-sort', 'drag-column-end'])

const isArrowNeutral = (header) => {
  return 'sort' in header && 'order' in header && header.order !== '' ? false : true;
}

const isArrowDown = (header) => {
  return header.order === 'desc';
}

const sortTable = (header) => {
  const sortedHeader = changeSortOrderInHeaders(header);
  emit('click-sort', { key: sortedHeader?.id, order: sortedHeader?.order, headers: headers.value });
}

const changeSortOrderInHeaders = (header) => {
  headers.value.forEach((head) => {
    header.id === head.id ? setOrderInColumnSorted(head): head.order = '';
  })
  return headers.value.find((head) => head.id === header.id);
}

const setOrderInColumnSorted = (header) => {
  if (header.order === 'asc') {
    header.order = 'desc';
  } else {
    header.order = header.order == 'desc' ? '' : 'asc'
  }
}

const dragColumnEnd = () => {
  emit('drag-column-end', headers);
}

defineExpose({ headers, dragColumnEnd });
</script>

<template>
  <thead class="table__header">
    <draggable
      :list="tableData.header"
      :disabled="!tableData.options.draggableColumns"
      :item-key="(key) => key"
      tag="tr"
      :component-data="{ as: 'transition-group' }"
      @end="dragColumnEnd"
    >
      <template #item="{ element: header }">
        <th
          :id="`columnDraggable-${header.id}`"
          class="table__header-row"
          :class="{ 'pinned': header.field === 'draggable' || header.field === 'actions' }"
          :style="`width:${useWidth(header)}`"
          scope="col"
        >
          <span
            :id="`tableHeaderRowTitle-${header.id}`"
            :class="{ 'move': tableData.options.draggableColumns && 
                      (header.field !== 'draggable' && header.field !== 'actions') }"
          >
            {{ header.name }}
          </span>
          <img
            v-if="'sort' in header && header.sort"
            :id="`tableHeaderSort-${header.id}`"
            :src="`/triangle-small-up.svg`"
            alt="sort-icon"
            :class="{ 'table__header-arrow-right': isArrowNeutral(header), 
                      'table__header-arrow-down': isArrowDown(header)
                    }"
            class="table__header-arrow-up pointer"
            @click="sortTable(header)"
          >
        </th>
      </template>
    </draggable>
  </thead>
</template>
