const { BrowserWindow, Menu } = require("electron");
const isMac = process.platform === "darwin";
const template = [
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },

  {
    label: "View",
    submenu: [
      {
        role: "reload",
      },
      { role: "toggleDevTools" },
      {
        role: "zoomin",
      },
      {
        role: "zoomout",
      },
      {
        type: "separator",
      },
      {
        role: "togglefullscreen",
      },
    ],
  },

  {
    label: "Communicate",
    submenu: [
      {
        label: "Send Hi to Renderer",
        click: () => {
          const currentWebContent = BrowserWindow.getFocusedWindow()
            .webContents;
          currentWebContent.send("fromMain", { message: "Hello from Main" });
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
