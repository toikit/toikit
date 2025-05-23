"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declareLayer = declareLayer;
exports.layer = layer;
const inject_1 = require("../inject");
function declareLayer(name, target) {
    (0, inject_1.declare)('value', target, '__layer_' + name);
}
;
function layer(name, options = null) {
    return (0, inject_1.resolve)('__layer_' + name)(options);
}
;
//# sourceMappingURL=index.js.map