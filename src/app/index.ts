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

export function config(data?: any) {
  if (!data) return getData('__config__') || {};
  setData('__config__', data);
}