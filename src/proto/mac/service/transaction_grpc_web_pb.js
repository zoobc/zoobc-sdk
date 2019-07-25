/**
 * @fileoverview gRPC-Web generated client stub for service
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



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
 *   !proto.model.GetTransactionsRequest,
 *   !proto.model.GetTransactionsResponse>}
 */
const methodDescriptor_TransactionService_GetTransactions = new grpc.web.MethodDescriptor(
  '/service.TransactionService/GetTransactions',
  grpc.web.MethodType.UNARY,
  model_transaction_pb.GetTransactionsRequest,
  model_transaction_pb.GetTransactionsResponse,
  /** @param {!proto.model.GetTransactionsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_transaction_pb.GetTransactionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.GetTransactionsRequest,
 *   !proto.model.GetTransactionsResponse>}
 */
const methodInfo_TransactionService_GetTransactions = new grpc.web.AbstractClientBase.MethodInfo(
  model_transaction_pb.GetTransactionsResponse,
  /** @param {!proto.model.GetTransactionsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_transaction_pb.GetTransactionsResponse.deserializeBinary
);


/**
 * @param {!proto.model.GetTransactionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.GetTransactionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.GetTransactionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.TransactionServiceClient.prototype.getTransactions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.TransactionService/GetTransactions',
      request,
      metadata || {},
      methodDescriptor_TransactionService_GetTransactions,
      callback);
};


/**
 * @param {!proto.model.GetTransactionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.GetTransactionsResponse>}
 *     A native promise that resolves to the response
 */
proto.service.TransactionServicePromiseClient.prototype.getTransactions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.TransactionService/GetTransactions',
      request,
      metadata || {},
      methodDescriptor_TransactionService_GetTransactions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.GetTransactionRequest,
 *   !proto.model.Transaction>}
 */
const methodDescriptor_TransactionService_GetTransaction = new grpc.web.MethodDescriptor(
  '/service.TransactionService/GetTransaction',
  grpc.web.MethodType.UNARY,
  model_transaction_pb.GetTransactionRequest,
  model_transaction_pb.Transaction,
  /** @param {!proto.model.GetTransactionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_transaction_pb.Transaction.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.GetTransactionRequest,
 *   !proto.model.Transaction>}
 */
const methodInfo_TransactionService_GetTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  model_transaction_pb.Transaction,
  /** @param {!proto.model.GetTransactionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_transaction_pb.Transaction.deserializeBinary
);


/**
 * @param {!proto.model.GetTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.Transaction)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.Transaction>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.TransactionServiceClient.prototype.getTransaction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.TransactionService/GetTransaction',
      request,
      metadata || {},
      methodDescriptor_TransactionService_GetTransaction,
      callback);
};


/**
 * @param {!proto.model.GetTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.Transaction>}
 *     A native promise that resolves to the response
 */
proto.service.TransactionServicePromiseClient.prototype.getTransaction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.TransactionService/GetTransaction',
      request,
      metadata || {},
      methodDescriptor_TransactionService_GetTransaction);
};


module.exports = proto.service;

