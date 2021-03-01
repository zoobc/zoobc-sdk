import 'mocha';
import { expect } from 'chai';
import zoobc, { BIP32Interface, ZooKeyring, getZBCAddress } from '../src';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { GetEscrowTransactionsResponse, Escrow, EscrowStatusMap } from '../grpc/model/escrow_pb';
import { grpc } from '@improbable-eng/grpc-web';
import { PostTransactionResponse, Transaction } from '../grpc/model/transaction_pb';

interface IMockEscrowTransport {
  id?: string;
  recipientaddress?: string;
  senderaddress?: string;
  approverAddress?: string;
  amount?: string;
  commission?: string;
  timeout?: string;
  status?: EscrowStatusMap[keyof EscrowStatusMap];
  blockheight?: number;
  latest?: boolean;
  instruction?: string;
}

interface IMockTransactionTransport {
  id?: string;
  transactionType?: number;
}

function mockEscrowsTransport(total: string, params: IMockEscrowTransport) {
  const EscrowsResponse = new GetEscrowTransactionsResponse();
  EscrowsResponse.setTotal(total);
  const escrowResponse = new Escrow();
  let escrowList = [];
  if (params) {
    const {
      id,
      senderaddress,
      recipientaddress,
      approverAddress,
      amount,
      commission,
      timeout,
      status,
      blockheight,
      latest,
      instruction,
    } = params;
    if (id) escrowResponse.setId(id);
    if (senderaddress) escrowResponse.setSenderaddress(senderaddress);
    if (recipientaddress) escrowResponse.setRecipientaddress(recipientaddress);
    if (approverAddress) escrowResponse.setApproveraddress(approverAddress);
    if (amount) escrowResponse.setAmount(amount);
    if (commission) escrowResponse.setCommission(commission);
    if (timeout) escrowResponse.setTimeout(timeout);
    if (status) escrowResponse.setStatus(status);
    if (blockheight) escrowResponse.setBlockheight(blockheight);
    if (latest) escrowResponse.setLatest(latest);
    if (instruction) escrowResponse.setInstruction(instruction);
  }
  escrowList.push(escrowResponse);
  EscrowsResponse.setEscrowsList(escrowList);
  return new FakeTransportBuilder().withMessages([EscrowsResponse]).build();
}

function mockEscrowTransport(params: IMockEscrowTransport) {
  const escrowResponse = new Escrow();
  if (params) {
    const { id } = params;
    if (id) escrowResponse.setId(id);
  }
  return new FakeTransportBuilder().withMessages([escrowResponse]).build();
}

function mockEscrowApprovalTransaport(params: IMockTransactionTransport) {
  const escrowApprovalResponse = new PostTransactionResponse();
  const escrowTransaction = new Transaction();
  if (params) {
    const { id, transactionType } = params;
    if (id) escrowTransaction.setId(id);
    if (transactionType) escrowTransaction.setTransactiontype(transactionType);
  }
  escrowApprovalResponse.setTransaction(escrowTransaction);
  return new FakeTransportBuilder().withMessages([escrowApprovalResponse]).build();
}

describe('Escrow Unit Testing :', () => {
  beforeEach(() => {
    const hosts = [{ host: 'http://85.90.246.90:8002', name: '168 Testnet' }];
    zoobc.Network.list(hosts);
  });
  describe('getList', () => {
    it('getList should return escrow list according params', async () => {
      const id = '-8738564705130879368';
      const senderAddress = 'iSJt3H8wFOzlWKsy_UoEWF_OjF6oymHMqthyUMDKSyxb';
      const recipientaddress = 'B9C35tu6hJCE7IrwqL5uxnh6OW77Pw99JIdrSpHMg2Ki';
      const approverAddress = 'B9C35tu6hJCE7IrwqL5uxnh6OW77Pw99JIdrSpHMg2Ki';
      const amount = '10000000000';
      const commission = '100000000';
      const timeout = '556';
      const status = 1;
      const blockheight = 57;
      const latest = true;
      const instruction = 'Donation For Corona Virus';
      const total = '1';
      const transport = mockEscrowsTransport(total, {
        id: id,
        senderaddress: senderAddress,
        recipientaddress: recipientaddress,
        approverAddress: approverAddress,
        amount: amount,
        commission: commission,
        timeout: timeout,
        status: status,
        blockheight: blockheight,
        latest: latest,
        instruction: instruction,
      });
      grpc.setDefaultTransport(transport);
      const escrow = await zoobc.Escrows.getList({
        approverAddress: approverAddress,
      });
      expect(escrow).to.be.an('object');
      expect(escrow.escrowList).to.be.an('array');
    });
  });

  describe('getEscrowById', () => {
    it('getEscrowById should return escrow detail with id: -8738564705130879368', async () => {
      const id = '-8738564705130879368';
      const transport = mockEscrowTransport({ id: id });
      grpc.setDefaultTransport(transport);
      const res = await zoobc.Escrows.get(id);
      expect(res).to.be.an('object');
      expect(res?.id).to.be.equal(id);
    });
  });

  describe('approvalEscrow', () => {
    it('approvalEscrow should return new object escrow transaction', async () => {
      const passphrase =
        'access please power method cloth index enlist fox race physical client pen social intact cannon armed illness chase save peace swear seminar bid flavor';
      const pass = 'p4ssphr4se';
      const keyring = new ZooKeyring(passphrase, pass);
      const childSeed = keyring.calcDerivationPath(0);
      const data = {
        approvalAddress: 'B9C35tu6hJCE7IrwqL5uxnh6OW77Pw99JIdrSpHMg2Ki',
        fee: 1,
        approvalCode: 0,
        transactionId: '4798432277002932375',
      };
      const typeTx = 4;
      const transport = mockEscrowApprovalTransaport({ id: data.transactionId, transactionType: typeTx });
      grpc.setDefaultTransport(transport);
      const res = await zoobc.Escrows.approval(data, childSeed);
      expect(res).to.be.an('object');
      expect(res.transaction).to.be.an('object');
    });
  });
});
