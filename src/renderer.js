// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const getSysInfoBtn = document.getElementById('get-sysinfo-btn')
const inputForm = document.getElementById('input-form')
const emailTag = document.getElementById('input-email');
const usernameTag = document.getElementById('input-username')
const resultTag = document.getElementById('result')

getSysInfoBtn.addEventListener('click', async () => {
  console.log('getSysInfoBtn clicked');
  await getSysInfo((result) => {
    const jsonText = JSON.stringify(result, undefined, 2);
    resultTag.textContent = jsonText;
  });
})

inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log('event', event);
  window.mainApi.saveUserInfo({ username: usernameTag.value, email: emailTag.value });
})

const getUserInfo = async () => {
  const result = await window.mainApi.getUserInfo();
  console.log('getUserInfo', result);
  $("#input-username").val(result.username);
  $("#input-email").val(result.email);
};

const getSysInfo = async (callback = null) => {
  const result = await window.mainApi.getSysInfo();
  console.log('getSysInfo', result);
  if (!result) {
    return;
  }
  renderSysInfo(result);
  callback && callback(result);
};

const receiveSysInfo = () => {
  window.mainApi.receiveSysInfo((result) => {
    console.log('receiveSysInfo', result);
    if (!result) {
      return;
    }
    renderSysInfo(result);
  });
}

const renderSysInfo = (result) => {
  const users = result.users.map(u => u.user).join(', ');
  $("#users").text(users);
  const os = [result.os.distro, result.os.release].join(' ');
  $("#os").text(os);
  const cpu = [result.cpu.manufacturer, result.cpu.brand, result.cpu.speed].join(' ');
  $("#cpu").text(cpu);
  const baseboard = [result.baseboard.manufacturer, result.baseboard.model, result.baseboard.version].join(' ');
  $("#baseboard").text(baseboard);
  const bios = [result.bios.vendor, result.bios.version].join(' ');
  $("#bios").text(bios);
  const memory = result.memLayout.map(e => e.size).reduce((acc, cur) => acc + cur, 0);
  $("#memory").text(window.mainApi.bytes(memory));
};

$(async function () {
  console.log('document ready at renderer.js');
  receiveSysInfo();
  await getUserInfo();
  await getSysInfo();
});
// Run this function after the page has loaded