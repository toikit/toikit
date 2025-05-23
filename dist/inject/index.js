"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameters = getParameters;
exports.createObject = createObject;
exports.resolve = resolve;
exports.getDeclaration = getDeclaration;
exports.declare = declare;
exports.execute = execute;
exports.inject = inject;
const KEY_DECLARE_BINDING = '__declare_binding__';
const KEY_DECLARE_NAME = '__declare_name__';
const KEY_DECLARE_PARAMETER = '__declare_parameter__';
const container_1 = require("../container");
function getParameters(target, method = 'constructor') {
    let params = Reflect.getMetadata(KEY_DECLARE_PARAMETER, target) || {};
    if (!params.hasOwnProperty(method))
        return [];
    return params[method].reverse();
}
function createObject(target) {
    let params = getParameters(target, 'constructor');
    let args = params.map(param => {
        return resolve(param);
    });
    return new target(...args);
}
function resolve(name) {
    let target = name;
    if (typeof name === 'string') {
        target = getDeclaration(name);
        if (target == undefined)
            throw new Error('Target ' + name + ' is not defined');
    }
    let bindingInfo = Reflect.getMetadata(KEY_DECLARE_BINDING, target);
    if (bindingInfo == undefined) {
        return createObject(target);
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
function getDeclaration(name) {
    let names = Reflect.getMetadata(KEY_DECLARE_NAME, container_1.Container) || {};
    return names[name] || undefined;
}
function declare(type, target, name = null) {
    let f = function (t, n = null) {
        n = n || t.constructor.name;
        let names = Reflect.getMetadata(KEY_DECLARE_NAME, container_1.Container) || {};
        names[n] = t;
        Reflect.defineMetadata(KEY_DECLARE_NAME, names, container_1.Container);
        Reflect.defineMetadata(KEY_DECLARE_BINDING, { n, type, value: type == 'value' ? target : undefined }, target);
    };
    if (Array.isArray(target) && !name)
        target.forEach(t => {
            f(t);
        });
    else
        f(target, name);
}
async function execute(target, method) {
    let instance = resolve(target);
    let params = getParameters(target, method);
    let args = params.map(param => resolve(param));
    return await instance[method](...args);
}
function inject(ref) {
    return function (target, method, index) {
        method = method || 'constructor';
        let params = Reflect.getMetadata(KEY_DECLARE_PARAMETER, target) || {};
        if (!params.hasOwnProperty(method))
            params[method] = [];
        params[method].push(ref);
        Reflect.defineMetadata(KEY_DECLARE_PARAMETER, params, target);
    };
}
//# sourceMappingURL=index.js.map