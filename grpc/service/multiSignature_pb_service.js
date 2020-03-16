// package: service
// file: service/multiSignature.proto

var service_multiSignature_pb = require("../service/multiSignature_pb");
var model_multiSignature_pb = require("../model/multiSignature_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var MultisigService = (function () {
  function MultisigService() {}
  MultisigService.serviceName = "service.MultisigService";
  return MultisigService;
}());

MultisigService.GetPendingTransactionByAddress = {
  methodName: "GetPendingTransactionByAddress",
  service: MultisigService,
  requestStream: false,
  responseStream: false,
  requestType: model_multiSignature_pb.GetPendingTransactionByAddressRequest,
  responseType: model_multiSignature_pb.GetPendingTransactionByAddressResponse
};

MultisigService.GetPendingTransactionDetailByTransactionHash = {
  methodName: "GetPendingTransactionDetailByTransactionHash",
  service: MultisigService,
  requestStream: false,
  responseStream: false,
  requestType: model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashRequest,
  responseType: model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashResponse
};

exports.MultisigService = MultisigService;

function MultisigServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MultisigServiceClient.prototype.getPendingTransactionByAddress = function getPendingTransactionByAddress(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MultisigService.GetPendingTransactionByAddress, {
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

MultisigServiceClient.prototype.getPendingTransactionDetailByTransactionHash = function getPendingTransactionDetailByTransactionHash(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MultisigService.GetPendingTransactionDetailByTransactionHash, {
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

exports.MultisigServiceClient = MultisigServiceClient;

