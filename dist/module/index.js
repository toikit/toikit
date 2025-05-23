"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
class BaseModule {
    constructor() {
        this.name = '';
    }
    prepare() { }
    register() { }
    setup() { }
    mounted() { }
    build(config) {
        return [];
    }
}
exports.BaseModule = BaseModule;
//# sourceMappingURL=index.js.map