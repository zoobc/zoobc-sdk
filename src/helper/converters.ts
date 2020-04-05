export function base64ToBuffer(base64: string): Buffer {
  return new Buffer(base64, 'base64');
}

export function bufferToBase64(bytes: ArrayBuffer | ArrayBufferView | Array<number>): string {
  const buf =
    bytes instanceof ArrayBuffer
      ? Buffer.from(bytes)
      : ArrayBuffer.isView(bytes)
      ? Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength)
      : Buffer.from(bytes);
  return buf.toString('base64');
}

export function toBase64Url(base64Str: string): string {
  return base64Str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/\=/g, '');
}

export function fromBase64Url(base64Str: string): string {
  let base64 = base64Str.replace(/\-/g, '+').replace(/\_/g, '/');
  var pad = base64.length % 4;
  if (pad) base64 += new Array(5 - pad).join('=');
  return base64;
}
