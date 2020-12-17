const si = require('systeminformation')

const getSysInfo = async () => {
    const result = await si.getStaticData();
    result.users = await si.users();
    return result;
}

module.exports = {
    getSysInfo,
}