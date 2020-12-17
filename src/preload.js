// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require('electron')
const Iconv = require('iconv').Iconv

contextBridge.exposeInMainWorld(
  'api',
  {
    getSysInfo: async () => {
      const result = await ipcRenderer.invoke('get-sysinfo')
      return result
    },
    iconv: (source, fromEncoding, toEncoding = 'UTF-8') => {
      const iconv = new Iconv(fromEncoding, toEncoding);
      try {
        return iconv.convert(source);
      } catch (e) {
        console.warn(e);
        return source;
      }
    },
  }
)
