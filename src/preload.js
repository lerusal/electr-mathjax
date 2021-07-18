const {ipcRenderer, contextBridge} = require('electron')

function doSaveFileAs(fileData) {
      return  ipcRenderer.invoke("SaveFileAs", fileData);
}

window.addEventListener('DOMContentLoaded', (e) => {
    contextBridge.exposeInMainWorld
    (
      'mf', 
      {
       setDataTA: (data) =>
       {
         setDataTextArea(data);
       },
       openFile: () => { 
         return ipcRenderer.invoke("OpenFile")
       }, 
       saveFile: (fileName, fileData) => {
          if (fileName) 
          {
            let msg = {fileName, fileData};
                ipcRenderer.invoke("SaveFile", msg).then (
                  (result) => {
                    // console.log(`Save file ${fileName}`);                
                  }
                )
          } else {
            doSaveFileAs(fileData);
          }
        },
        saveFileAs: (fileData) => { 
         return doSaveFileAs(fileData);
        },
        toPdf: () => {
          ipcRenderer.invoke("toPdf").then (
            (fileName) => {
             // console.log(`Created pdf ${fileName}`);                
            }
          )
        },
        messageBox:  (message) => {
         return  ipcRenderer.invoke("MessageBox", message);
        },
        about: (mathJaxVersion) => {
          ipcRenderer.invoke("about", mathJaxVersion).then (
           (resp) => { }
          ) 
        },
        openHelp: () => {
          ipcRenderer.invoke("openHelp").then (
           (resp) => { }
          ) 
        }
      }
    ) // contextBridge.exposeInMainWorld

  })

