import { app, ipcMain, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { randomUUID } from 'node:crypto';
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
import { getContextFn } from './main/electronContext';
import './main/electronContext/index'
import { init } from './main/db/db.providers';
import sqlite3 from 'sqlite3';
// import moment from 'moment';
import { Sequelize } from 'sequelize';
async function main() {
  console.log('main start');
  
  // console.log('moment', moment.isMoment('2023-10-01 12:00:00'));
  debugger

  if (started) {
    app.quit();
  }


  ipcMain.handle('electronContext', async (event, opt: any) => {
    console.log('electronContext start', opt);
    debugger
    let fn = await getContextFn(opt.method, opt.path);
    if (fn) {
      try {
        let res = await fn.fn(opt);
        console.log('electronContext end', opt, res);
        return {
          code: 200,
          msg: 'success',
          data: res,
        };
      } catch (e) {
        console.error('electronContext error', opt, e);
        return {
          code: 500,
          msg: 'error',
          data: e,
        };
      }
    } else {
      console.warn(`not found ${opt.method} ${opt.path}`);
      return {
        code: 404,
        msg: 'not found',
        data: null,
      };
    }
  });
  function sleep(time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });

  }
  ipcMain.handle('getUUID', async (event, ...args) => {
    return randomUUID();
  });
  const createWindow = async () => {
    console.log('init db start');
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      dialectModule: sqlite3,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      storage: process.cwd() + '/database.sqlite',
    })

    await init(sequelize);
    console.log('init db success');
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
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
}
main().catch((e) => {
  console.error(e);
  app.quit();
});