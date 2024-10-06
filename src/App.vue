<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import tableData from '@/domain/resources/table.json';

import { PbsDatatable } from '@/components/';

const actionHandler = (params) => {
  console.log('Event: ' + params.action);
  console.log('Index of the event: ' + params.index);
}

// let isArrowNeutralValue = false;
// let iconClass = ref('table__header-arrow-up');

let observer = {};

onMounted(() => {
  tableData.header.forEach((head, index) => {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log('HEAD: ', head);
    observer[head.field] = new MutationObserver(isArrowNeutral(head[index]));
    observer[head.field].observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true
    });
  })
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
})

const isArrowNeutral = (header) => {
  console.log('OBSERVER: ', observer);
  return 'sort' in header && 'order' in header && header.order !== '' ? false : true;
};

const isArrowDown = (header) => {
  return header.order === 'desc';
}

// let iconClass = ref('table__header-arrow-up');
// let keyToSort;

// const dateReguex = /(([0-9]{4})[-/.]([0-9]{2})[-/.]([0-9]{2}))|([0-9]{2})[-/.]([0-9]{2})[-/.]([0-9]{4})/;

// const header = table.header.find((header) => header.sort && header.order !== '');

// const getDateFieldsInRow = (row) => {
//   let fields = [];
//   Object.keys(row).filter((key) => {
//     if (typeof row[key] === 'string' && row[key].match(dateReguex)) {
//       fields.push(key);
//     }
//   });
//   return fields;
// }

// const sortTable = (header) => {
//   const sortedHeader = changeSortOrderInHeaders(header);
//   sortHandler({ key: sortedHeader?.id, order: sortedHeader?.order, headers: tableData.headers.value });
// }

// const changeSortOrderInHeaders = (header) => {
//   tableData.headers.value.forEach((head) => {
//     header.id === head.id ? setOrderInColumnSorted(head): head.order = '';
//   })
//   return tableData.headers.value.find((head) => head.id === header.id);
// }

// const setOrderInColumnSorted = (header) => {
//   if (header.order === 'asc') {
//     header.order = 'desc';
//   } else {
//     header.order = header.order == 'desc' ? '' : 'asc'
//   }
// }

// const sortHandler = (params) => {
//   keyToSort = params.key;
//   tableData.header = params.headers;
//   tableData.rows.sort(orderAsc);
//   if (params.order !== 'asc') {
//     params.order === 'desc' ? tableData.rows.reverse() : tableData.rows;
//   }
// }

// function orderAsc(a, b) {
//   if (dateFields.includes(keyToSort) && table.options.dateFormat !== 'YYYY-MM-DD') {
//     const separator = table.options.dateFormat[2];
//     const aDate = getFormatDate(a[keyToSort].split(separator), separator);
//     const bDate = getFormatDate(b[keyToSort].split(separator), separator);
//     return doSort(aDate, bDate);
//   }
//   return doSort(a[keyToSort], b[keyToSort]);
// }

// const getFormatDate = (aDate, separator) => {
//   let year = aDate[2];
//   let month;
//   let day;
//   if (table.options.dateFormat.startsWith('DD')) {
//     day = aDate[0];
//     month = aDate[1];
//   } else {
//     day = aDate[1];
//     month = aDate[0];
//   }
//   return `${year}${separator}${month}${separator}${day}`;
// }

// const doSort = (a, b) => {
//   return a > b ? 1 : a == b ? 0 : -1;
// }

const sortTable = (colIndex, key) => {
  console.log(colIndex);
  console.log(key);
  // if (isArrowNeutral(tableData.header[colIndex])) {
  //   iconClass = 'table__header-arrow-right';
  // } else if (isArrowDown(tableData.header[colIndex])) {
  //   iconClass = 'table__header-arrow-down';
  // } else {
  //   iconClass = 'table__header-arrow-up';
  // }
}
</script>

<template>
  <div class="container">
    <pbs-datatable
      :table-data="tableData"
      @click-action="actionHandler"
    >
      <template #icon-sort="{ colIndex, key }">
        <img
          :id="`tableHeaderSort-${tableData.header[colIndex].id}`"
          :src="`/triangle-small-up.svg`"
          alt="sort-icon"
          :class="{ 'table__header-arrow-right': isArrowNeutral(tableData.header[colIndex]), 
                    'table__header-arrow-down': isArrowDown(tableData.header[colIndex])
          }"
          class="pointer"
          @click="sortTable(colIndex, key)"
        >
      </template>
    </pbs-datatable>
  </div>
</template>

<style scoped>
.arrow-up {
  transform: translate(0, .8rem);
}
.arrow-right {
  filter: invert(50%);
  transform: rotate(90deg) translate(0.8rem, 0);
}

.arrow-down {
  transform: rotate(180deg) translate(0, -.8rem);
}
</style>