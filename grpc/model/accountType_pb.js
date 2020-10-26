// source: model/accountType.proto
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

goog.exportSymbol('proto.model.AccountAddress', null, global);
goog.exportSymbol('proto.model.AccountType', null, global);
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
proto.model.AccountAddress = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.AccountAddress, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.AccountAddress.displayName = 'proto.model.AccountAddress';
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
proto.model.AccountAddress.prototype.toObject = function(opt_includeInstance) {
  return proto.model.AccountAddress.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.AccountAddress} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.AccountAddress.toObject = function(includeInstance, msg) {
  var f, obj = {
    accountaddress: msg.getAccountaddress_asB64(),
    accounttype: jspb.Message.getFieldWithDefault(msg, 2, 0),
    accountpublickey: msg.getAccountpublickey_asB64(),
    encodedaccount: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.model.AccountAddress}
 */
proto.model.AccountAddress.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.AccountAddress;
  return proto.model.AccountAddress.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.AccountAddress} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.AccountAddress}
 */
proto.model.AccountAddress.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAccountaddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAccounttype(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAccountpublickey(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setEncodedaccount(value);
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
proto.model.AccountAddress.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.AccountAddress.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.AccountAddress} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.AccountAddress.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAccountaddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getAccounttype();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getAccountpublickey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getEncodedaccount();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional bytes AccountAddress = 1;
 * @return {!(string|Uint8Array)}
 */
proto.model.AccountAddress.prototype.getAccountaddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes AccountAddress = 1;
 * This is a type-conversion wrapper around `getAccountaddress()`
 * @return {string}
 */
proto.model.AccountAddress.prototype.getAccountaddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAccountaddress()));
};


/**
 * optional bytes AccountAddress = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAccountaddress()`
 * @return {!Uint8Array}
 */
proto.model.AccountAddress.prototype.getAccountaddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAccountaddress()));
};


/** @param {!(string|Uint8Array)} value */
proto.model.AccountAddress.prototype.setAccountaddress = function(value) {
  jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int32 AccountType = 2;
 * @return {number}
 */
proto.model.AccountAddress.prototype.getAccounttype = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.model.AccountAddress.prototype.setAccounttype = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes AccountPublicKey = 3;
 * @return {!(string|Uint8Array)}
 */
proto.model.AccountAddress.prototype.getAccountpublickey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes AccountPublicKey = 3;
 * This is a type-conversion wrapper around `getAccountpublickey()`
 * @return {string}
 */
proto.model.AccountAddress.prototype.getAccountpublickey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAccountpublickey()));
};


/**
 * optional bytes AccountPublicKey = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAccountpublickey()`
 * @return {!Uint8Array}
 */
proto.model.AccountAddress.prototype.getAccountpublickey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAccountpublickey()));
};


/** @param {!(string|Uint8Array)} value */
proto.model.AccountAddress.prototype.setAccountpublickey = function(value) {
  jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional string EncodedAccount = 4;
 * @return {string}
 */
proto.model.AccountAddress.prototype.getEncodedaccount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.model.AccountAddress.prototype.setEncodedaccount = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * @enum {number}
 */
proto.model.AccountType = {
  ZBCACCOUNTTYPE: 0,
  BTCACCOUNTTYPE: 1,
  EMPTYACCOUNTTYPE: 2
};

goog.object.extend(exports, proto.model);
