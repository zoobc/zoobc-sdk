/**
 * @fileoverview gRPC-Web generated client stub for service
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var model_peer_pb = require('../model/peer_pb.js')

var model_node_pb = require('../model/node_pb.js')

var model_empty_pb = require('../model/empty_pb.js')

var model_block_pb = require('../model/block_pb.js')

var model_transaction_pb = require('../model/transaction_pb.js')
const proto = {};
proto.service = require('./p2pCommunication_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.service.P2PCommunicationClient =
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
proto.service.P2PCommunicationPromiseClient =
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
 *   !proto.model.GetPeerInfoRequest,
 *   !proto.model.Node>}
 */
const methodDescriptor_P2PCommunication_GetPeerInfo = new grpc.web.MethodDescriptor(
  '/service.P2PCommunication/GetPeerInfo',
  grpc.web.MethodType.UNARY,
  model_peer_pb.GetPeerInfoRequest,
  model_node_pb.Node,
  /** @param {!proto.model.GetPeerInfoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_node_pb.Node.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.GetPeerInfoRequest,
 *   !proto.model.Node>}
 */
const methodInfo_P2PCommunication_GetPeerInfo = new grpc.web.AbstractClientBase.MethodInfo(
  model_node_pb.Node,
  /** @param {!proto.model.GetPeerInfoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_node_pb.Node.deserializeBinary
);


/**
 * @param {!proto.model.GetPeerInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.Node)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.Node>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.P2PCommunicationClient.prototype.getPeerInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.P2PCommunication/GetPeerInfo',
      request,
      metadata || {},
      methodDescriptor_P2PCommunication_GetPeerInfo,
      callback);
};


/**
 * @param {!proto.model.GetPeerInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.Node>}
 *     A native promise that resolves to the response
 */
proto.service.P2PCommunicationPromiseClient.prototype.getPeerInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.P2PCommunication/GetPeerInfo',
      request,
      metadata || {},
      methodDescriptor_P2PCommunication_GetPeerInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.Empty,
 *   !proto.model.GetMorePeersResponse>}
 */
const methodDescriptor_P2PCommunication_GetMorePeers = new grpc.web.MethodDescriptor(
  '/service.P2PCommunication/GetMorePeers',
  grpc.web.MethodType.UNARY,
  model_empty_pb.Empty,
  model_peer_pb.GetMorePeersResponse,
  /** @param {!proto.model.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  model_peer_pb.GetMorePeersResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.Empty,
 *   !proto.model.GetMorePeersResponse>}
 */
const methodInfo_P2PCommunication_GetMorePeers = new grpc.web.AbstractClientBase.MethodInfo(
  model_peer_pb.GetMorePeersResponse,
  /** @param {!proto.model.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  model_peer_pb.GetMorePeersResponse.deserializeBinary
);


/**
 * @param {!proto.model.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.GetMorePeersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.GetMorePeersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.P2PCommunicationClient.prototype.getMorePeers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.P2PCommunication/GetMorePeers',
      request,
      metadata || {},
      methodDescriptor_P2PCommunication_GetMorePeers,
      callback);
};


/**
 * @param {!proto.model.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.GetMorePeersResponse>}
 *     A native promise that resolves to the response
 */
proto.service.P2PCommunicationPromiseClient.prototype.getMorePeers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.P2PCommunication/GetMorePeers',
      request,
      metadata || {},
      methodDescriptor_P2PCommunication_GetMorePeers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.SendPeersRequest,
 *   !proto.model.Empty>}
 */
const methodDescriptor_P2PCommunication_SendPeers = new grpc.web.MethodDescriptor(
  '/service.P2PCommunication/SendPeers',
  grpc.web.MethodType.UNARY,
  model_peer_pb.SendPeersRequest,
  model_empty_pb.Empty,
  /** @param {!proto.model.SendPeersRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.SendPeersRequest,
 *   !proto.model.Empty>}
 */
const methodInfo_P2PCommunication_SendPeers = new grpc.web.AbstractClientBase.MethodInfo(
  model_empty_pb.Empty,
  /** @param {!proto.model.SendPeersRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.model.SendPeersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.P2PCommunicationClient.prototype.sendPeers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.P2PCommunication/SendPeers',
      request,
      metadata || {},
      methodDescriptor_P2PCommunication_SendPeers,
      callback);
};


/**
 * @param {!proto.model.SendPeersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.Empty>}
 *     A native promise that resolves to the response
 */
proto.service.P2PCommunicationPromiseClient.prototype.sendPeers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.P2PCommunication/SendPeers',
      request,
      metadata || {},
      methodDescriptor_P2PCommunication_SendPeers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.Block,
 *   !proto.model.Empty>}
 */
const methodDescriptor_P2PCommunication_SendBlock = new grpc.web.MethodDescriptor(
  '/service.P2PCommunication/SendBlock',
  grpc.web.MethodType.UNARY,
  model_block_pb.Block,
  model_empty_pb.Empty,
  /** @param {!proto.model.Block} request */
  function(request) {
    return request.serializeBinary();
  },
  model_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.Block,
 *   !proto.model.Empty>}
 */
const methodInfo_P2PCommunication_SendBlock = new grpc.web.AbstractClientBase.MethodInfo(
  model_empty_pb.Empty,
  /** @param {!proto.model.Block} request */
  function(request) {
    return request.serializeBinary();
  },
  model_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.model.Block} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.P2PCommunicationClient.prototype.sendBlock =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.P2PCommunication/SendBlock',
      request,
      metadata || {},
      methodDescriptor_P2PCommunication_SendBlock,
      callback);
};


/**
 * @param {!proto.model.Block} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.Empty>}
 *     A native promise that resolves to the response
 */
proto.service.P2PCommunicationPromiseClient.prototype.sendBlock =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.P2PCommunication/SendBlock',
      request,
      metadata || {},
      methodDescriptor_P2PCommunication_SendBlock);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.model.SendTransactionRequest,
 *   !proto.model.Empty>}
 */
const methodDescriptor_P2PCommunication_SendTransaction = new grpc.web.MethodDescriptor(
  '/service.P2PCommunication/SendTransaction',
  grpc.web.MethodType.UNARY,
  model_transaction_pb.SendTransactionRequest,
  model_empty_pb.Empty,
  /** @param {!proto.model.SendTransactionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.SendTransactionRequest,
 *   !proto.model.Empty>}
 */
const methodInfo_P2PCommunication_SendTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  model_empty_pb.Empty,
  /** @param {!proto.model.SendTransactionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  model_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.model.SendTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.P2PCommunicationClient.prototype.sendTransaction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.P2PCommunication/SendTransaction',
      request,
      metadata || {},
      methodDescriptor_P2PCommunication_SendTransaction,
      callback);
};


/**
 * @param {!proto.model.SendTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.Empty>}
 *     A native promise that resolves to the response
 */
proto.service.P2PCommunicationPromiseClient.prototype.sendTransaction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.P2PCommunication/SendTransaction',
      request,
      metadata || {},
      methodDescriptor_P2PCommunication_SendTransaction);
};


module.exports = proto.service;

