<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

import { useWidth } from '../composables/columnsWidth';

defineProps({
  tableData: Object
});

const emit = defineEmits(['click-action', 'edit-start', 'edit-stop']);

const editableValue = ref([]);

const doAction = (action, index) => {
  emit('click-action', { action: action, index: index });
}

const editStart = (row, field) => {
  emit('edit-start', { row: row, field: field });
}

const editStop = (row, field, value) => {
  emit('edit-stop', { row: row, field: field, value: value.innerText });
}

defineExpose({ editableValue });
</script>

<template>
  <draggable
    :list="tableData.rows"
    :disabled="!tableData.options.draggableRows"
    :item-key="(key) => key"
    class="table__body"
    tag="tbody"
    :component-data="{ as: 'transition-group' }"
  >
    <template #item="{ element: row, index }">
      <tr>
        <td
          v-for="header in tableData.header"
          :id="`tableBodyEdit-${header.id}-${index}`"
          :key="header.id"
          class="table__body-row"
          :contenteditable="header.edit"
          :class="{ 'pointer': header.edit }"
          :style="`width:${useWidth(header)}`"
          @focus="editStart(row, header.field)"
          @blur="editStop(row, header.field, editableValue[`${header.id}-${index}`])"
        >
          <span
            v-if="header.field !== 'actions' && header.field !== 'draggable'"
            :id="`tableBodyText-${header.id}-${index}`"
            :ref="(element) => { editableValue[`${header.id}-${index}`] = element }"
          >
            {{ row[header.field] }}
          </span>
          <img
            v-for="icon, imgIndex in row[header.field]"
            v-else
            :id="`tableBodyActions-${icon}-${index}`"
            :key="imgIndex"
            :src="`${icon}.svg`"
            :alt="icon"
            :class="{ 'pointer': header.field === 'actions', 'move': header.field === 'draggable' }"
            @click="doAction(icon, index)"
          >
        </td>
      </tr>
    </template>
  </draggable>
</template>
