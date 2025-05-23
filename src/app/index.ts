import {resolve, declare} from '../inject';
import { getData, setData } from '../data';

export function app(target: any = null) {
  if (target == null) return resolve('app');
  return declare('value', target, 'app');
};

export function module(name) {
  let app = resolve('app');
  return app.modules[name] || null;
};

export function config(name: string = null, data: any = {}) {
  if (!name) return getData('__config__') || {};
  setData('__config__', data);
}