"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appPath = exports.rootPath = exports.setRoot = void 0;
const path_1 = __importDefault(require("../path"));
const data_1 = require("../data");
const setRoot = (dir) => {
    (0, data_1.setData)('__root_path__', dir, false);
};
exports.setRoot = setRoot;
const rootPath = (ls) => {
    let dir = (0, data_1.getData)('__root_path__');
    let root = path_1.default.resolve(dir, '../..');
    if (ls)
        return path_1.default.join(root, ls);
    return root;
};
exports.rootPath = rootPath;
const appPath = (ls) => {
    if (!ls)
        return (0, exports.rootPath)('app');
    return (0, exports.rootPath)('app/' + ls);
};
exports.appPath = appPath;
//# sourceMappingURL=index.js.map