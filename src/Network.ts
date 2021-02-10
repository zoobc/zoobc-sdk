// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { Empty } from '../grpc/model/empty_pb';
import { HealthCheckServiceClient } from '../grpc/service/healthCheck_pb_service';
import { HostService, HostServiceClient } from '../grpc/service/host_pb_service';
// import { GetHostPeersRequest } from '../grpc/model/host_pb';

// Maximum number of nodes which can be removed at a time
const MAX_CLEAN = 3;

// If we are below this number of nodes, try to add the well known peers back into the list
const MIN_NODES = 20;

// If we are above this number of nodes, don't keep adding nodes to the list
const MAX_NODES = 1000;

// The maximum nummber of new nodes to take on any collection cycle
const MAX_COLLECT = 5;

// The maximum number of nodes to try to contact to reach consensus on a request before giving up
const MAX_ATTEMPTS = 9;

// Wait this amount of ms (at a minimum) between trying to collect new nodes
const COLLECT_DELTA = 30 * 1000;

// Forcefully replace peer address ports with this port, until we get a core API that knows the HTTP ports for each node (if ever)
const API_PORT = 7001;

export interface HostInterface {
  host: string;
  name: string;
}

interface ResponseAccumulator {
  nodes: string[];
  res: any;
}

interface ErrorAccumulator {
  nodes: string[];
  err: any;
}

export interface NodeData {
  address: string;
  failedAttempts: number;
}

export interface GroupData {
  label: string;
  wkps: string[];
  pool?: NodeData[];
}

class Node {
  private address: string = '';
  private failedAttempts: number = 0;

  constructor(opts: any) {
    if (opts) this.restore(opts);
  }

  public countFailure() {
    this.failedAttempts++;
  }

  public countSuccess() {
    this.failedAttempts = 0;
  }

  public isGood() {
    return this.failedAttempts < 3;
  }

  public getAddress() {
    return this.address;
  }

  public save(): NodeData {
    return {
      address: this.address,
      failedAttempts: this.failedAttempts,
    };
  }

  public restore(obj: NodeData) {
    this.address = obj.address || '';
    this.failedAttempts = obj.failedAttempts || 0;
  }
}

export class Group {
  private label: string = '';
  private wkps: string[] = [];
  private pool: Node[] = [];
  private lastCollect: number = 0;

  constructor(opts: any) {
    if (opts) this.restore(opts);
    this.collect();
  }

  // pick a random node, query its known peers, add a few to our pool
  private collect() {
    const t = Date.now();
    if (t - this.lastCollect <= COLLECT_DELTA) return;
    this.clean();
    // console.log('SDK: collecting new nodes...');
    this.lastCollect = Date.now();
    var needed = MIN_NODES - this.pool.length;
    for (var i = 0; i < this.wkps.length; i++) {
      if (needed <= 0) break;
      if (!this.pool.find(n => n.getAddress() == this.wkps[i])) {
        this.pool.push(new Node({ address: this.wkps[i] }));
        needed--;
      }
    }
    needed = MAX_NODES - this.pool.length;
    const itr = this.iterator();
    const attempt = () => {
      const node = itr.next();
      if (!node) {
        // console.log(
        //   'SDK: BIG PROBLEM: ran out of nodes to try collecting peers from, either we are offline or we have no links to the live network :(',
        // );
        return;
      }
      new HostServiceClient(node.getAddress()).getHostPeers(new Empty(), (err, res) => {
        if (err) {
          // console.log('SDK: error collecting nodes from node', node.getAddress(), ':', err);
          node.countFailure();
          attempt();
        } else {
          if (res == null) return;
          const peers = [...res.toObject().resolvedpeersMap.map(p => p[1].info)];
          // console.log('SDK: collected nodes from node', node.getAddress(), '(', peers.length, ')');
          var added = 0;
          while (added < MAX_COLLECT && peers.length > 0 && this.pool.length < MAX_NODES) {
            const r = Math.floor(Math.random() * peers.length);
            const peer = peers.splice(r, 1)[0];
            if (!peer) continue;
            const address = 'http://' + peer.address + ':' + API_PORT;
            const hasPeer = this.pool.find(n => n.getAddress() == address);
            if (hasPeer) continue;
            this.pool.push(new Node({ address: address }));
            // console.log('SDK: added node', address);
            added++;
          }
          // console.log('SDK: current pool:', this.pool);
        }
      });
    };
    attempt();
  }

