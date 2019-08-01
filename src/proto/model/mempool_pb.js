// source: model/mempool.proto
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

goog.exportSymbol('proto.model.GetMempoolTransactionRequest', null, global);
goog.exportSymbol('proto.model.GetMempoolTransactionsRequest', null, global);
goog.exportSymbol('proto.model.GetMempoolTransactionsResponse', null, global);
goog.exportSymbol('proto.model.MempoolTransaction', null, global);
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
proto.model.MempoolTransaction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.MempoolTransaction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.MempoolTransaction.displayName = 'proto.model.MempoolTransaction';
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
proto.model.GetMempoolTransactionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.GetMempoolTransactionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.GetMempoolTransactionRequest.displayName = 'proto.model.GetMempoolTransactionRequest';
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
proto.model.GetMempoolTransactionsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.GetMempoolTransactionsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.GetMempoolTransactionsRequest.displayName = 'proto.model.GetMempoolTransactionsRequest';
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
proto.model.GetMempoolTransactionsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.model.GetMempoolTransactionsResponse.repeatedFields_, null);
};
goog.inherits(proto.model.GetMempoolTransactionsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.GetMempoolTransactionsResponse.displayName = 'proto.model.GetMempoolTransactionsResponse';
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
proto.model.MempoolTransaction.prototype.toObject = function(opt_includeInstance) {
  return proto.model.MempoolTransaction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.MempoolTransaction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.MempoolTransaction.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    feeperbyte: jspb.Message.getFieldWithDefault(msg, 2, 0),
    arrivaltimestamp: jspb.Message.getFieldWithDefault(msg, 3, 0),
    transactionbytes: msg.getTransactionbytes_asB64()
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
 * @return {!proto.model.MempoolTransaction}
 */
proto.model.MempoolTransaction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.MempoolTransaction;
  return proto.model.MempoolTransaction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.MempoolTransaction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.MempoolTransaction}
 */
proto.model.MempoolTransaction.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {number} */ (reader.readInt32());
      msg.setFeeperbyte(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setArrivaltimestamp(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTransactionbytes(value);
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
proto.model.MempoolTransaction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.MempoolTransaction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.MempoolTransaction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.MempoolTransaction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      1,
      f
    );
  }
  f = message.getFeeperbyte();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getArrivaltimestamp();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getTransactionbytes_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
};


/**
 * optional int64 ID = 1;
 * @return {string}
 */
proto.model.MempoolTransaction.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/** @param {string} value */
proto.model.MempoolTransaction.prototype.setId = function(value) {
  jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * optional int32 FeePerByte = 2;
 * @return {number}
 */
proto.model.MempoolTransaction.prototype.getFeeperbyte = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.model.MempoolTransaction.prototype.setFeeperbyte = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 ArrivalTimestamp = 3;
 * @return {number}
 */
proto.model.MempoolTransaction.prototype.getArrivaltimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.model.MempoolTransaction.prototype.setArrivaltimestamp = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bytes TransactionBytes = 4;
 * @return {!(string|Uint8Array)}
 */
proto.model.MempoolTransaction.prototype.getTransactionbytes = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes TransactionBytes = 4;
 * This is a type-conversion wrapper around `getTransactionbytes()`
 * @return {string}
 */
proto.model.MempoolTransaction.prototype.getTransactionbytes_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTransactionbytes()));
};


/**
 * optional bytes TransactionBytes = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTransactionbytes()`
 * @return {!Uint8Array}
 */
proto.model.MempoolTransaction.prototype.getTransactionbytes_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTransactionbytes()));
};


/** @param {!(string|Uint8Array)} value */
proto.model.MempoolTransaction.prototype.setTransactionbytes = function(value) {
  jspb.Message.setProto3BytesField(this, 4, value);
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
proto.model.GetMempoolTransactionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.model.GetMempoolTransactionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.GetMempoolTransactionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetMempoolTransactionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    transactionbytes: msg.getTransactionbytes_asB64()
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
 * @return {!proto.model.GetMempoolTransactionRequest}
 */
proto.model.GetMempoolTransactionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.GetMempoolTransactionRequest;
  return proto.model.GetMempoolTransactionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.GetMempoolTransactionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.GetMempoolTransactionRequest}
 */
