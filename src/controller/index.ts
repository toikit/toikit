import { createObject } from '../inject';

export function controller(target, method) {
  return async (req, res) => {
    let object = createObject(target);
    await object.handle(method, req, res);
  }
};

export class BaseController {
  handle(method, req, res){
    this[method](req, res);
  }
}
