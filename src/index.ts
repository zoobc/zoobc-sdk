import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
// export { BlockService } from './blocks';
// import GrpcService from './grpc';

class GrpcService {
  grpc: any;
  constructor(protoPath: string, protoName: string, serviceName: string, protoHost: string) {
    this.grpc = this.connect(protoPath, protoName, serviceName, protoHost);
  }

  connect(protoPath: string, protoName: string, serviceName: string, protoHost: string) {
    const path = `${protoPath}/service/${protoName}`;
    const pkgDef = protoLoader.loadSync(path, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [protoPath],
    });

    const proto = grpc.loadPackageDefinition(pkgDef) as any;
    return new proto.service[serviceName](protoHost, grpc.credentials.createInsecure());
  }
}

// class Blocks {

// }

export default class ZooBC extends GrpcService {
  grpc: any;
  constructor(protoPath: string, protoName: string, serviceName: string, protoHost: string) {
    super(protoPath, protoName, serviceName, protoHost);
    this.grpc = super.grpc;
  }
}
