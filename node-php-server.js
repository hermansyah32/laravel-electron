"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _nodePhpServer = _interopRequireDefault(require("node-php-server"));

var path = _interopRequireWildcard(require("path"));

var isDev = require("electron-is-dev");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function () {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

class PHPServer {
  constructor(host = "localhost", port = 80) {
    this.host = host;
    this.port = port;
    this.serverUrl = null;
    this.appServer = _nodePhpServer.default;
    this.createServer = this.createServer.bind(this);
    this.getServer = this.getServer.bind(this);
    this.close = this.close.bind(this);
  }

  createServer() {
    const binPath = isDev
      ? `${__dirname}/php/php.exe`
      : `${path.dirname(process.resourcesPath)}/resources/php/php.exe`;
    const basepath = isDev
      ? `${__dirname}/laravel/public`
      : `${path.dirname(process.resourcesPath)}/resources/laravel/public`;
    const routerpath = isDev
      ? `${__dirname}/laravel/server.php`
      : `${path.dirname(process.resourcesPath)}/resources/laravel/server.php`;

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

exports.default = PHPServer;
