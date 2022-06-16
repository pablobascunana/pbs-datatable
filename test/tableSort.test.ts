/// <reference types="vite" />
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '../src/i18n';
import PbsTable from '../src/components/PbsTable.vue';

import tableSort from './mocks/tableSort.json';
import tableSortBadConfigure from './mocks/tableSortBadConfigure.json';

const wrapper = mount(PbsTable, {
  global: {
    plugins: [i18n]
  },
  props: {
    tableData: tableSort
  },
})

const wrapperBadConfigured = mount(PbsTable, {
  global: {
    plugins: [i18n]
  },
  props: {
    tableData: tableSortBadConfigure
  },
})


describe('Test sort in datatable', () => {

  it('Check header sort icon', () => {
    wrapper.vm.finalTable.header.forEach((header) => {
      checkSortIconProperties(header);
    })
  })

  it('Click in each sort icon in a header', () => {
    wrapper.vm.finalTable.header.forEach((header) => {
      if (header.sort) {
        checkSortOrder(header);
      }
    })
  })

  it('Sort not in headers (composable)', () => {
    wrapperBadConfigured.vm.finalTable.header.forEach((header) => {
      if (header.field !== 'actions') {
        expect(header.sort).toBe(false);
      }
    })
  })

  function checkSortIconProperties(header) {
    const sortImage = wrapper.find(`#tableHeaderSort-${header.id}`);
    if (header.sort) {
      expect(sortImage.element.tagName).toBe('IMG');
      expect(sortImage.element.alt).toBe('sort-icon');
      expect(sortImage.element.hidden).toBe(false);
      checkIconImage(sortImage, header);
    }
  }

  function checkIconImage(sortImage, header) {
    if (header.order === 'asc') {
      expect(sortImage.element.className).toContain(('table__header-arrow-up'));
    } else {
      expect(sortImage.element.className).toContain(('table__header-arrow-right'));
    }
  }

  function checkSortOrder(header) {
    checkOrderAsc(header);
    checkOrderDesc(header);
    checkOriginalOrder(header);
  }

  function checkOrderAsc(header) {
    if (header.order === 'asc') {
      wrapper.find(`#tableHeaderSort-${header.id}`).trigger('click');
      expect(header.order).toBe('desc');
    }
  }

  function checkOrderDesc(header) {
    if (header.order === 'desc') {
      wrapper.find(`#tableHeaderSort-${header.id}`).trigger('click');
      expect(header.order).toBe('');
    }
  }

  function checkOriginalOrder(header) {
    if (header.order === '') {
      wrapper.find(`#tableHeaderSort-${header.id}`).trigger('click');
      expect(header.order).toBe('asc');
    }
  }
})
