// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'api',
  {
    getSysInfo: async () => {
      const result = await ipcRenderer.invoke('get-sysinfo')
      return result
    },
  }
)
