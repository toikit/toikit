"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appPath = exports.rootPath = exports.setRoot = void 0;
const data_1 = require("../data");
const setRoot = (dir) => {
    (0, data_1.setData)('__root_path__', dir, false);
};
exports.setRoot = setRoot;
const rootPath = (ls) => {
    if (!ls)
        return (0, data_1.getData)('__root_path__');
    return (0, data_1.getData)('__root_path__') + '/' + ls;
};
exports.rootPath = rootPath;
const appPath = (ls) => {
    if (!ls)
        return (0, exports.rootPath)('app');
    return (0, exports.rootPath)('app/' + ls);
};
exports.appPath = appPath;
//# sourceMappingURL=index.js.map