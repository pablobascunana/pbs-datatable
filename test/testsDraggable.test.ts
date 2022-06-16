/// <reference types="vite" />
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '../src/i18n';
import PbsTable from '../src/components/PbsTable.vue';
import PbsHeader from '../src/components/PbsHeader.vue';

import tableDraggable from './mocks/tableDraggable.json';
import tableDraggableBadConfigured from './mocks/tableDraggableBadConfigured.json';

const wrapper = mount(PbsTable, {
  global: {
    plugins: [i18n]
  },
  props: {
    tableData: tableDraggable
  },
})

const wrapperBadConfigured = mount(PbsTable, {
  global: {
    plugins: [i18n]
  },
  props: {
    tableData: tableDraggableBadConfigured
  },
})

describe('Test draggable in datatable', () => {

  it('Check if columns are draggable', () => {
    expect(wrapper.vm.finalTable.options.draggableColumns).toBe(true);
    const headerComponent = wrapper.findComponent(PbsHeader);
    wrapper.vm.finalTable.header.forEach((header) => {
      checkIfColumnIsPinned(headerComponent, header);
      checkIfHeaderHasCursorMove(headerComponent, header);
    })
    simulateDragEvent(headerComponent);
  })

  it('Check if rows are draggable', () => {
    expect(wrapper.vm.finalTable.options.draggableRows).toBe(true);
  })

  it('Check if draggable bad configuration', () => {
    expect(wrapperBadConfigured.vm.finalTable.options.draggableColumns).toBe(false);
    expect(wrapperBadConfigured.vm.finalTable.options.draggableRows).toBe(false);
    expect(wrapperBadConfigured.vm.finalTable.header.find((header) => header.field === 'draggable')).toBeUndefined();
    expect(wrapperBadConfigured.vm.finalTable.rows.find((row) => Object.keys(row).includes('draggable'))).toBeUndefined();
  })

  function checkIfColumnIsPinned(headerComponent, header) {
    if (header.id === 'draggable' || header.id === 'actions') {
      expect(headerComponent.find(`#columnDraggable-${header.id}`).element.className).toContain('pinned');
    } else {
      expect(headerComponent.find(`#columnDraggable-${header.id}`).element.className).not.toContain('pinned');
    }
  }

  function checkIfHeaderHasCursorMove(headerComponent, header) {
    if (header.id !== 'draggable' && header.id !== 'actions') {
      expect(headerComponent.find(`#tableHeaderRowTitle-${header.id}`).element.className).toContain('move');
    } else {
      expect(headerComponent.find(`#tableHeaderRowTitle-${header.id}`).element.className).not.toContain('move');
    }
  }

  function simulateDragEvent(headerComponent) {
    headerComponent.vm.dragColumnEnd();
    const emit = headerComponent.emitted();
    expect(emit).toHaveProperty('drag-column-end');
    expect(emit['drag-column-end'][0][0].value).toStrictEqual(headerComponent.vm.headers);
  }
})
