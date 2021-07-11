const {ipcRenderer, contextBridge} = require('electron')


window.addEventListener('DOMContentLoaded', (e) => {
    window.$ = window.jQuery = require("jquery"); 
    contextBridge.exposeInMainWorld
    (
      'mfAbout', 
      {
        aboutData: () => {
          ipcRenderer.invoke("aboutData").then (
           (resp) => { 
            // console.log('MathJax.version');
            $('#laTexEditorId').text(resp.laTexEditor); 
             $('#nodeId').text(resp.node);
             $('#electronId').text(resp.electron);
             $('#chromeId').text(resp.chrome);
             $('#mathJaxId').text(resp.mathJaxVersion);
           }
          ) 
        }
      }
    ) // contextBridge.exposeInMainWorld

  })

