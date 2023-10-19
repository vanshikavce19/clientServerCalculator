const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');

  const server = spawn('node', [path.join(__dirname, 'server.js')]);

  server.stdout.on('data', (data) => {
    console.log(`Server: ${data}`);
  });

  server.stderr.on('data', (data) => {
    console.error(`Server Error: ${data}`);
  });

  server.on('close', (code) => {
    console.log(`Server exited with code ${code}`);
  });

  mainWindow.on('closed', () => {
    server.kill();
    app.quit();
  });
}

app.on('ready', createWindow);