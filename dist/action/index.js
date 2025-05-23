"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAction = addAction;
exports.doAction = doAction;
exports.doActionWithAsync = doActionWithAsync;
const data_1 = require("../data");
function addAction(name, fn) {
    (0, data_1.setData)('__action_' + name, [fn]);
}
function doAction(name, data = null) {
    let actions = (0, data_1.getData)('__action_' + name, []);
    let rs = undefined;
    for (let action of actions) {
        let nrs = action(rs, data);
        if (nrs)
            rs = nrs;
    }
    return rs;
}
async function doActionWithAsync(name, data = null) {
    let actions = (0, data_1.getData)('__action_' + name, []);
    let rs = undefined;
    for await (let action of actions) {
        let nrs = await action(rs, data);
        if (nrs)
            rs = nrs;
    }
    return rs;
}
//# sourceMappingURL=index.js.map