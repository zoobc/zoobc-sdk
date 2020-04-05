// source: model/escrow.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var model_pagination_pb = require('../model/pagination_pb.js');
goog.object.extend(proto, model_pagination_pb);
goog.exportSymbol('proto.model.Escrow', null, global);
goog.exportSymbol('proto.model.EscrowApproval', null, global);
goog.exportSymbol('proto.model.EscrowStatus', null, global);
goog.exportSymbol('proto.model.GetEscrowTransactionRequest', null, global);
goog.exportSymbol('proto.model.GetEscrowTransactionsRequest', null, global);
goog.exportSymbol('proto.model.GetEscrowTransactionsResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.model.Escrow = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.Escrow, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.Escrow.displayName = 'proto.model.Escrow';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.model.GetEscrowTransactionsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.model.GetEscrowTransactionsRequest.repeatedFields_, null);
};
goog.inherits(proto.model.GetEscrowTransactionsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.GetEscrowTransactionsRequest.displayName = 'proto.model.GetEscrowTransactionsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.model.GetEscrowTransactionsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.model.GetEscrowTransactionsResponse.repeatedFields_, null);
};
goog.inherits(proto.model.GetEscrowTransactionsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.GetEscrowTransactionsResponse.displayName = 'proto.model.GetEscrowTransactionsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.model.GetEscrowTransactionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.GetEscrowTransactionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.GetEscrowTransactionRequest.displayName = 'proto.model.GetEscrowTransactionRequest';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.model.Escrow.prototype.toObject = function(opt_includeInstance) {
  return proto.model.Escrow.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.Escrow} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.Escrow.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    senderaddress: jspb.Message.getFieldWithDefault(msg, 2, ""),
    recipientaddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
    approveraddress: jspb.Message.getFieldWithDefault(msg, 4, ""),
    amount: jspb.Message.getFieldWithDefault(msg, 5, "0"),
    commission: jspb.Message.getFieldWithDefault(msg, 6, "0"),
    timeout: jspb.Message.getFieldWithDefault(msg, 7, "0"),
    status: jspb.Message.getFieldWithDefault(msg, 8, 0),
    blockheight: jspb.Message.getFieldWithDefault(msg, 9, 0),
    latest: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
    instruction: jspb.Message.getFieldWithDefault(msg, 11, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.model.Escrow}
 */
proto.model.Escrow.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.Escrow;
  return proto.model.Escrow.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.Escrow} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.Escrow}
 */
proto.model.Escrow.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSenderaddress(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setRecipientaddress(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setApproveraddress(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setAmount(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setCommission(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setTimeout(value);
      break;
    case 8:
      var value = /** @type {!proto.model.EscrowStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBlockheight(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setLatest(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setInstruction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.model.Escrow.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.Escrow.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.Escrow} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.Escrow.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      1,
      f
    );
  }
  f = message.getSenderaddress();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRecipientaddress();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getApproveraddress();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getAmount();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      5,
      f
    );
  }
  f = message.getCommission();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      6,
      f
    );
  }
  f = message.getTimeout();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      7,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      8,
      f
    );
  }
  f = message.getBlockheight();
  if (f !== 0) {
    writer.writeUint32(
      9,
      f
    );
  }
  f = message.getLatest();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getInstruction();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
};


/**
 * optional int64 ID = 1;
 * @return {string}
 */
proto.model.Escrow.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/** @param {string} value */
proto.model.Escrow.prototype.setId = function(value) {
  jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * optional string SenderAddress = 2;
 * @return {string}
 */
proto.model.Escrow.prototype.getSenderaddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.model.Escrow.prototype.setSenderaddress = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string RecipientAddress = 3;
 * @return {string}
 */
proto.model.Escrow.prototype.getRecipientaddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.model.Escrow.prototype.setRecipientaddress = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string ApproverAddress = 4;
 * @return {string}
 */
proto.model.Escrow.prototype.getApproveraddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.model.Escrow.prototype.setApproveraddress = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional int64 Amount = 5;
 * @return {string}
 */
proto.model.Escrow.prototype.getAmount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, "0"));
};


/** @param {string} value */
proto.model.Escrow.prototype.setAmount = function(value) {
  jspb.Message.setProto3StringIntField(this, 5, value);
};


/**
 * optional int64 Commission = 6;
 * @return {string}
 */
proto.model.Escrow.prototype.getCommission = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, "0"));
};


/** @param {string} value */
proto.model.Escrow.prototype.setCommission = function(value) {
  jspb.Message.setProto3StringIntField(this, 6, value);
};


