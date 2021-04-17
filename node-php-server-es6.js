import phpServer from "node-php-server";
import * as path from "path";
import isDev from "electron-is-dev";

export default class PHPServer {
  constructor(host = "localhost", port = 80) {
    this.host = host;
    this.port = port;
    this.serverUrl = null;
    this.appServer = phpServer;

    this.createServer = this.createServer.bind(this);
    this.getServer = this.getServer.bind(this);
    this.close = this.close.bind(this);
  }

  createServer() {
    const binPath = isDev
      ? `${__dirname}/php/php.exe`
      : `${path.dirname(process.resourcesPath)}/resources/php/php.exe`;
    const basepath = isDev
      ? `${__dirname}/app/public`
      : `${path.dirname(process.resourcesPath)}/resources/app/public`;
    const routerpath = isDev
      ? `${__dirname}/app/server.php`
      : `${path.dirname(process.resourcesPath)}/resources/app/server.php`;

    this.appServer.createServer({
      port: this.port,
      hostname: this.host,
      base: basepath,
      keepalive: false,
      open: false,
      bin: binPath,
      router: routerpath,
    });
    this.serverUrl = `http://${this.host}:${this.port}`;
  }

  getServer() {
    return this.serverUrl;
  }

  close() {
    this.appServer.close();
  }
}
