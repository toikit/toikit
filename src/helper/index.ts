import { declare, resolve } from "../inject";

export function declareHelper(name, target) {
  declare('value', target, '__helper_' + name);
}

export function helper(name) {
  return resolve('__helper_' + name);
}