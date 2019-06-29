const { app, BrowserWindow } = require('electron');
const path = require("path");
const url = require("url");

let appWindow;

function createWindow () {
  appWindow = new BrowserWindow({
    show: false,
    backgroundColor: '#303030',
    darkTheme: true,
    icon: url.format({
      pathname: path.join(__dirname, `/dist/assets/logo.png`),
      protocol: "file:",
      slashes: true
    }),
    minWidth: 600,
    minHeight: 400,
    frame: false
  });
  appWindow.maximize();
  // appWindow.setMenu(null);
  appWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // appWindow.webContents.openDevTools();
  appWindow.show();

  appWindow.on('closed', () => {
    appWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS specific close process
  if (appWindow === null) {
    createWindow();
  }
});
