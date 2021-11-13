// main.js

const { app, protocol, BrowserWindow } = require("electron");
const { createProtocol } = require("vue-cli-plugin-electron-builder/lib");
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
// 打包后的index.html里面资源是以app://协议加载的，所以需要这一步，不然打包后加载不到
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

// 创建浏览器窗口
function createWindow() {
  const mainWindow = new BrowserWindow({
    id: "electron",
    minWidth: 1100,
    minHeight: 700,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false, // 关闭安全策略
      contextIsolation: false, // 上下文隔离
      nodeIntegration: true, //是否完整的支持 node. 默认值为true
      enableRemoteModule: true, // remote模块
    },
  });

  //===========自定义file:///协议的解析=======================
  //https://blog.csdn.net/youyudexiaowangzi/article/details/113935045
  // protocol.interceptFileProtocol('file', (req, callback) => {
  //   const url = req.url.substr(8);
  //   callback(decodeURI(url));
  // }, (error) => {
  //   if (error) {
  //     console.error('Failed to register protocol');
  //   }
  // });

  // 根据环境的不同以不同方式加载 index.html
  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:8081");
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    mainWindow.loadURL("app://./index.html");
    mainWindow.webContents.openDevTools();
  }

  // 减少白屏时间
  mainWindow.on("ready-to-show", function () {
    mainWindow.show();
  });
}

//Electron 支持的 Chrome 命令行开关
app.commandLine.appendSwitch("ignore-certificate-errors");
app.commandLine.appendSwitch("remote-debugging-port", "8315");
app.commandLine.appendSwitch("host-rules", "MAP * 127.0.0.1");

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