  // Remove any nodes from the list that have failed too many attempts
  public clean() {
    const bad = [];
    for (var i = 0; i < this.pool.length; i++) if (!this.pool[i].isGood()) bad.push(this.pool[i]);
    const n = Math.min(bad.length, MAX_CLEAN);
    // console.log('sdk: cleaning out bad nodes (', n, ')...');
    for (var i = 0; i < n; i++) this.pool.splice(this.pool.indexOf(bad[i], 1));
  }

  // Return an object with a 'next' method that will return Nodes at random
  // until we have tried every node in the pool.
  public iterator() {
    this.collect();
    const pool = [...this.pool];
    return {
      next() {
        if (!pool.length) {
          // console.log('SDK: iterator has run out of nodes to try...');
          return null;
        }
        return pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
      },
    };
  }

  // Serialize the current list of nodes for this group into a JSON structure
  public save(): GroupData {
    return {
      label: this.label,
      wkps: [...this.wkps],
      pool: this.pool.map(n => n.save()),
    };
  }

  // Restore the set of saved nodes for this group from a JSON structure
  private restore(obj: GroupData) {
    this.label = obj.label || '';
    this.wkps = obj.wkps || [];
    this.pool = (obj.pool || []).map(n => new Node(n));
  }
}

class Network {
  private idx: number = 0;
  private hosts: HostInterface[] = [];
  private groups: Group[] = [];

  get list(): HostInterface[] {
    return this.hosts;
  }

  set list(hosts: HostInterface[]) {
    this.hosts = hosts;
  }

  get nets(): Group[] {
    return this.groups;
  }

  set nets(nets: Group[]) {
    this.groups = nets;
  }

  get id(): number {
    return this.idx;
  }

  set id(id) {
    this.idx = id;
  }

  get selected(): Group {
    return this.groups[this.idx];
  }

  get getRandomAddress(): string {
    if (!this.selected) return '';
    const itr = this.selected.iterator();
    if (!itr) return '';
    const node = itr.next();
    if (!node) return '';
    return node.getAddress();
  }
}

const network = new Network();

function list(hosts: HostInterface[]): void {
  network.list = hosts;
}

function set(idx: number) {
  network.id = idx;
}

function selected(): Group {
  // return network.list[network.id];
  return network.nets[network.id];
}

function ping(): Promise<string> {
  return new Promise((resolve, reject) => {
    // const networkIP = selected();
    // const client = new HealthCheckServiceClient(networkIP.host);
    // const request = new Empty();
    request(HealthCheckServiceClient, 'healthCheck', new Empty(), true)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve('PONG');
      });

    /*client.healthCheck(request, err => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      return resolve('PONG');
    });*/
  });
}

function load(nets: GroupData[]) {
  network.nets = nets.map(n => new Group(n));
}

function save(): GroupData[] {
  return network.nets.map(n => n.save());
}

function getRandomAddress() {
  return network.getRandomAddress;
}

function defaultCompare(a: any, b: any) {
  if (a === b) return true;
  if (typeof a != 'object' || typeof b != 'object' || a == null || b == null) return false;
  let keysA = Object.keys(a),
    keysB = Object.keys(b);
  if (keysA.length != keysB.length) return false;
  for (let key of keysA) {
    if (!keysB.includes(key)) return false;
    if (typeof a[key] === 'function' || typeof b[key] === 'function') {
      if (a[key].toString() != b[key].toString()) return false;
    } else {
      if (!defaultCompare(a[key], b[key])) return false;
    }
  }
  return true;
}