/**
 * optional uint64 Timeout = 7;
 * @return {string}
 */
proto.model.Escrow.prototype.getTimeout = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, "0"));
};


/** @param {string} value */
proto.model.Escrow.prototype.setTimeout = function(value) {
  jspb.Message.setProto3StringIntField(this, 7, value);
};


/**
 * optional EscrowStatus Status = 8;
 * @return {!proto.model.EscrowStatus}
 */
proto.model.Escrow.prototype.getStatus = function() {
  return /** @type {!proto.model.EscrowStatus} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/** @param {!proto.model.EscrowStatus} value */
proto.model.Escrow.prototype.setStatus = function(value) {
  jspb.Message.setProto3EnumField(this, 8, value);
};


/**
 * optional uint32 BlockHeight = 9;
 * @return {number}
 */
proto.model.Escrow.prototype.getBlockheight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/** @param {number} value */
proto.model.Escrow.prototype.setBlockheight = function(value) {
  jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional bool Latest = 10;
 * @return {boolean}
 */
proto.model.Escrow.prototype.getLatest = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/** @param {boolean} value */
proto.model.Escrow.prototype.setLatest = function(value) {
  jspb.Message.setProto3BooleanField(this, 10, value);
};


/**
 * optional string Instruction = 11;
 * @return {string}
 */
proto.model.Escrow.prototype.getInstruction = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/** @param {string} value */
proto.model.Escrow.prototype.setInstruction = function(value) {
  jspb.Message.setProto3StringField(this, 11, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.model.GetEscrowTransactionsRequest.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.model.GetEscrowTransactionsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.model.GetEscrowTransactionsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.GetEscrowTransactionsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetEscrowTransactionsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    approveraddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
    id: jspb.Message.getFieldWithDefault(msg, 2, "0"),
    statusesList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    blockheightstart: jspb.Message.getFieldWithDefault(msg, 4, 0),
    blockheightend: jspb.Message.getFieldWithDefault(msg, 5, 0),
    pagination: (f = msg.getPagination()) && model_pagination_pb.Pagination.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.model.GetEscrowTransactionsRequest}
 */
proto.model.GetEscrowTransactionsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.GetEscrowTransactionsRequest;
  return proto.model.GetEscrowTransactionsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.GetEscrowTransactionsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.GetEscrowTransactionsRequest}
 */
proto.model.GetEscrowTransactionsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setApproveraddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setId(value);
      break;
    case 3:
      var value = /** @type {!Array<!proto.model.EscrowStatus>} */ (reader.readPackedEnum());
      msg.setStatusesList(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBlockheightstart(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBlockheightend(value);
      break;
    case 6:
      var value = new model_pagination_pb.Pagination;
      reader.readMessage(value,model_pagination_pb.Pagination.deserializeBinaryFromReader);
      msg.setPagination(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.model.GetEscrowTransactionsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.GetEscrowTransactionsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.GetEscrowTransactionsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetEscrowTransactionsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getApproveraddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getId();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      2,
      f
    );
  }
  f = message.getStatusesList();
  if (f.length > 0) {
    writer.writePackedEnum(
      3,
      f
    );
  }
  f = message.getBlockheightstart();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = message.getBlockheightend();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
  f = message.getPagination();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      model_pagination_pb.Pagination.serializeBinaryToWriter
    );
  }
};


/**
 * optional string ApproverAddress = 1;
 * @return {string}
 */
proto.model.GetEscrowTransactionsRequest.prototype.getApproveraddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.model.GetEscrowTransactionsRequest.prototype.setApproveraddress = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 ID = 2;
 * @return {string}
 */
proto.model.GetEscrowTransactionsRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, "0"));
};


/** @param {string} value */
proto.model.GetEscrowTransactionsRequest.prototype.setId = function(value) {
  jspb.Message.setProto3StringIntField(this, 2, value);
};


/**
 * repeated EscrowStatus Statuses = 3;
 * @return {!Array<!proto.model.EscrowStatus>}
 */
proto.model.GetEscrowTransactionsRequest.prototype.getStatusesList = function() {
  return /** @type {!Array<!proto.model.EscrowStatus>} */ (jspb.Message.getRepeatedField(this, 3));
};


