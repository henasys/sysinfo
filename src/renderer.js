// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const resultTag = document.getElementById('result')

document.getElementById('getSysInfoBtn').addEventListener('click', async () => {
  console.log('getSysInfoBtn clicked');
  // const result = await window.api.getSysInfo();
  // console.log('result', result);
  // const jsonText =  JSON.stringify(result, undefined, 2);
  // resultTag.textContent = window.api.iconv(jsonText, 'CP949', 'UTF-8');
  const source = '(표준 디스크 드라이브)';
  const cp949 = window.api.iconv(source, 'UTF-8', 'CP949');
  const cp949String = String.fromCharCode.apply(null, cp949);
  const ascii = window.api.iconv(cp949String, 'CP949', 'ASCII//IGNORE');
  console.log('source', source);
  console.log('cp949', cp949String);
  console.log('ascii', ascii);
})

// Run this function after the page has loaded