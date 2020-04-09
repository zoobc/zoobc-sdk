/**
 * @fileoverview gRPC-Web generated client stub for service
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var model_multiSignature_pb = require('../model/multiSignature_pb.js')

var google_api_annotations_pb = require('../google/api/annotations_pb.js')
const proto = {};
proto.service = require('./multiSignature_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.service.MultisigServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.service.MultisigServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.GetPendingTransactionsRequest,
 *   !proto.model.GetPendingTransactionsResponse>}
 */
const methodDescriptor_MultisigService_GetPendingTransactions = new grpc.web.MethodDescriptor(
  '/service.MultisigService/GetPendingTransactions',
  grpc.web.MethodType.UNARY,
  model_multiSignature_pb.GetPendingTransactionsRequest,
  model_multiSignature_pb.GetPendingTransactionsResponse,
  /** @param {!proto.model.GetPendingTransactionsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_multiSignature_pb.GetPendingTransactionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.GetPendingTransactionsRequest,
 *   !proto.model.GetPendingTransactionsResponse>}
 */
const methodInfo_MultisigService_GetPendingTransactions = new grpc.web.AbstractClientBase.MethodInfo(
  model_multiSignature_pb.GetPendingTransactionsResponse,
  /** @param {!proto.model.GetPendingTransactionsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_multiSignature_pb.GetPendingTransactionsResponse.deserializeBinary
);


/**
 * @param {!proto.model.GetPendingTransactionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.GetPendingTransactionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.GetPendingTransactionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.MultisigServiceClient.prototype.getPendingTransactions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.MultisigService/GetPendingTransactions',
      request,
      metadata || {},
      methodDescriptor_MultisigService_GetPendingTransactions,
      callback);
};


/**
 * @param {!proto.model.GetPendingTransactionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.GetPendingTransactionsResponse>}
 *     A native promise that resolves to the response
 */
proto.service.MultisigServicePromiseClient.prototype.getPendingTransactions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.MultisigService/GetPendingTransactions',
      request,
      metadata || {},
      methodDescriptor_MultisigService_GetPendingTransactions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.GetPendingTransactionDetailByTransactionHashRequest,
 *   !proto.model.GetPendingTransactionDetailByTransactionHashResponse>}
 */
const methodDescriptor_MultisigService_GetPendingTransactionDetailByTransactionHash = new grpc.web.MethodDescriptor(
  '/service.MultisigService/GetPendingTransactionDetailByTransactionHash',
  grpc.web.MethodType.UNARY,
  model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashRequest,
  model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashResponse,
  /** @param {!proto.model.GetPendingTransactionDetailByTransactionHashRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.GetPendingTransactionDetailByTransactionHashRequest,
 *   !proto.model.GetPendingTransactionDetailByTransactionHashResponse>}
 */
const methodInfo_MultisigService_GetPendingTransactionDetailByTransactionHash = new grpc.web.AbstractClientBase.MethodInfo(
  model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashResponse,
  /** @param {!proto.model.GetPendingTransactionDetailByTransactionHashRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_multiSignature_pb.GetPendingTransactionDetailByTransactionHashResponse.deserializeBinary
);


/**
 * @param {!proto.model.GetPendingTransactionDetailByTransactionHashRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.GetPendingTransactionDetailByTransactionHashResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.GetPendingTransactionDetailByTransactionHashResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.MultisigServiceClient.prototype.getPendingTransactionDetailByTransactionHash =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.MultisigService/GetPendingTransactionDetailByTransactionHash',
      request,
      metadata || {},
      methodDescriptor_MultisigService_GetPendingTransactionDetailByTransactionHash,
      callback);
};


/**
 * @param {!proto.model.GetPendingTransactionDetailByTransactionHashRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.GetPendingTransactionDetailByTransactionHashResponse>}
 *     A native promise that resolves to the response
 */
proto.service.MultisigServicePromiseClient.prototype.getPendingTransactionDetailByTransactionHash =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.MultisigService/GetPendingTransactionDetailByTransactionHash',
      request,
      metadata || {},
      methodDescriptor_MultisigService_GetPendingTransactionDetailByTransactionHash);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.GetMultisignatureInfoRequest,
 *   !proto.model.GetMultisignatureInfoResponse>}
 */
const methodDescriptor_MultisigService_GetMultisignatureInfo = new grpc.web.MethodDescriptor(
  '/service.MultisigService/GetMultisignatureInfo',
  grpc.web.MethodType.UNARY,
  model_multiSignature_pb.GetMultisignatureInfoRequest,
  model_multiSignature_pb.GetMultisignatureInfoResponse,
  /** @param {!proto.model.GetMultisignatureInfoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_multiSignature_pb.GetMultisignatureInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.GetMultisignatureInfoRequest,
 *   !proto.model.GetMultisignatureInfoResponse>}
 */
const methodInfo_MultisigService_GetMultisignatureInfo = new grpc.web.AbstractClientBase.MethodInfo(
  model_multiSignature_pb.GetMultisignatureInfoResponse,
  /** @param {!proto.model.GetMultisignatureInfoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_multiSignature_pb.GetMultisignatureInfoResponse.deserializeBinary
);


/**
 * @param {!proto.model.GetMultisignatureInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.GetMultisignatureInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.GetMultisignatureInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.MultisigServiceClient.prototype.getMultisignatureInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.MultisigService/GetMultisignatureInfo',
      request,
      metadata || {},
      methodDescriptor_MultisigService_GetMultisignatureInfo,
      callback);
};


/**
 * @param {!proto.model.GetMultisignatureInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.GetMultisignatureInfoResponse>}
 *     A native promise that resolves to the response
 */
proto.service.MultisigServicePromiseClient.prototype.getMultisignatureInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.MultisigService/GetMultisignatureInfo',
      request,
      metadata || {},
      methodDescriptor_MultisigService_GetMultisignatureInfo);
};


module.exports = proto.service;

