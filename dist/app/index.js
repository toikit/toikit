"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = app;
exports.module = module;
exports.setConfig = setConfig;
exports.getConfig = getConfig;
const inject_1 = require("../inject");
const data_1 = require("../data");
function app(target = null) {
    if (target == null)
        return (0, inject_1.resolve)('app');
    return (0, inject_1.declare)('value', target, 'app');
}
;
function module(name) {
    let app = (0, inject_1.resolve)('app');
    return app.modules[name] || null;
}
;
function setConfig(data) {
    (0, data_1.setData)('__config__', data);
}
function getConfig(name) {
    let config = (0, data_1.getData)('__config__') || {};
    if (name)
        return config?.[name] || undefined;
    return config;
}
//# sourceMappingURL=index.js.map