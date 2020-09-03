import { ParticipationScore, GetParticipationScoresResponse } from '../grpc/model/participationScore_pb';
export declare type ParticipationScoreResponse = ParticipationScore.AsObject;
export declare type ParticipationScoresResponse = GetParticipationScoresResponse.AsObject;
declare function getLatest(nodeId: string): Promise<ParticipationScoreResponse>;
declare function getHistory(fromHeight: number, toHeight: number): Promise<ParticipationScoresResponse>;
declare const _default: {
    getLatest: typeof getLatest;
    getHistory: typeof getHistory;
};
export default _default;
