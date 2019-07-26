export default class ZooBC {
  private _host: string = '';

  get connection(): string {
    return this._host;
  }

  set connection(host: string) {
    this._host = host;
  }
}
