// package: service
// file: service/p2pCommunication.proto

var service_p2pCommunication_pb = require("../service/p2pCommunication_pb");
var model_peer_pb = require("../model/peer_pb");
var model_node_pb = require("../model/node_pb");
var model_empty_pb = require("../model/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var P2PCommunication = (function () {
  function P2PCommunication() {}
  P2PCommunication.serviceName = "service.P2PCommunication";
  return P2PCommunication;
}());

P2PCommunication.GetPeerInfo = {
  methodName: "GetPeerInfo",
  service: P2PCommunication,
  requestStream: false,
  responseStream: false,
  requestType: model_peer_pb.GetPeerInfoRequest,
  responseType: model_node_pb.Node
};

P2PCommunication.GetMorePeers = {
  methodName: "GetMorePeers",
  service: P2PCommunication,
  requestStream: false,
  responseStream: false,
  requestType: model_empty_pb.Empty,
  responseType: model_peer_pb.GetMorePeersResponse
};

P2PCommunication.SendPeers = {
  methodName: "SendPeers",
  service: P2PCommunication,
  requestStream: false,
  responseStream: false,
  requestType: model_peer_pb.SendPeersRequest,
  responseType: model_empty_pb.Empty
};

exports.P2PCommunication = P2PCommunication;

function P2PCommunicationClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

P2PCommunicationClient.prototype.getPeerInfo = function getPeerInfo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(P2PCommunication.GetPeerInfo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

P2PCommunicationClient.prototype.getMorePeers = function getMorePeers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(P2PCommunication.GetMorePeers, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

P2PCommunicationClient.prototype.sendPeers = function sendPeers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(P2PCommunication.SendPeers, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.P2PCommunicationClient = P2PCommunicationClient;

