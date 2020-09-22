// source: model/liquidPayment.proto
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

goog.exportSymbol('proto.model.LiquidPayment', null, global);
goog.exportSymbol('proto.model.LiquidPaymentStatus', null, global);
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
proto.model.LiquidPayment = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.LiquidPayment, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.LiquidPayment.displayName = 'proto.model.LiquidPayment';
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
proto.model.LiquidPayment.prototype.toObject = function(opt_includeInstance) {
  return proto.model.LiquidPayment.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.LiquidPayment} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.LiquidPayment.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "0"),
    senderaddress: jspb.Message.getFieldWithDefault(msg, 2, ""),
    recipientaddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
    amount: jspb.Message.getFieldWithDefault(msg, 4, "0"),
    appliedtime: jspb.Message.getFieldWithDefault(msg, 5, "0"),
    completeminutes: jspb.Message.getFieldWithDefault(msg, 6, "0"),
    status: jspb.Message.getFieldWithDefault(msg, 7, 0),
    blockheight: jspb.Message.getFieldWithDefault(msg, 8, 0),
    latest: jspb.Message.getBooleanFieldWithDefault(msg, 9, false)
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
 * @return {!proto.model.LiquidPayment}
 */
proto.model.LiquidPayment.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.LiquidPayment;
  return proto.model.LiquidPayment.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.LiquidPayment} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.LiquidPayment}
 */
proto.model.LiquidPayment.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setAmount(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setAppliedtime(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readUint64String());
      msg.setCompleteminutes(value);
      break;
    case 7:
      var value = /** @type {!proto.model.LiquidPaymentStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBlockheight(value);
      break;
    case 9:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setLatest(value);
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
proto.model.LiquidPayment.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.LiquidPayment.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.LiquidPayment} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.LiquidPayment.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getAmount();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      4,
      f
    );
  }
  f = message.getAppliedtime();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      5,
      f
    );
  }
  f = message.getCompleteminutes();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(
      6,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
  f = message.getBlockheight();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
  f = message.getLatest();
  if (f) {
    writer.writeBool(
      9,
      f
    );
  }
};


/**
 * optional int64 ID = 1;
 * @return {string}
 */
proto.model.LiquidPayment.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, "0"));
};


/** @param {string} value */
proto.model.LiquidPayment.prototype.setId = function(value) {
  jspb.Message.setProto3StringIntField(this, 1, value);
};


/**
 * optional string SenderAddress = 2;
 * @return {string}
 */
proto.model.LiquidPayment.prototype.getSenderaddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.model.LiquidPayment.prototype.setSenderaddress = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string RecipientAddress = 3;
 * @return {string}
 */
proto.model.LiquidPayment.prototype.getRecipientaddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.model.LiquidPayment.prototype.setRecipientaddress = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 Amount = 4;
 * @return {string}
 */
proto.model.LiquidPayment.prototype.getAmount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, "0"));
};


/** @param {string} value */
proto.model.LiquidPayment.prototype.setAmount = function(value) {
  jspb.Message.setProto3StringIntField(this, 4, value);
};


/**
 * optional int64 AppliedTime = 5;
 * @return {string}
 */
proto.model.LiquidPayment.prototype.getAppliedtime = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, "0"));
};


/** @param {string} value */
proto.model.LiquidPayment.prototype.setAppliedtime = function(value) {
  jspb.Message.setProto3StringIntField(this, 5, value);
};


/**
 * optional uint64 CompleteMinutes = 6;
 * @return {string}
 */
proto.model.LiquidPayment.prototype.getCompleteminutes = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, "0"));
};


/** @param {string} value */
proto.model.LiquidPayment.prototype.setCompleteminutes = function(value) {
  jspb.Message.setProto3StringIntField(this, 6, value);
};


/**
 * optional LiquidPaymentStatus Status = 7;
 * @return {!proto.model.LiquidPaymentStatus}
 */
proto.model.LiquidPayment.prototype.getStatus = function() {
  return /** @type {!proto.model.LiquidPaymentStatus} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/** @param {!proto.model.LiquidPaymentStatus} value */
proto.model.LiquidPayment.prototype.setStatus = function(value) {
  jspb.Message.setProto3EnumField(this, 7, value);
};


/**
 * optional uint32 BlockHeight = 8;
 * @return {number}
 */
proto.model.LiquidPayment.prototype.getBlockheight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/** @param {number} value */
proto.model.LiquidPayment.prototype.setBlockheight = function(value) {
  jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional bool Latest = 9;
 * @return {boolean}
 */
proto.model.LiquidPayment.prototype.getLatest = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 9, false));
};


/** @param {boolean} value */
proto.model.LiquidPayment.prototype.setLatest = function(value) {
  jspb.Message.setProto3BooleanField(this, 9, value);
};


/**
 * @enum {number}
 */
proto.model.LiquidPaymentStatus = {
  LIQUIDPAYMENTPENDING: 0,
  LIQUIDPAYMENTCOMPLETED: 1
};

goog.object.extend(exports, proto.model);
