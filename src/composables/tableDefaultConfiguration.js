export function usePropertiesByDefault(tableConf) {
  let tableData = actionsConfig(tableConf);
  tableData = sortConfig(tableData);
  tableData = dragableRowsConfig(tableData);
  tableData = draggableColumnsConfig(tableData);
  return addMissingPropsConfig(tableData, ['draggableColumns', 'draggableRows']);
}

function actionsConfig(tableConf) {
  if (tableConf.header.find((header) => header.field === 'actions') && !tableConf.rows.some((row) => Object.prototype.hasOwnProperty.call(row, 'actions') )) {
    deleteObjectInHeaders(tableConf, 'actions');
  }
  return tableConf;
}

function sortConfig(tableConf) {
  tableConf.header.forEach((header) => {
    if (header.field !== 'actions' && header.field !== 'draggable' && !Object.keys(header).includes('sort')) {
      header.sort = false;
    } 
    if (header.sort && !Object.keys(header).includes('order')) {
      header.order = "";
    }
  })
  return tableConf;
}

function dragableRowsConfig(tableConf) {
  if (Object.prototype.hasOwnProperty.call(tableConf.options, 'draggableRows')  && !tableConf.options.draggableRows && Object.keys(tableConf.rows[0]).includes('draggable')) {
    tableConf.rows.forEach((row) => delete row.draggable);
  }
  return tableConf;
}

function draggableColumnsConfig(tableConf) {
  if (Object.prototype.hasOwnProperty.call(tableConf.options, 'draggableColumns')  && !tableConf.options.draggableColumns) {
    deleteObjectInHeaders(tableConf, 'draggable');
  }
  return tableConf;
}

function addMissingPropsConfig(tableConf, keys) {
  keys.forEach((key) => {
    if (!(key in tableConf.options)) {
      tableConf.options[key] = false;
    }
  })
  return tableConf;
}

function deleteObjectInHeaders(tableConf, key) {
  const index = tableConf.header.findIndex((header) => header.field === key);
  if (index !== -1) {
    tableConf.header.splice(index, 1);
  }
  return tableConf;
}
