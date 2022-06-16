/// <reference types="vite" />
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '../src/i18n';
import PbsTable from '../src/components/PbsTable.vue';

import tableDate from './mocks/tableDateFormat.json';

const wrapper = mount(PbsTable, {
  global: {
    plugins: [i18n]
  },
  props: {
    tableData: tableDate
  },
})

describe('Test date format in datatable', () => {

  it('Check date format test', () => {
    expect(wrapper.vm.finalTable.options.dateFormat).toBe('DD-MM-YYYY');
    wrapper.find(`#tableHeaderSort-${wrapper.vm.finalTable.header[4].id}`).trigger('click');
  })
})
