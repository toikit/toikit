"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
exports.controller = controller;
const inject_1 = require("../inject");
function controller(target, method) {
    return async (req, res) => {
        let object = (0, inject_1.createObject)(target);
        await object.handle(method, req, res);
    };
}
;
class BaseController {
    handle(method, req, res) {
        this[method](req, res);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=index.js.map