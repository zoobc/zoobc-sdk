import {
  GetLatestParticipationScoreByNodeIDRequest,
  ParticipationScore,
  GetParticipationScoresResponse,
  GetParticipationScoresRequest,
} from '../grpc/model/participationScore_pb';
import { ParticipationScoreServiceClient } from '../grpc/service/participationScore_pb_service';
import Network from './Network';

export type ParticipationScoreResponse = ParticipationScore.AsObject;
export type ParticipationScoresResponse = GetParticipationScoresResponse.AsObject;

function getLatest(nodeId: string): Promise<ParticipationScoreResponse> {
  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new GetLatestParticipationScoreByNodeIDRequest();
    request.setNodeid(nodeId);

    Network.request(ParticipationScoreServiceClient, 'getLatestParticipationScoreByNodeID', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(res.toObject());
      });

    /*const client = new ParticipationScoreServiceClient(networkIP.host);
    client.getLatestParticipationScoreByNodeID(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });*/
  });
}

function getHistory(fromHeight: number, toHeight: number): Promise<ParticipationScoresResponse> {
  return new Promise((resolve, reject) => {
    // const networkIP = Network.selected();
    const request = new GetParticipationScoresRequest();
    request.setFromheight(fromHeight);
    request.setToheight(toHeight);

    Network.request(ParticipationScoreServiceClient, 'getParticipationScores', request)
      .catch(err => {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      })
      .then(res => {
        resolve(res.toObject());
      });

    /*const client = new ParticipationScoreServiceClient(networkIP.host);
    client.getParticipationScores(request, (err, res) => {
      if (err) {
        const { code, message, metadata } = err;
        reject({ code, message, metadata });
      }
      if (res) resolve(res.toObject());
    });*/
  });
}

export default { getLatest, getHistory };
