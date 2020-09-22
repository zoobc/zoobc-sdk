// source: model/feeVote.proto
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

goog.exportSymbol('proto.model.FeeVoteCommitmentVote', null, global);
goog.exportSymbol('proto.model.FeeVoteInfo', null, global);
goog.exportSymbol('proto.model.FeeVoteRevealVote', null, global);
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
proto.model.FeeVoteCommitmentVote = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.FeeVoteCommitmentVote, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.FeeVoteCommitmentVote.displayName = 'proto.model.FeeVoteCommitmentVote';
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
proto.model.FeeVoteInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.FeeVoteInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.FeeVoteInfo.displayName = 'proto.model.FeeVoteInfo';
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
proto.model.FeeVoteRevealVote = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.FeeVoteRevealVote, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.FeeVoteRevealVote.displayName = 'proto.model.FeeVoteRevealVote';
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
proto.model.FeeVoteCommitmentVote.prototype.toObject = function(opt_includeInstance) {
  return proto.model.FeeVoteCommitmentVote.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.FeeVoteCommitmentVote} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.FeeVoteCommitmentVote.toObject = function(includeInstance, msg) {
  var f, obj = {
    votehash: msg.getVotehash_asB64(),
    voteraddress: jspb.Message.getFieldWithDefault(msg, 2, ""),
    blockheight: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * @return {!proto.model.FeeVoteCommitmentVote}
 */
proto.model.FeeVoteCommitmentVote.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.FeeVoteCommitmentVote;
  return proto.model.FeeVoteCommitmentVote.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.FeeVoteCommitmentVote} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.FeeVoteCommitmentVote}
 */
proto.model.FeeVoteCommitmentVote.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setVotehash(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setVoteraddress(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBlockheight(value);
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
proto.model.FeeVoteCommitmentVote.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.FeeVoteCommitmentVote.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.FeeVoteCommitmentVote} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.FeeVoteCommitmentVote.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVotehash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getVoteraddress();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getBlockheight();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional bytes VoteHash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.model.FeeVoteCommitmentVote.prototype.getVotehash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes VoteHash = 1;
 * This is a type-conversion wrapper around `getVotehash()`
 * @return {string}
 */
proto.model.FeeVoteCommitmentVote.prototype.getVotehash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getVotehash()));
};


/**
 * optional bytes VoteHash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getVotehash()`
 * @return {!Uint8Array}
 */
proto.model.FeeVoteCommitmentVote.prototype.getVotehash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getVotehash()));
};


/** @param {!(string|Uint8Array)} value */
proto.model.FeeVoteCommitmentVote.prototype.setVotehash = function(value) {
  jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional string VoterAddress = 2;
 * @return {string}
 */
proto.model.FeeVoteCommitmentVote.prototype.getVoteraddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.model.FeeVoteCommitmentVote.prototype.setVoteraddress = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint32 BlockHeight = 3;
 * @return {number}
 */
proto.model.FeeVoteCommitmentVote.prototype.getBlockheight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.model.FeeVoteCommitmentVote.prototype.setBlockheight = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
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
proto.model.FeeVoteInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.model.FeeVoteInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.FeeVoteInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.FeeVoteInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    recentblockhash: msg.getRecentblockhash_asB64(),
    recentblockheight: jspb.Message.getFieldWithDefault(msg, 2, 0),
    feevote: jspb.Message.getFieldWithDefault(msg, 3, "0")
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
 * @return {!proto.model.FeeVoteInfo}
 */
proto.model.FeeVoteInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.FeeVoteInfo;
  return proto.model.FeeVoteInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.FeeVoteInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.FeeVoteInfo}
 */
proto.model.FeeVoteInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setRecentblockhash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setRecentblockheight(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readInt64String());
      msg.setFeevote(value);
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
proto.model.FeeVoteInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.FeeVoteInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.FeeVoteInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.FeeVoteInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRecentblockhash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getRecentblockheight();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getFeevote();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(
      3,
      f
    );
  }
};


/**
 * optional bytes RecentBlockHash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.model.FeeVoteInfo.prototype.getRecentblockhash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes RecentBlockHash = 1;
 * This is a type-conversion wrapper around `getRecentblockhash()`
 * @return {string}
 */
proto.model.FeeVoteInfo.prototype.getRecentblockhash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getRecentblockhash()));
};


