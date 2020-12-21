const { app, nativeImage, Tray, Menu, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let top = {}; // prevent gc to keep windows

const createWindow = () => {
  // Create the browser window.
  top.win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      allowRunningInsecureContent: false,
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      // sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, iconName)
  top.tray = new Tray(iconPath);
  const menu = Menu.buildFromTemplate([
      {label: "Open", click: (item, window, event) => {
          //console.log(item, event);
          top.win.show();
      }},
      {type: "separator"},
      {role: "quit"}, // "role": system prepared action menu
    ]);

  top.tray.setToolTip("SysInfo");
  top.tray.setContextMenu(menu);

  // and load the index.html of the app.
  top.win.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  top.win.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const {getSysInfo} = require('./info')

let _sysInfo;

ipcMain.handle('get-sysinfo', async (event) => {
  if (!_sysInfo) {
    _sysInfo = await getSysInfo()
  }
  return new Promise((resolve) => {
    resolve(_sysInfo);
  });
})

ipcMain.on('get-sysinfo-on', (event) => {
  console.log('get-sysinfo-on');
  getSysInfo()
    .then(data => {
      _sysInfo = data;
      event.sender.send('receive-sysinfo', _sysInfo);
    })
    .catch(e => {
    });
})

const DataStore = require('./DataStore');
const UserDto = require('./UserDto');

const store = new DataStore();

ipcMain.on('save-userinfo', (event, info) => {
  console.log('save-userinfo', info);
  const user = new UserDto(info.username, info.email);
  store.setUser(user);
})

ipcMain.handle('get-userinfo', async (event) => {
  return new Promise((resolve) => {
    resolve(store.getUser());
  });
})
