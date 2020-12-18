// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const getSysInfoBtn = document.getElementById('get-sysinfo-btn')
const inputForm = document.getElementById('input-form')

const resultTag = document.getElementById('result')

getSysInfoBtn.addEventListener('click', async () => {
  console.log('getSysInfoBtn clicked');
  const result = await window.mainApi.getSysInfo();
  console.log('result', result);
  replaceFields(result);
  const jsonText = JSON.stringify(result, undefined, 2);
  resultTag.textContent = jsonText;
})

inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log('event', event);
  const emailTag = document.getElementById('input-email');
  const nameTag = document.getElementById('input-name')
  window.mainApi.saveUserInfo({ name: nameTag.value, email: emailTag.value });
})

const replaceFields = (sysInfo) => {
  console.log('sysInfo', sysInfo);
  if (!sysInfo) {
    return;
  }
  const users = sysInfo.users.map(u => u.user).join(', ');
  $("#users").text(users);
  const os = [sysInfo.os.distro, sysInfo.os.release].join(' ');
  $("#os").text(os);
  const cpu = [sysInfo.cpu.manufacturer, sysInfo.cpu.brand, sysInfo.cpu.speed].join(' ');
  $("#cpu").text(cpu);
  const baseboard = [sysInfo.baseboard.manufacturer, sysInfo.baseboard.model, sysInfo.baseboard.version].join(' ');
  $("#baseboard").text(baseboard);
  const bios = [sysInfo.bios.vendor, sysInfo.bios.version].join(' ');
  $("#bios").text(bios);
  const memory = sysInfo.memLayout.map(e => e.size).reduce((acc, cur) => acc + cur, 0);
  $("#memory").text(window.mainApi.numericFormat(memory, '0.00b'));
};

$(document).ready(async function () {
  console.log('document ready at renderer.js');
  const result = await window.mainApi.getSysInfo();
  replaceFields(result);
});
// Run this function after the page has loaded