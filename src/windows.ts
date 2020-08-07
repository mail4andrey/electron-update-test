import { app, BrowserWindow, Menu, dialog } from "electron";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

let mainWindow: BrowserWindow | null = null;

export function createWindow(): BrowserWindow {
//   if (mainWindow) return mainWindow;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    // other
    // useContentSize: true,
    webPreferences: {

      // preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // nodeIntegration: true,
      // sandbox: false,
      // webviewTag: false
    }
  });

//   mainWindow.loadFile("./dist/static/index.html");
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  
  const menu = Menu.buildFromTemplate([
      {
          label: 'File',
          submenu: [
              {label:'Configuration'},
              {
                label:'Open Configuration',
                accelerator: 'CmdOrCtrl+O',
                click(): void {
                  dialog.showOpenDialog(mainWindow, {
                    title: 'Open Configuration',
                  });
                } ,
              },
              {
                label:'Save Configuration',
                accelerator: 'CmdOrCtrl+S',
                click(): void {
                  dialog.showSaveDialog(mainWindow, {
                    title: 'Save Configuration',
                  });
                } ,
              },
              {type:'separator'},
              {
                label:'Language',
                submenu: [
                  {
                    label:'English',
                    type:'radio',
                    checked:true
                  },
                  {
                    label:'Русский',
                    type:'radio',
                    checked:false
                  },
                ]
              },
              {type:'separator'},
              {
                label:'Exit',
                role:'close',
                // click() { 
                //     app.quit() 
                // },
                accelerator: 'Alt+F4'
              }
          ]
      },
      {
          label: '?',
          submenu: [
              {
                label:'Reload',
                role:'reload',
                accelerator: 'F5'
              },
              {label:'Log view'},
              {type:'separator'},
              {
                label:'About',
                // accelerator: 'CmdOrCtrl+Shift+C'
                role:'about',
                accelerator: 'F2'
              }
          ]
      }
  ])
  Menu.setApplicationMenu(menu); 

  return mainWindow;
}