/** @param {!Array<!proto.model.EscrowStatus>} value */
proto.model.GetEscrowTransactionsRequest.prototype.setStatusesList = function(value) {
  jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {!proto.model.EscrowStatus} value
 * @param {number=} opt_index
 */
proto.model.GetEscrowTransactionsRequest.prototype.addStatuses = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 */
proto.model.GetEscrowTransactionsRequest.prototype.clearStatusesList = function() {
  this.setStatusesList([]);
};


/**
 * optional uint32 BlockHeightStart = 4;
 * @return {number}
 */
proto.model.GetEscrowTransactionsRequest.prototype.getBlockheightstart = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.model.GetEscrowTransactionsRequest.prototype.setBlockheightstart = function(value) {
  jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint32 BlockHeightEnd = 5;
 * @return {number}
 */
proto.model.GetEscrowTransactionsRequest.prototype.getBlockheightend = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.model.GetEscrowTransactionsRequest.prototype.setBlockheightend = function(value) {
  jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional Pagination Pagination = 6;
 * @return {?proto.model.Pagination}
 */
proto.model.GetEscrowTransactionsRequest.prototype.getPagination = function() {
  return /** @type{?proto.model.Pagination} */ (
    jspb.Message.getWrapperField(this, model_pagination_pb.Pagination, 6));
};


/** @param {?proto.model.Pagination|undefined} value */
proto.model.GetEscrowTransactionsRequest.prototype.setPagination = function(value) {
  jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.model.GetEscrowTransactionsRequest.prototype.clearPagination = function() {
  this.setPagination(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.model.GetEscrowTransactionsRequest.prototype.hasPagination = function() {
  return jspb.Message.getField(this, 6) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.model.GetEscrowTransactionsResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.model.GetEscrowTransactionsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.model.GetEscrowTransactionsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.GetEscrowTransactionsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetEscrowTransactionsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    total: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    escrowsList: jspb.Message.toObjectList(msg.getEscrowsList(),
    proto.model.Escrow.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.model.GetEscrowTransactionsResponse}
 */
proto.model.GetEscrowTransactionsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.GetEscrowTransactionsResponse;
  return proto.model.GetEscrowTransactionsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.GetEscrowTransactionsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.GetEscrowTransactionsResponse}
 */
proto.model.GetEscrowTransactionsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setTotal(value);
      break;
    case 2:
      var value = new proto.model.Escrow;
      reader.readMessage(value,proto.model.Escrow.deserializeBinaryFromReader);
      msg.addEscrows(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.model.GetEscrowTransactionsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.GetEscrowTransactionsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.GetEscrowTransactionsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetEscrowTransactionsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTotal();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      1,
      f
    );
  }
  f = message.getEscrowsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.model.Escrow.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint64 Total = 1;
 * @return {string}
 */
proto.model.GetEscrowTransactionsResponse.prototype.getTotal = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/** @param {string} value */
proto.model.GetEscrowTransactionsResponse.prototype.setTotal = function(value) {
  jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * repeated Escrow Escrows = 2;
 * @return {!Array<!proto.model.Escrow>}
 */
proto.model.GetEscrowTransactionsResponse.prototype.getEscrowsList = function() {
  return /** @type{!Array<!proto.model.Escrow>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.model.Escrow, 2));
};


/** @param {!Array<!proto.model.Escrow>} value */
proto.model.GetEscrowTransactionsResponse.prototype.setEscrowsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.model.Escrow=} opt_value
 * @param {number=} opt_index
 * @return {!proto.model.Escrow}
 */
proto.model.GetEscrowTransactionsResponse.prototype.addEscrows = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.model.Escrow, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 */
proto.model.GetEscrowTransactionsResponse.prototype.clearEscrowsList = function() {
  this.setEscrowsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.model.GetEscrowTransactionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.model.GetEscrowTransactionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.GetEscrowTransactionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetEscrowTransactionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "0")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.model.GetEscrowTransactionRequest}
 */
proto.model.GetEscrowTransactionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.GetEscrowTransactionRequest;
  return proto.model.GetEscrowTransactionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.GetEscrowTransactionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.GetEscrowTransactionRequest}
 */
proto.model.GetEscrowTransactionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.model.GetEscrowTransactionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.GetEscrowTransactionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.GetEscrowTransactionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetEscrowTransactionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      1,
      f
    );
  }
};


/**
 * optional int64 ID = 1;
 * @return {string}
 */
proto.model.GetEscrowTransactionRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/** @param {string} value */
proto.model.GetEscrowTransactionRequest.prototype.setId = function(value) {
  jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * @enum {number}
 */
proto.model.EscrowStatus = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
  EXPIRED: 3
};

/**
 * @enum {number}
 */
proto.model.EscrowApproval = {
  APPROVE: 0,
  REJECT: 1
};

goog.object.extend(exports, proto.model);
