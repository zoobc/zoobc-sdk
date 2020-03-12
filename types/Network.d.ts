export interface HostInterface {
    host: string;
    name: string;
}
declare function list(hosts: HostInterface[]): void;
declare function set(idx: number): void;
declare function selected(): HostInterface;
declare const _default: {
    list: typeof list;
    set: typeof set;
    selected: typeof selected;
};
export default _default;