// Make some API request to multiple random network nodes and compare the response.
// Every normal network request should use this method.
// - Pick 3 nodes at random out of the node pool, issue the request to each one
// - Sort the responses into buckets of identical responses (both errors and responses)
// - if any bucket gets more responses than half the total requests (if it is the majority response), return that
// - If there is not a majority consensus after doing 3 requests, issue 2 more requests
// - Continue requesting 2 more at a time, until we either reach majority consensus, or exceed MAX_ATTEMPTS
function request(clientClass: any, requestMethod: string, requestObject: any, single: boolean = false, compare: any = null): Promise<any> {
  if (!compare) compare = defaultCompare;
  return new Promise((resolve, reject) => {
    var group = network.selected;
    // const group = network.nets[0];
    var itr = group.iterator();
    var responses: ResponseAccumulator[] = [];
    var totalResponses = 0;
    var errors: ErrorAccumulator[] = [];
    var totalErrors = 0;
    var totalAttempts = 0;
    // console.log('SDK: starting request...');
    const handleResponse = (node: Node, err: any, res: any) => {
      // Handle response for request to single node
      if (single) {
        if (!err) {
          node.countSuccess();
          reachConsensus(null, res);
        } else {
          node.countFailure();
          if (totalAttempts >= MAX_ATTEMPTS / 3) {
            reachConsensus(err, null);
          } else {
            query(1);
          }
        }
        return;
      }

      // Handle response when we're querying multiple nodes
      var matched = false;
      const address = node.getAddress();
      if (!err) {
        totalResponses++;
        node.countSuccess();
        for (var i = 0; i < responses.length; i++) {
          var r = responses[i];
          if (compare(res.toObject(), r.res.toObject())) {
            r.nodes.push(address);
            matched = true;
            if (r.nodes.length > totalAttempts / 2) {
              reachConsensus(null, res);
              return;
            }
            break;
          }
        }
        if (!matched) {
          responses.push({ res: res, nodes: [address] });
        }
      } else {
        totalErrors++;
        node.countFailure();
        for (var i = 0; i < errors.length; i++) {
          var e = errors[i];
          if (compare(err, e.err)) {
            e.nodes.push(address);
            matched = true;
            if (e.nodes.length > totalAttempts / 2) {
              reachConsensus(err, null);
              return;
            }
            break;
          }
        }
        if (!matched) {
          errors.push({ err: err, nodes: [address] });
        }
      }

      // In multi-query case, count up responses and decide whether to give up or query more
      var total = totalResponses + totalErrors;
      if (total >= totalAttempts) {
        if (total >= MAX_ATTEMPTS) {
          giveUp();
        } else {
          query(2);
        }
      }
    };
    const giveUp = () => {
      // console.log('SDK: giving up on request...');
      reject({
        code: null,
        message: 'Inconsistent network response.',
        metadata: {
          responses: responses,
          errors: errors,
        },
      });
    };
    const reachConsensus = (err: any, res: any) => {
      // console.log('SDK: consensus reached on request:', {
      //   err,
      //   res,
      //   responses: responses.map(r => {
      //     return { nodes: r.nodes, res: r.res.toObject() };
      //   }),
      //   errors,
      // });
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    };
    const query = (n: number) => {
      // console.log('SDK: querying', n, 'nodes...');
      for (var i = 0; i < n; i++) {
        if (totalAttempts >= MAX_ATTEMPTS) {
          giveUp();
          return;
        }
        const node = itr.next();
        if (!node) {
          // console.log('SDK: ran out of nodes to query...');
          giveUp();
          break;
        }
        const address = node.getAddress();
        totalAttempts++;
        new clientClass(address)[requestMethod](requestObject, (err: any, res: any) => {
          handleResponse(node, err, res);
        });
      }
    };
    query(single ? 1 : 3);
  });
}

export default { list, set, selected, ping, request, load, save, getRandomAddress };
