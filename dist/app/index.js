"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = app;
exports.module = module;
exports.config = config;
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
function config(name = null, data = {}) {
    if (!name)
        return (0, data_1.getData)('__config__') || {};
    (0, data_1.setData)('__config__', data);
}
//# sourceMappingURL=index.js.map