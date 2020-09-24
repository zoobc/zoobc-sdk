/**
 * @fileoverview gRPC-Web generated client stub for service
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var model_nodeHardware_pb = require('../model/nodeHardware_pb.js')

var google_api_annotations_pb = require('../google/api/annotations_pb.js')

var model_empty_pb = require('../model/empty_pb.js')
const proto = {};
proto.service = require('./nodeHardware_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.service.NodeHardwareServiceClient =
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
proto.service.NodeHardwareServicePromiseClient =
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
 *   !proto.model.Empty,
 *   !proto.model.GetNodeTimeResponse>}
 */
const methodDescriptor_NodeHardwareService_GetNodeTime = new grpc.web.MethodDescriptor(
  '/service.NodeHardwareService/GetNodeTime',
  grpc.web.MethodType.UNARY,
  model_empty_pb.Empty,
  model_nodeHardware_pb.GetNodeTimeResponse,
  /** @param {!proto.model.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  model_nodeHardware_pb.GetNodeTimeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.model.Empty,
 *   !proto.model.GetNodeTimeResponse>}
 */
const methodInfo_NodeHardwareService_GetNodeTime = new grpc.web.AbstractClientBase.MethodInfo(
  model_nodeHardware_pb.GetNodeTimeResponse,
  /** @param {!proto.model.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  model_nodeHardware_pb.GetNodeTimeResponse.deserializeBinary
);


/**
 * @param {!proto.model.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.model.GetNodeTimeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.model.GetNodeTimeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.service.NodeHardwareServiceClient.prototype.getNodeTime =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/service.NodeHardwareService/GetNodeTime',
      request,
      metadata || {},
      methodDescriptor_NodeHardwareService_GetNodeTime,
      callback);
};


/**
 * @param {!proto.model.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.model.GetNodeTimeResponse>}
 *     A native promise that resolves to the response
 */
proto.service.NodeHardwareServicePromiseClient.prototype.getNodeTime =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/service.NodeHardwareService/GetNodeTime',
      request,
      metadata || {},
      methodDescriptor_NodeHardwareService_GetNodeTime);
};


module.exports = proto.service;

