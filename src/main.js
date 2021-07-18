const { app, BrowserWindow, ipcMain, dialog, Notification } = require('electron')
const path = require('path')
const fs   = require('fs')

let mathJaxVersion = null; // initial value
let win = null; // initial value

function webPrefProp (webPref) {

  let wp = 
   {
    nodeIntegration:  false,
    contextIsolation: true,
    allowRunningInsecureContent: false,
    enableRemoteModule: false,
    nativeWindowOpen: false,
    nodeIntegrationInWorker: false,
    nodeIntegrationInSubFrames: false,
    safeDialogs: true,
    sandbox: true,
    webSecurity: true,
    webviewTag: false,
   }

   return Object.assign(webPref , wp);
}

function showNotification (title, body) {
  const notification = {
    title: title,
    body: body
  }
  new Notification(notification).show()
}

function getMessageBox(win, msg) {
  let res = dialog.showMessageBoxSync(
    win, 
    {
      message: msg,
      type: "info",
      buttons: ['Yes', 'No'],
      noLink: false   
    }
  );
  return res;
}

function setIpcMainHandles() 
{
  ipcMain.handle('MessageBox', (event, arg) => 
   {
     let res = getMessageBox(win, arg); 
     return res;
   }  
  ) 

  ipcMain.handle('OpenFile', (event, arg) => 
  {
     // console.log('handle OpenFile') 
      let res = null;
      let fileNames = dialog.showOpenDialogSync
                    (
                      win, 
                      {
                          properties: ['openFile']
                      }
                    )
     //     console.log(`fileName=${fileNames}`); 
          if (fileNames)
          {
            let fileData = fs.readFileSync(fileNames[0], 'utf8');   
                res      = {fileName: fileNames[0], fileData:fileData};     
          }

      return res; 
  }
  ) // ipcMain.handle('OpenFile', (event, arg) => 

  ipcMain.handle("toPdf", (event, arg) => 
  {
    // console.log('toPdf') 
    let fileName = dialog.showSaveDialogSync
                   (
                    win, 
                    {
                        properties: ['showOverwriteConfirmation'],
                        filters:    [
                                     { name: 'PDF', extensions: ['pdf'] }
                                    ]
                    }
                   )
      if (fileName) 
      {
        let contents = win.webContents;              
            contents.printToPDF({}).then
            (data => {
                fs.writeFileSync(fileName, data);
                showNotification ('LaTex Editor', `Created PDF file: ${fileName}`);
              }
            )  
      }              
  }
  ); // ipcMain.handle("toPdf", (event, arg) => 

  ipcMain.handle('SaveFileAs', (event, arg) => 
  {
    let data = arg;
    let fileName = null;
    if(data) 
    {
      fileName = dialog.showSaveDialogSync(
                          win, 
                          {
                              properties: ['showOverwriteConfirmation']
                          }
                        )

      if(fileName)
      {
        try {
          fs.renameSync(fileName, fileName + '.bak');
        } catch (error) { // ignore error if file doesn't exist

        }           

        fs.writeFileSync(fileName, data, 'utf8');                   
        showNotification ('LaTex Editor', `Saved data to file: ${fileName}`);
      }           
    } // if(data) 

    return fileName;     
  }); //  ipcMain.handle('SaveFileAs', (event, arg) => 

  ipcMain.handle('SaveFile', (event, arg) => 
  {
        try {
          fs.renameSync(arg.fileName, arg.fileName + '.bak');
        } catch (error) { // ignore error if file doesn't exist
          
        }     

        fs.writeFileSync(arg.fileName, arg.fileData, 'utf8');                   
        showNotification ('LaTex Editor', `Saved data to file: ${arg.fileName}`);

    return arg.fileName;     
  }
  ) // ipcMain.handle('SaveFile', (event, arg) => 

  ipcMain.handle('about', (event, arg) =>
  {

    let webPref = {
      preload: path.join(__dirname, 'preloadAbout.js'),
      modal: true,
    }
    webPref = webPrefProp(webPref);

    const winAbout = new BrowserWindow({
      parent: BrowserWindow.getFocusedWindow(),
      width:  800,
      height: 600,
      autoHideMenuBar: true ,
      maximizable: false,
      minimizable: false,
      title : 'About',
      webPreferences: webPref
    })

    mathJaxVersion = arg;

    winAbout.loadFile('about.html');
    winAbout.once('ready-to-show', () => {
      winAbout.show()
    })
  }
  )

  ipcMain.handle('aboutData', (event) => 
    {
      let aboutData = {};
      for (const type of ['chrome', 'node', 'electron']) {
        aboutData[type] = process.versions[type];
      }
  
      let laTexEditorVersion = null; 
      try{
        let package = require(path.join(__dirname, '../package.json'));
            laTexEditorVersion  = package.version;
      } catch (err) 
      {
        laTexEditorVersion = "Can't find or parse package.json";  
      }

      aboutData.laTexEditor = laTexEditorVersion;
      aboutData.mathJaxVersion = mathJaxVersion;

      return aboutData;
    }
  ) // ipcMain.handle('aboutData', (event) => 

  ipcMain.handle('openHelp', (event) => 
    {

      let webPref = {
        preload: path.join(__dirname, 'preloadHelp.js'),
      }
      webPref = webPrefProp(webPref);

      const winHelp = new BrowserWindow({ width: 1200, height: 800,
        autoHideMenuBar: true ,
        minimizable: false,
        webPreferences: webPref
       });
      winHelp.loadFile('help.html');
    } 
  )
} // function setIpcMainHandles() 

function createWindow () 
{
  let webPref = {
    preload: path.join(__dirname, 'preload.js'),
  }
  webPref = webPrefProp(webPref);

  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true ,
    webPreferences: webPref
  })

  win.maximize();

  setIpcMainHandles(); 

  win.loadFile('index.html')
} // function createWindow () {

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
