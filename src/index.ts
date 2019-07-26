import ZooBC from './zoobc';
import Blocks from './blocks';

const zoobc = new ZooBC();

function connection(host: string): void {
  zoobc.connection = host;
}

function getBlocks(ChainType: number, Limit: number, Height: number): any {
  const blocks = new Blocks(zoobc.connection);

  return new Promise((resolve, reject) => {
    blocks.getBlocks(ChainType, Limit, Height, (err: any, resp: any) => {
      if (err) return reject(err);
      return resolve(resp);
    });
  });
}

export = { connection, getBlocks };
