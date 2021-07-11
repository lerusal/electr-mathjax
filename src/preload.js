const {ipcRenderer, contextBridge} = require('electron')

function doSaveFileAs() {
    let data = $('#input').val();     
        ipcRenderer.invoke("SaveFileAs", data).then (
          (fileName) => {
           // console.log(`File saved ${fileName}`);
            $('#fileNameId').text(fileName); 
          }
        );
}

// For unknown to me reason 
// it is not possible to reload data 
// in textarea. That's why we need first to
// delete element from DOM, append it to DOM again and then load data
function setDataTextArea(data) 
{
  $("#input" ).remove(); 
  $('#inputAreaId').append('<textarea id="input"></textarea>')
  $('#input').val(data); 
}

window.addEventListener('DOMContentLoaded', (e) => {
    window.$ = window.jQuery = require("jquery"); 
    contextBridge.exposeInMainWorld
    (
      'mf', 
      {
       setDataTA: (data) =>
       {
         setDataTextArea(data);
       },
       openFile: () => { 
          // console.log('Open file');
          ipcRenderer.invoke("OpenFile").then (
             (result) => {
               if (result) 
               {
                setDataTextArea(result.fileData);
                $('#fileNameId').html(result.fileName); 
               }
             }
          )
        }, 
        saveFile: () => {
          let fileName = $('#fileNameId').text();
          if (fileName) 
          {
            let data = $('#input').val();     
            let msg = {fileName, data};
                ipcRenderer.invoke("SaveFile", msg).then (
                  (result) => {
                    // console.log(`Save file ${fileName}`);                
                  }
                )
          } else {
            doSaveFileAs();
          }
        },
        saveFileAs: () => { 
          doSaveFileAs();
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

