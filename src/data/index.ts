
import { Container } from "../container";
const KEY_DATA = '__data__';

export function setData(name, mapdata: any, merge: boolean = true) {
  let data = Reflect.getMetadata(KEY_DATA, Container) || {};

  if (merge) {
    if (Array.isArray(mapdata)) {
      data[name] = [...(data[name] || []),...mapdata];
    } else if (typeof mapdata == 'object') {
      data[name] = {
        ...data[name] || {},
        ...mapdata
      };
    } else {
      data[name] = mapdata;
    }
  }
  else {
    data[name] = mapdata;
  }
    
  Reflect.defineMetadata(KEY_DATA, data, Container);
}

export function getData(name, df: any = undefined) {
  let data = Reflect.getMetadata(KEY_DATA, Container) || {};
  return data?.[name] || df;
}