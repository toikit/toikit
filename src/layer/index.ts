import { resolve, declare } from '../inject';

export function declareLayer(name, target: any) {
  declare('value', target, '__layer_' + name);
};

export function layer(name, options: any = null) {
  return resolve('__layer_' + name)(options);
};
