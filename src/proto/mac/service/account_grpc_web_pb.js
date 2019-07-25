/**
 * @fileoverview gRPC-Web generated client stub for service
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var model_account_pb = require('../model/account_pb.js')
const proto = {};
proto.service = require('./account_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.service.AccountServiceClient =
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
proto.service.AccountServicePromiseClient =
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
 *   !proto.model.GetAccountsRequest,
 *   !proto.model.GetAccountsResponse>}
 */
const methodDescriptor_AccountService_GetAccounts = new grpc.web.MethodDescriptor(
  '/service.AccountService/GetAccounts',
  grpc.web.MethodType.UNARY,
  model_account_pb.GetAccountsRequest,
  model_account_pb.GetAccountsResponse,
  /** @param {!proto.model.GetAccountsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_account_pb.GetAccountsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.GetAccountsRequest,
 *   !proto.model.GetAccountsResponse>}
 */
const methodInfo_AccountService_GetAccounts = new grpc.web.AbstractClientBase.MethodInfo(
  model_account_pb.GetAccountsResponse,
  /** @param {!proto.model.GetAccountsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_account_pb.GetAccountsResponse.deserializeBinary
);


/**
 * @param {!proto.model.GetAccountsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.GetAccountsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.GetAccountsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.AccountServiceClient.prototype.getAccounts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.AccountService/GetAccounts',
      request,
      metadata || {},
      methodDescriptor_AccountService_GetAccounts,
      callback);
};


/**
 * @param {!proto.model.GetAccountsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.GetAccountsResponse>}
 *     A native promise that resolves to the response
 */
proto.service.AccountServicePromiseClient.prototype.getAccounts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.AccountService/GetAccounts',
      request,
      metadata || {},
      methodDescriptor_AccountService_GetAccounts);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.GetAccountRequest,
 *   !proto.model.Account>}
 */
const methodDescriptor_AccountService_GetAccount = new grpc.web.MethodDescriptor(
  '/service.AccountService/GetAccount',
  grpc.web.MethodType.UNARY,
  model_account_pb.GetAccountRequest,
  model_account_pb.Account,
  /** @param {!proto.model.GetAccountRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_account_pb.Account.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.GetAccountRequest,
 *   !proto.model.Account>}
 */
const methodInfo_AccountService_GetAccount = new grpc.web.AbstractClientBase.MethodInfo(
  model_account_pb.Account,
  /** @param {!proto.model.GetAccountRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_account_pb.Account.deserializeBinary
);


/**
 * @param {!proto.model.GetAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.Account)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.Account>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.AccountServiceClient.prototype.getAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.AccountService/GetAccount',
      request,
      metadata || {},
      methodDescriptor_AccountService_GetAccount,
      callback);
};


/**
 * @param {!proto.model.GetAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.Account>}
 *     A native promise that resolves to the response
 */
proto.service.AccountServicePromiseClient.prototype.getAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.AccountService/GetAccount',
      request,
      metadata || {},
      methodDescriptor_AccountService_GetAccount);
};


module.exports = proto.service;

