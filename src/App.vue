<script setup>
import tableData from '@/domain/resources/table.json';

import { PbsDatatable } from '@/components/';

const actionHandler = (params) => {
  console.log('Event: ' + params.action);
  console.log('Index of the event: ' + params.index);
}
</script>

<template>
  <div class="container">
    <pbs-datatable
      :table-data="tableData"
      @click-action="actionHandler"
    ></pbs-datatable>
  </div>
</template>
