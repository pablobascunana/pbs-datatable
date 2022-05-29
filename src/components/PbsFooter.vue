<script setup lang="ts">
import { computed } from 'vue';

import { useTranslation } from '../composables/lang';

const props = defineProps({
  length: Number
});

const { t } = useTranslation();

const footerRowsMessage = computed(() =>
  `${t('table.footer.show')} ${props.length} 
  ${t('table.footer.of')} ${props.length} 
  ${t('table.footer.rows')}`
)

defineExpose({ footerRowsMessage });
</script>

<template>
  <div class="table__footer">
    <span id="tableFooterMessage">{{ footerRowsMessage }}</span>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/components/table.scss";
</style>