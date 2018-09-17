const { app, BrowserWindow } = require('electron');
  
function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('sources/views/index.html');
}

app.on('ready', createWindow);