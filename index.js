const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const PHPServer = require("./node-php-server").default;
require("./main/menu");

app.on("ready", () => {
  createWindow();
});

let phpServer = new PHPServer();

let mainWindow = null;

function createWindow() {
  phpServer.createServer();
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "./main/preload.js"),
      nodeIntegration: false,
      enableRemoteModule: false,
    },
  });

  mainWindow.webContents.session.clearStorageData();
  mainWindow.loadURL(phpServer.getServer());

  let mainContent = mainWindow.webContents;

  mainContent.on("did-finish-load", function () {
    mainWindow.show();
    mainWindow.maximize();
  });

  mainWindow.on("closed", function () {
    phpServer.close();
    mainWindow = null;
  });

  ipcMain.handle("fromRenderer", (event, data) => {
    dialog.showMessageBox(null, { message: data.message });
    return { message: "Hello back from Main" };
  });
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    phpServer.close();
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
