import NodeCache from 'node-cache';

export const cache = new NodeCache({
  stdTTL: 5 * 60,
  checkperiod: 120,
});
