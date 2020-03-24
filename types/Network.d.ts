export interface HostInterface {
    host: string;
    name: string;
}
declare function list(hosts: HostInterface[]): void;
declare function set(idx: number): void;
declare function selected(): HostInterface;
declare function ping(): Promise<string>;
declare const _default: {
    list: typeof list;
    set: typeof set;
    selected: typeof selected;
    ping: typeof ping;
};
export default _default;
