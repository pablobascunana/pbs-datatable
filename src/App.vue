<script setup>
import tableData from './domain/resources/table.json';
import PbsDatatable from './components/PbsTable.vue';

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

<style lang="scss">
@import "./assets/scss/style.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.75rem;
}
</style>