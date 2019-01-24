const { app, BrowserWindow } = require('electron');

let appWindow;

function createWindow () {
  appWindow = new BrowserWindow({
    show: false,
    backgroundColor: '#303030',
    darkTheme: true,
    icon: `file://${__dirname}/dist/assets/logo.png`,
    minWidth: 600,
    minHeight: 400,
    frame: false
  });
  appWindow.maximize();
  // appWindow.setMenu(null);
  appWindow.loadURL(`file://${__dirname}/dist/leGraphApp/index.html`);
  appWindow.webContents.openDevTools();
  appWindow.show();

  appWindow.on('closed', function () {
    appWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // macOS specific close process
  if (appWindow === null) {
    createWindow();
  }
});
