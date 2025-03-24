"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const icon = path.join(__dirname, "../../resources/icon.png");
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: "刷新",
      role: "reload"
      // 直接复用系统刷新行为
    },
    {
      label: "打开控制台",
      click: () => {
        mainWindow.webContents.openDevTools();
      }
    }
  ]);
  mainWindow.webContents.on("context-menu", (e, params) => {
    contextMenu.popup({ window: mainWindow, x: params.x, y: params.y });
  });
  let tray = new electron.Tray(icon);
  const trayMenu = electron.Menu.buildFromTemplate([
    { label: "显示窗口", click: () => mainWindow.show() },
    { label: "退出", click: () => electron.app.quit() }
  ]);
  tray.setToolTip("stockManager");
  tray.setContextMenu(trayMenu);
  tray.on("click", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
