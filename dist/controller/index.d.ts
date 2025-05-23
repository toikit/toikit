export declare function controller(target: any, method: any): (req: any, res: any) => Promise<void>;
export declare class BaseController {
    handle(method: any, req: any, res: any): void;
}
