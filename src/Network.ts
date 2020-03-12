export interface HostInterface {
  host?: string;
  name?: string;
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

function selected() {
  return network.list[network.id];
}

export default { list, set, selected };
