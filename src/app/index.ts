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

export function setConfig(data: any) {
  setData('__config__', data);
}

export function getConfig(name?: string) {
  let config = getData('__config__') || {};
  if (name) return config?.[name] || undefined;
  return config;
}