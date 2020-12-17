// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const getSysInfoBtn = document.getElementById('getSysInfoBtn')
const inputForm = document.getElementById('inputForm')

const resultTag = document.getElementById('result')

getSysInfoBtn.addEventListener('click', async () => {
  console.log('getSysInfoBtn clicked');
  const result = await window.mainApi.getSysInfo();
  console.log('result', result);
  const jsonText =  JSON.stringify(result, undefined, 2);
  resultTag.textContent = jsonText;
})

inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log('event', event);
  const emailTag = document.getElementById('inputEmail');
  const nameTag = document.getElementById('inputName')
  window.mainApi.saveUserInfo({name: nameTag.value, email: emailTag.value});
})

// Run this function after the page has loaded