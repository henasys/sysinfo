// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const resultTag = document.getElementById('result')

document.getElementById('getSysInfoBtn').addEventListener('click', async () => {
  console.log('getSysInfoBtn clicked');
  const result = await window.api.getSysInfo();
  console.log('result', result);
  const jsonText =  JSON.stringify(result, undefined, 2);
  resultTag.textContent = jsonText;
})

// Run this function after the page has loaded