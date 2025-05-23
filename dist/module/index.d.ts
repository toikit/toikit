export declare class BaseModule {
    app: any;
    name: string;
    prepare(): void;
    register(): void;
    setup(): void;
    mounted(): void;
    build(config?: any): Array<String>;
}
