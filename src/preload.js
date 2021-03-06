// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require('electron')
const Iconv = require('iconv').Iconv
const numeral = require('numeral')
const bytes = require('bytes')

contextBridge.exposeInMainWorld(
  'mainApi',
  {
    getSysInfo: async () => {
      const result = await ipcRenderer.invoke('get-sysinfo')
      return result
    },
    receiveSysInfo: (callback) => {
      ipcRenderer.on('receive-sysinfo', (event, ...args) => {
        callback(...args);
      })
    },
    saveUserInfo: (info) => {
      console.log('saveUserInfo', info);
      ipcRenderer.send('save-userinfo', info);
    },
    getUserInfo: async () => {
      return await ipcRenderer.invoke('get-userinfo');
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
    numericFormat: (number, format) => {
      return numeral(number).format(format);
    },
    bytes: (value, options = []) => {
      return bytes(value, options);
    },
  }
)
