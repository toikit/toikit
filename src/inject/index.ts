const KEY_DECLARE_BINDING = '__declare_binding__';
const KEY_DECLARE_NAME = '__declare_name__';
const KEY_DECLARE_PARAMETER = '__declare_parameter__';

import { Container } from '../container';

/**
 * Get all parameters of method on target
 * @param target 
 * @param method 
 * @returns 
 */
export function getParameters(target: any, method: string = 'constructor') {
  let params = Reflect.getMetadata(KEY_DECLARE_PARAMETER, target) || {};
  if (!params.hasOwnProperty(method)) return [];
  return params[method].reverse();
}

/**
 * Create new instance of target with parameters
 * @param target 
 * @returns 
 */
export function createObject(target: any) {
  let params = getParameters(target, 'constructor');
  let args = params.map(param => {
    return resolve(param)
  });
  return new target(...args);
}

/**
 * Resolve declare
 * @param name 
 * @returns 
 */
export function resolve(name: any) {
  let target = name;

  if (typeof name === 'string') {
    target = getDeclaration(name);
    if (target == undefined) throw new Error('Target ' + name + ' is not defined');
  }

  // Get binding info
  let bindingInfo = Reflect.getMetadata(KEY_DECLARE_BINDING, target);
  if (bindingInfo == undefined) {
    return createObject(target);
    // throw new Error('Binding not found ' + name);
  }

  if (bindingInfo.type == 'value') {
    return bindingInfo.value;
  }

  if (bindingInfo.type == 'binding') {
    return createObject(target);
  }

  if (bindingInfo.value == undefined) {
    bindingInfo.value = createObject(target);
    Reflect.defineMetadata(KEY_DECLARE_BINDING, bindingInfo, target);
  }

  return bindingInfo.value;
}

/**
 * Get declaration
 * @param name 
 * @returns 
 */
export function getDeclaration(name: string) {
  let names = Reflect.getMetadata(KEY_DECLARE_NAME, Container) || {};
  return names[name] || undefined;
}

/**
 * Declare
 * @param type 
 * @param target 
 * @param name 
 */
export function declare(type: string, target: any, name: any = null) {
  let f = function(t, n: any = null){
    n = n || t.constructor.name;
    let names = Reflect.getMetadata(KEY_DECLARE_NAME, Container) || {};
    names[n] = t;
    Reflect.defineMetadata(KEY_DECLARE_NAME, names, Container);
    Reflect.defineMetadata(KEY_DECLARE_BINDING, { n, type, value: type == 'value' ? target : undefined }, target);
  }

  if (Array.isArray(target) && !name) target.forEach(t => {
    f(t);
  });
  else f(target, name)
}

/**
 * Excute object
 * @param target 
 * @param method 
 * @returns 
 */
export async function execute(target, method){
  let instance = resolve(target);
  let params = getParameters(target, method);
  let args = params.map(param => resolve(param));
  return await instance[method](...args);
}

/**
 * Declare parameters
 * @param ref 
 * @returns 
 */
export function inject(ref: any): ParameterDecorator {
  return function (target: any, method: any, index: number) {
    method = method || 'constructor';
    let params = Reflect.getMetadata(KEY_DECLARE_PARAMETER, target) || {};
    if (!params.hasOwnProperty(method)) params[method] = [];
    params[method].push(ref);
    Reflect.defineMetadata(KEY_DECLARE_PARAMETER, params, target);
  };
}