proto.model.GetMempoolTransactionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTransactionbytes(value);
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
proto.model.GetMempoolTransactionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.GetMempoolTransactionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.GetMempoolTransactionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetMempoolTransactionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransactionbytes_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes TransactionBytes = 1;
 * @return {!(string|Uint8Array)}
 */
proto.model.GetMempoolTransactionRequest.prototype.getTransactionbytes = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes TransactionBytes = 1;
 * This is a type-conversion wrapper around `getTransactionbytes()`
 * @return {string}
 */
proto.model.GetMempoolTransactionRequest.prototype.getTransactionbytes_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTransactionbytes()));
};


/**
 * optional bytes TransactionBytes = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTransactionbytes()`
 * @return {!Uint8Array}
 */
proto.model.GetMempoolTransactionRequest.prototype.getTransactionbytes_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTransactionbytes()));
};


/** @param {!(string|Uint8Array)} value */
proto.model.GetMempoolTransactionRequest.prototype.setTransactionbytes = function(value) {
  jspb.Message.setProto3BytesField(this, 1, value);
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
proto.model.GetMempoolTransactionsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.model.GetMempoolTransactionsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.GetMempoolTransactionsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetMempoolTransactionsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    from: jspb.Message.getFieldWithDefault(msg, 1, 0),
    to: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.model.GetMempoolTransactionsRequest}
 */
proto.model.GetMempoolTransactionsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.GetMempoolTransactionsRequest;
  return proto.model.GetMempoolTransactionsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.GetMempoolTransactionsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.GetMempoolTransactionsRequest}
 */
proto.model.GetMempoolTransactionsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFrom(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTo(value);
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
proto.model.GetMempoolTransactionsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.GetMempoolTransactionsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.GetMempoolTransactionsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetMempoolTransactionsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFrom();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getTo();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional int64 From = 1;
 * @return {number}
 */
proto.model.GetMempoolTransactionsRequest.prototype.getFrom = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.model.GetMempoolTransactionsRequest.prototype.setFrom = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 To = 2;
 * @return {number}
 */
proto.model.GetMempoolTransactionsRequest.prototype.getTo = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.model.GetMempoolTransactionsRequest.prototype.setTo = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.model.GetMempoolTransactionsResponse.repeatedFields_ = [2];



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
proto.model.GetMempoolTransactionsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.model.GetMempoolTransactionsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.GetMempoolTransactionsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetMempoolTransactionsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    mempoolsize: jspb.Message.getFieldWithDefault(msg, 1, 0),
    mempooltransactionsList: jspb.Message.toObjectList(msg.getMempooltransactionsList(),
    proto.model.MempoolTransaction.toObject, includeInstance)
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
 * @return {!proto.model.GetMempoolTransactionsResponse}
 */
proto.model.GetMempoolTransactionsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.GetMempoolTransactionsResponse;
  return proto.model.GetMempoolTransactionsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.GetMempoolTransactionsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.GetMempoolTransactionsResponse}
 */
proto.model.GetMempoolTransactionsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setMempoolsize(value);
      break;
    case 2:
      var value = new proto.model.MempoolTransaction;
      reader.readMessage(value,proto.model.MempoolTransaction.deserializeBinaryFromReader);
      msg.addMempooltransactions(value);
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
proto.model.GetMempoolTransactionsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.GetMempoolTransactionsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.GetMempoolTransactionsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GetMempoolTransactionsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMempoolsize();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getMempooltransactionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.model.MempoolTransaction.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 MempoolSize = 1;
 * @return {number}
 */
proto.model.GetMempoolTransactionsResponse.prototype.getMempoolsize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.model.GetMempoolTransactionsResponse.prototype.setMempoolsize = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated MempoolTransaction MempoolTransactions = 2;
 * @return {!Array<!proto.model.MempoolTransaction>}
 */
proto.model.GetMempoolTransactionsResponse.prototype.getMempooltransactionsList = function() {
  return /** @type{!Array<!proto.model.MempoolTransaction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.model.MempoolTransaction, 2));
};


/** @param {!Array<!proto.model.MempoolTransaction>} value */
proto.model.GetMempoolTransactionsResponse.prototype.setMempooltransactionsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.model.MempoolTransaction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.model.MempoolTransaction}
 */
proto.model.GetMempoolTransactionsResponse.prototype.addMempooltransactions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.model.MempoolTransaction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 */
proto.model.GetMempoolTransactionsResponse.prototype.clearMempooltransactionsList = function() {
  this.setMempooltransactionsList([]);
};


goog.object.extend(exports, proto.model);
