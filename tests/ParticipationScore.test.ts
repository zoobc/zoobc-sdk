import 'mocha';
import zoobc from '../src';
import { FakeTransportBuilder } from '@improbable-eng/grpc-web-fake-transport';
import { grpc } from '@improbable-eng/grpc-web';
import { expect } from 'chai';
import { ParticipationScore, GetParticipationScoresResponse } from '../grpc/model/participationScore_pb';

const hosts = [{ host: 'http://172.104.47.168:7000', name: '168 Testnet' }];
zoobc.Network.list(hosts);

function mockGetLatestParam() {
  const response = new ParticipationScore();
  response.setNodeid('10');
  return new FakeTransportBuilder().withMessages([response]).build();
}

function mockGetHistoryParam() {
  const response = new GetParticipationScoresResponse();
  const participation = new ParticipationScore();
  participation.setHeight(10);
  response.setParticipationscoresList([participation]);
  return new FakeTransportBuilder().withMessages([response]).build();
}

describe('Participation Score Unit Testing :', () => {
  describe('get Latest/Total', () => {
    it('should return current total participation score', async () => {
      const transport = mockGetLatestParam();
      grpc.setDefaultTransport(transport);

      const result = await zoobc.ParticipationScore.getLatest('10');
      expect(result).to.be.an('object');
      expect(result.score).to.be.an('string');
    });
  });

  describe('get History', () => {
    it('should return list of participation score history', async () => {
      const from = 10;
      const to = 20;
      const transport = mockGetHistoryParam();
      grpc.setDefaultTransport(transport);

      const result = await zoobc.ParticipationScore.getHistory(from, to);
      expect(result).to.be.an('object');
      expect(result.participationscoresList).to.be.an('array');
    });
  });
});
