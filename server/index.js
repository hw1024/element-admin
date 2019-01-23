const account = require('./system/account');
const role = require('./system/role');
const department = require('./system/department');
const permission = require('./system/permission');

const common = require('./common');

module.exports = {...account, ...role, ...department, ...permission, ...common};
