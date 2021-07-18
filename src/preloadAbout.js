const {ipcRenderer, contextBridge} = require('electron')


window.addEventListener('DOMContentLoaded', (e) => {
    contextBridge.exposeInMainWorld
    (
      'mfAbout', 
      {
        aboutData: () => {
          ipcRenderer.invoke("aboutData").then (
           (resp) => { 
            document.getElementById('laTexEditorId').textContent  = resp.laTexEditor; 
            document.getElementById('nodeId').textContent   = resp.node;
            document.getElementById('electronId').textContent   = resp.electron;
            document.getElementById('chromeId').textContent    = resp.chrome;
            document.getElementById('mathJaxId').textContent  = resp.mathJaxVersion;
           }
          ) 
        }
      }
    ) // contextBridge.exposeInMainWorld

  })

