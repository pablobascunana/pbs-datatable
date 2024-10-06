export function useArrowNeutral(header) {
  // eslint-disable-next-line no-debugger
  debugger;
  return 'sort' in header && 'order' in header && header.order !== '' ? false : true;
}

export function useArrowDown(header) {
  // eslint-disable-next-line no-debugger
  debugger;
  return header.order === 'desc';
}
