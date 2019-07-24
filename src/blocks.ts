import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

interface ParamBlock {
  ChainType: number;
  Limit: number;
  Height: number;
}

export class BlockService {
  block: any;

  constructor(protoPath: string, protoHost: string) {
    this.block = this.Block(protoPath, protoHost);
  }

  Block(protoPath: string, protoHost: string) {
    const path = `${protoPath}/service/block.proto`;
    const pkgDef = protoLoader.loadSync(path, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [protoPath],
    });

    const proto = grpc.loadPackageDefinition(pkgDef) as any;
    return new proto.service.BlockService(protoHost, grpc.credentials.createInsecure());
  }

  getBlock({ ChainType, Limit, Height }: ParamBlock) {
    return new Promise((resolve, reject) => {
      this.block.GetBlocks({ ChainType, Limit, Height }, (err: any, result: any) => {
        if (err) reject(err.details);
        resolve(result.blocks);
      });
    });
  }
}
