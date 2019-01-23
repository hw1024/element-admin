const methodMap = {
  // talk:             {url: '/api.php?key=free&appid=0', method: 'get'},
  getConfig: {url: '/api/getConfigs', method: 'get'},
  login: {url: '/api/signIn', method: 'post'},
  register: {url: '/api/reg', method: 'post'},
  queryRole: {url: '/api/role/query', method: 'get'},
  createRole: {url: '/api/role/create', method: 'post'},
  uploadRole: {url: '/api/role/upload', method: 'post'},
  deleteRole: {url: '/api/role/delete', method: 'delete'},
  queryDepartment: {url: '/api/department/query', method: 'get'},
  createDepartment: {url: '/api/department/create', method: 'post'},
  uploadDepartment: {url: '/api/department/upload', method: 'post'},
  deleteDepartment: {url: '/api/department/delete', method: 'delete'},
  queryAccount: {url: '/api/account/query', method: 'get'},
  uploadAccount: {url: '/api/account/upload', method: 'post'},
  queryPermission: {url: '/api/permission/query', method: 'get'},
  createPermission: {url: '/api/permission/create', method: 'post'},
  uploadPermission: {url: '/api/permission/upload', method: 'post'},
  deletePermission: {url: '/api/permission/delete', method: 'delete'}
};
export default methodMap;
