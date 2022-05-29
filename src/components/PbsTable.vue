<script setup lang="ts">
import { ref } from 'vue';
import { usePropertiesByDefault } from '@/composables/checkAddPropertiesByDefault';

const props = defineProps({
  tableData: Object
});

const emit = defineEmits(['click-action', 'edit-start', 'edit-stop']);

const actionHandler = (params) => {
  emit('click-action', params);
}

const editStartHandler = (params) => {
  emit('edit-start', params);
}

const editStopHandler = (params) => {
  emit('edit-stop', params);
}

const dragColumnEndHandler = (header) => {
  finalTable.value.header = header;
}

const table = usePropertiesByDefault({...props.tableData});
let finalTable = ref(JSON.parse(JSON.stringify(table)));
let keyToSort;

const dateReguex = /(([0-9]{4})[-/.]([0-9]{2})[-/.]([0-9]{2}))|([0-9]{2})[-/.]([0-9]{2})[-/.]([0-9]{4})/;

const header = table.header.find((header) => header.sort && header.order !== '');

const getDateFieldsInRow = (row) => {
  let fields = []
  Object.keys(row).filter((key) => {
    if (typeof row[key] === 'string' && row[key].match(dateReguex)) {
      fields.push(key);
    }
  });
  return fields;
}

const sortHandler = (params) => {
  keyToSort = params.key;
  finalTable.value.header = params.headers;
  finalTable.value.rows.sort(orderAsc);
  if (params.order !== 'asc') {
    params.order === 'desc' ? finalTable.value.rows.reverse() : finalTable.value.rows = [...table.rows];
  }
}

const doSort = (a, b) => {
  return a > b ? 1 : a == b ? 0 : -1;
}

const getFormatDate = (aDate, separator) => {
  let year = aDate[2];
  let month;
  let day;
  if (table.options.dateFormat.startsWith('DD')) {
    day = aDate[0];
    month = aDate[1];
  } else {
    day = aDate[1];
    month = aDate[0];
  }
  return `${year}${separator}${month}${separator}${day}`;
}

function orderAsc(a, b) {
  if (dateFields.includes(keyToSort) && table.options.dateFormat !== 'YYYY-MM-DD') {
    const separator = table.options.dateFormat[2];
    const aDate = getFormatDate(a[keyToSort].split(separator), separator);
    const bDate = getFormatDate(b[keyToSort].split(separator), separator);
    return doSort(aDate, bDate);
  }
  return doSort(a[keyToSort], b[keyToSort]);
}

const dateFields = getDateFieldsInRow(props.tableData.rows[0]);
if (header) {
  sortHandler({ key: header.id, order: header.order, headers: table.header });
}
defineExpose({ finalTable });
</script>

<template>
  <table class="table">
    <pbs-header
      :table-data="finalTable"
      @click-sort="sortHandler"
      @drag-column-end="dragColumnEndHandler">
    </pbs-header>
    <pbs-body
      :table-data="finalTable"
      @click-action="actionHandler"
      @edit-start="editStartHandler"
      @edit-stop="editStopHandler"
    ></pbs-body>
  </table>
  <pbs-footer
    :length="finalTable.rows.length"
  ></pbs-footer>
</template>

<style scoped lang="scss">
@import "../assets/scss/components/table.scss";
</style>
