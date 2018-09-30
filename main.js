const { app, BrowserWindow } = require('electron');

let appWindow;

function createWindow () {
  appWindow = new BrowserWindow({
    width: 600, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  });


  appWindow.loadURL(`file://${__dirname}/dist/leGraphApp/index.html`);

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

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