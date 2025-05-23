"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setData = setData;
exports.getData = getData;
const container_1 = require("../container");
const KEY_DATA = '__data__';
function setData(name, mapdata, merge = true) {
    let data = Reflect.getMetadata(KEY_DATA, container_1.Container) || {};
    if (merge) {
        if (Array.isArray(mapdata)) {
            data[name] = [...(data[name] || []), ...mapdata];
        }
        else if (typeof mapdata == 'object') {
            data[name] = {
                ...data[name] || {},
                ...mapdata
            };
        }
        else {
            data[name] = mapdata;
        }
    }
    else {
        data[name] = mapdata;
    }
    Reflect.defineMetadata(KEY_DATA, data, container_1.Container);
}
function getData(name, df = undefined) {
    let data = Reflect.getMetadata(KEY_DATA, container_1.Container) || {};
    return data?.[name] || df;
}
//# sourceMappingURL=index.js.map