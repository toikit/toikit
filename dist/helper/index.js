"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declareHelper = declareHelper;
exports.helper = helper;
const inject_1 = require("../inject");
function declareHelper(name, target) {
    (0, inject_1.declare)('value', target, '__helper_' + name);
}
function helper(name) {
    return (0, inject_1.resolve)('__helper_' + name);
}
//# sourceMappingURL=index.js.map