/**
 * optional bytes RecentBlockHash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getRecentblockhash()`
 * @return {!Uint8Array}
 */
proto.model.FeeVoteInfo.prototype.getRecentblockhash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getRecentblockhash()));
};


/** @param {!(string|Uint8Array)} value */
proto.model.FeeVoteInfo.prototype.setRecentblockhash = function(value) {
  jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional uint32 RecentBlockHeight = 2;
 * @return {number}
 */
proto.model.FeeVoteInfo.prototype.getRecentblockheight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.model.FeeVoteInfo.prototype.setRecentblockheight = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 FeeVote = 3;
 * @return {string}
 */
proto.model.FeeVoteInfo.prototype.getFeevote = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, "0"));
};


/** @param {string} value */
proto.model.FeeVoteInfo.prototype.setFeevote = function(value) {
  jspb.Message.setProto3StringIntField(this, 3, value);
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
proto.model.FeeVoteRevealVote.prototype.toObject = function(opt_includeInstance) {
  return proto.model.FeeVoteRevealVote.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.FeeVoteRevealVote} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.FeeVoteRevealVote.toObject = function(includeInstance, msg) {
  var f, obj = {
    voteinfo: (f = msg.getVoteinfo()) && proto.model.FeeVoteInfo.toObject(includeInstance, f),
    votersignature: msg.getVotersignature_asB64(),
    voteraddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
    blockheight: jspb.Message.getFieldWithDefault(msg, 4, 0)
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
 * @return {!proto.model.FeeVoteRevealVote}
 */
proto.model.FeeVoteRevealVote.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.FeeVoteRevealVote;
  return proto.model.FeeVoteRevealVote.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.FeeVoteRevealVote} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.FeeVoteRevealVote}
 */
proto.model.FeeVoteRevealVote.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.model.FeeVoteInfo;
      reader.readMessage(value,proto.model.FeeVoteInfo.deserializeBinaryFromReader);
      msg.setVoteinfo(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setVotersignature(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setVoteraddress(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBlockheight(value);
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
proto.model.FeeVoteRevealVote.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.FeeVoteRevealVote.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.FeeVoteRevealVote} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.FeeVoteRevealVote.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVoteinfo();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.model.FeeVoteInfo.serializeBinaryToWriter
    );
  }
  f = message.getVotersignature_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getVoteraddress();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getBlockheight();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
};


/**
 * optional FeeVoteInfo VoteInfo = 1;
 * @return {?proto.model.FeeVoteInfo}
 */
proto.model.FeeVoteRevealVote.prototype.getVoteinfo = function() {
  return /** @type{?proto.model.FeeVoteInfo} */ (
    jspb.Message.getWrapperField(this, proto.model.FeeVoteInfo, 1));
};


/** @param {?proto.model.FeeVoteInfo|undefined} value */
proto.model.FeeVoteRevealVote.prototype.setVoteinfo = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.model.FeeVoteRevealVote.prototype.clearVoteinfo = function() {
  this.setVoteinfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.model.FeeVoteRevealVote.prototype.hasVoteinfo = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes VoterSignature = 2;
 * @return {!(string|Uint8Array)}
 */
proto.model.FeeVoteRevealVote.prototype.getVotersignature = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes VoterSignature = 2;
 * This is a type-conversion wrapper around `getVotersignature()`
 * @return {string}
 */
proto.model.FeeVoteRevealVote.prototype.getVotersignature_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getVotersignature()));
};


/**
 * optional bytes VoterSignature = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getVotersignature()`
 * @return {!Uint8Array}
 */
proto.model.FeeVoteRevealVote.prototype.getVotersignature_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getVotersignature()));
};


/** @param {!(string|Uint8Array)} value */
proto.model.FeeVoteRevealVote.prototype.setVotersignature = function(value) {
  jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional string VoterAddress = 3;
 * @return {string}
 */
proto.model.FeeVoteRevealVote.prototype.getVoteraddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.model.FeeVoteRevealVote.prototype.setVoteraddress = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint32 BlockHeight = 4;
 * @return {number}
 */
proto.model.FeeVoteRevealVote.prototype.getBlockheight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.model.FeeVoteRevealVote.prototype.setBlockheight = function(value) {
  jspb.Message.setProto3IntField(this, 4, value);
};


goog.object.extend(exports, proto.model);
