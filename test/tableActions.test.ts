/// <reference types="vite" />
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '../src/i18n';
import PbsTable from '../src/components/PbsTable.vue';
import PbsBody from '../src/components/PbsBody.vue';

import tableActions from './mocks/tableActions.json';
import tableActionsBadConfigured from './mocks/tableActionsBadConfigure.json';

const wrapper = mount(PbsTable, {
  global: {
    plugins: [i18n]
  },
  props: {
    tableData: tableActions
  },
})

const wrapperBadConfigured = mount(PbsTable, {
  global: {
    plugins: [i18n]
  },
  props: {
    tableData: tableActionsBadConfigured
  },
})

describe('Test actions in datatable', () => {

  it('Check if header has actions column', () => {
    const headerRow = wrapper.find(`#tableHeaderRowTitle-${'actions'}`);
    expect(headerRow.element.innerHTML).toBe('Actions');
  })

  it('Click in each action of a row', () => {
    wrapper.vm.finalTable.header.forEach((header) => {
      findActionsInRows(header);
    })
  })

  it('Actions in headers and not in rows (composable)', () => {
    expect(wrapperBadConfigured.vm.finalTable.header.find((header) => header.field === 'actions')).toBeUndefined();
  })

  function findActionsInRows(header) {
    wrapper.vm.finalTable.rows.forEach((row, index) => {
      iterateRowActions(row, header);
    })
  }

  function iterateRowActions(row, header) {
    if (header.field === 'actions') {
      row[header.id].forEach((icon, index) => {
        getActionsAndEmit(icon, index);
      })
    }
  }
  
  function getActionsAndEmit(icon, index) {
    const bodyRowActions = wrapper.find(`#tableBodyActions-${icon}-${index}`);
    bodyRowActions.trigger('click');
    expect(bodyRowActions.element.alt).toBe(icon);
    const body = wrapper.findComponent(PbsBody);
    expect(body.emitted()).toHaveProperty('click-action');
    const emit = body.emitted('click-action')[index];
    expect(emit[0]).toStrictEqual({ action: icon, index: index });
    expect(wrapper.find(`#tableBodyActions-${icon}-${index}`).element.className).toContain('pointer');
  }
})
