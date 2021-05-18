const { app, BrowserWindow } = require('electron');

app.whenReady().then(function() {
  //app.commandLine.appendSwitch('js-flags', '--expose_gc --max-old-space-size=100');
  // Create the browser window.
  win = new BrowserWindow({
    width: 920,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  // --- UNCOMMENT THIS IF YOU NEED TO DEBUG ---
  //win.openDevTools();

  // and load the index.html of the app.
  win.loadFile('index.html');
});

app.on('window-all-closed', app.quit);
