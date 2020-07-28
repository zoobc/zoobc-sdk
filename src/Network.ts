import { Empty } from '../grpc/model/empty_pb';
import { HealthCheckServiceClient } from '../grpc/service/healthCheck_pb_service';

export interface HostInterface {
  host: string;
  name: string;
}

class Network {
  private idx: number = 0;
  private hosts: HostInterface[] = [];

  get list(): HostInterface[] {
    return this.hosts;
  }

  set list(hosts: HostInterface[]) {
    this.hosts = hosts;
  }

  get id(): number {
    return this.idx;
  }

  set id(id) {
    this.idx = id;
  }
}

const network = new Network();

function list(hosts: HostInterface[]): void {
  network.list = hosts;
}

function set(idx: number) {
  network.id = idx;
}

function selected(): HostInterface {
  return network.list[network.id];
}

function ping(): Promise<string> {
  return new Promise((resolve, reject) => {
    const networkIP = selected();
    const client = new HealthCheckServiceClient(networkIP.host);
    const request = new Empty();

    client.healthCheck(request, err => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      return resolve('PONG');
    });
  });
}

export default { list, set, selected, ping };
