/// <reference types="node" />
import Transport from '@ledgerhq/hw-transport';
export declare class Ledger {
    private transport;
    constructor(transport: Transport<any>);
    static getUSBTransport(): Promise<Transport>;
    getPublicKey(accountIndex: number): Promise<Buffer>;
    signTransactionBytes(accountIndex: number, txBytes: Buffer): Promise<Buffer>;
}
