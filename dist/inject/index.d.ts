export declare function getParameters(target: any, method?: string): any;
export declare function createObject(target: any): any;
export declare function resolve(name: any): any;
export declare function getDeclaration(name: string): any;
export declare function declare(type: string, target: any, name?: any): void;
export declare function execute(target: any, method: any): Promise<any>;
export declare function inject(ref: any): ParameterDecorator;
