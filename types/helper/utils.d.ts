/// <reference types="node" />
export declare const errorDateMessage: {
    code: string;
    message: string;
    metadata: string;
};
export declare function getZBCAddress(publicKey: Uint8Array, prefix?: string): string;
export declare function hash(str: any, format?: string): string | Buffer;
export declare function encryptPassword(password: string, salt?: string): string;
export declare function isZBCAddressValid(address: string, stdPrefix?: string): boolean;
export declare function ZBCAddressToBytes(address: string): Buffer;
export declare function shortenHash(text?: string): string;
export declare function writeInt64(number: number | string, base?: number, endian?: any): Buffer;
export declare function readInt64(buff: Buffer, offset: number): string;
export declare function writeInt32(number: number): Buffer;
export declare function validationTimestamp(txBytes: Buffer): Promise<boolean>;
export declare function readPostTransactionBytes(txBytes: Buffer): {
    timestamp: string;
    senderAddress: string;
    recipientAddress: string;
    txFee: string;
    bodyBytes: string;
    approverAddress: string;
    commission: string;
    timeout: string;
    instruction: string;
    multisigTxType: string;
};
export declare function readUpdateNodeBytes(txBytes: Buffer, bytesConverted: any): any;
export declare function readSendMoneyBytes(txBytes: Buffer, bytesConverted: any): any;
export declare function readSendMoneyEscrowBytes(txBytes: Buffer, bytesConverted: any): any;
export declare function readRemoveNodeRegistrationBytes(txBytes: Buffer, bytesConverted: any): any;
export declare function readNodeRegistrationBytes(txBytes: Buffer, bytesConverted: any): any;
export declare function readClaimNodeBytes(txBytes: Buffer, bytesConverted: any): any;
export declare function readSetupAccountDatasetBytes(txBytes: Buffer, bytesConverted: any): any;
export declare function readRemoveDatasetBytes(txBytes: Buffer, bytesConverted: any): any;
export declare function readApprovalEscrowBytes(txBytes: Buffer, bytesConverted: any): any;
export declare function readMultisignatureTransactionBytes(txBytes: Buffer, bytesConverted: any): any;
