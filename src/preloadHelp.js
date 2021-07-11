const {ipcRenderer, contextBridge} = require('electron')

window.addEventListener('DOMContentLoaded', (e) => {
    window.$ = window.jQuery = require("jquery"); 
  }
)
