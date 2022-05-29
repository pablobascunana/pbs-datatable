export function useWidth(header) {
  return Object.prototype.hasOwnProperty.call(header, 'width') 
          ? header.width 
          : 'auto';
}
