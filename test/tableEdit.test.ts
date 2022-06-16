/// <reference types="vite" />
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '../src/i18n';
import PbsTable from '../src/components/PbsTable.vue';

import tableEdit from './mocks/tableEdit.json';

const wrapper = mount(PbsTable, {
  global: {
    plugins: [i18n]
  },
  props: {
    tableData: tableEdit
  },
})

describe('Test edition in datatable', () => {
  it('Check if rows are edited', () => {
    wrapper.vm.finalTable.header.forEach((header, index) => {
      const id = `#tableBodyEdit-${header.id}-${index}`;
      if (header.edit) {
        expect(wrapper.find(id).element.className).toContain('pointer');
        wrapper.find(id).trigger('focus');
        wrapper.find(id).trigger('blur');
        const emit = wrapper.emitted();
        expect(emit).toHaveProperty('edit-start');
        expect(emit['edit-start'][index][0]).toStrictEqual({ field: header.field, row: wrapper.vm.finalTable.rows[index] });
        expect(emit).toHaveProperty('edit-stop');
        expect(emit['edit-stop'][index][0]).toStrictEqual({ field: header.field, row: wrapper.vm.finalTable.rows[index], value: undefined });
      }
    })
  })

  it ('Check pointer class in edit cells', () => {
    wrapper.vm.finalTable.rows.forEach((row, index) => {
      wrapper.vm.finalTable.header.forEach((header) => {
        const id = `#tableBodyEdit-${header.id}-${index}`;
        if (header.edit) {
          expect(wrapper.find(id).element.className).toContain('pointer');
        } else {
          expect(wrapper.find(id).element.className).not.toContain('pointer');
        }
      })
    })
  })
})
