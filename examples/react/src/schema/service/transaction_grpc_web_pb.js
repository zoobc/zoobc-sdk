/**
 * @fileoverview gRPC-Web generated client stub for service
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */

const grpc = {};
grpc.web = require('grpc-web');


var model_transaction_pb = require('../model/transaction_pb.js')
const proto = {};
proto.service = require('./transaction_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.service.TransactionServiceClient =
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
proto.service.TransactionServicePromiseClient =
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
 *   !proto.model.GetTransactionsByAccountPublicKeyRequest,
 *   !proto.model.GetTransactionsResponse>}
 */
const methodDescriptor_TransactionService_GetTransactionsByAccountPublicKey = new grpc.web.MethodDescriptor(
  '/service.TransactionService/GetTransactionsByAccountPublicKey',
  grpc.web.MethodType.UNARY,
  model_transaction_pb.GetTransactionsByAccountPublicKeyRequest,
  model_transaction_pb.GetTransactionsResponse,
  /** @param {!proto.model.GetTransactionsByAccountPublicKeyRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_transaction_pb.GetTransactionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.GetTransactionsByAccountPublicKeyRequest,
 *   !proto.model.GetTransactionsResponse>}
 */
const methodInfo_TransactionService_GetTransactionsByAccountPublicKey = new grpc.web.AbstractClientBase.MethodInfo(
  model_transaction_pb.GetTransactionsResponse,
  /** @param {!proto.model.GetTransactionsByAccountPublicKeyRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_transaction_pb.GetTransactionsResponse.deserializeBinary
);


/**
 * @param {!proto.model.GetTransactionsByAccountPublicKeyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.GetTransactionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.GetTransactionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.TransactionServiceClient.prototype.getTransactionsByAccountPublicKey =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.TransactionService/GetTransactionsByAccountPublicKey',
      request,
      metadata || {},
      methodDescriptor_TransactionService_GetTransactionsByAccountPublicKey,
      callback);
};


/**
 * @param {!proto.model.GetTransactionsByAccountPublicKeyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.GetTransactionsResponse>}
 *     A native promise that resolves to the response
 */
proto.service.TransactionServicePromiseClient.prototype.getTransactionsByAccountPublicKey =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.TransactionService/GetTransactionsByAccountPublicKey',
      request,
      metadata || {},
      methodDescriptor_TransactionService_GetTransactionsByAccountPublicKey);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.GetTransactionsByBlockIDRequest,
 *   !proto.model.GetTransactionsResponse>}
 */
const methodDescriptor_TransactionService_GetTransactionsByBlockID = new grpc.web.MethodDescriptor(
  '/service.TransactionService/GetTransactionsByBlockID',
  grpc.web.MethodType.UNARY,
  model_transaction_pb.GetTransactionsByBlockIDRequest,
  model_transaction_pb.GetTransactionsResponse,
  /** @param {!proto.model.GetTransactionsByBlockIDRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_transaction_pb.GetTransactionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.GetTransactionsByBlockIDRequest,
 *   !proto.model.GetTransactionsResponse>}
 */
const methodInfo_TransactionService_GetTransactionsByBlockID = new grpc.web.AbstractClientBase.MethodInfo(
  model_transaction_pb.GetTransactionsResponse,
  /** @param {!proto.model.GetTransactionsByBlockIDRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_transaction_pb.GetTransactionsResponse.deserializeBinary
);


/**
 * @param {!proto.model.GetTransactionsByBlockIDRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.GetTransactionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.GetTransactionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.TransactionServiceClient.prototype.getTransactionsByBlockID =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.TransactionService/GetTransactionsByBlockID',
      request,
      metadata || {},
      methodDescriptor_TransactionService_GetTransactionsByBlockID,
      callback);
};


/**
 * @param {!proto.model.GetTransactionsByBlockIDRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.GetTransactionsResponse>}
 *     A native promise that resolves to the response
 */
proto.service.TransactionServicePromiseClient.prototype.getTransactionsByBlockID =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.TransactionService/GetTransactionsByBlockID',
      request,
      metadata || {},
      methodDescriptor_TransactionService_GetTransactionsByBlockID);
};


module.exports = proto.service;

