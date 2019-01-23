module.exports = {
  version: '0.0.1',
  router: [
    {path: '/getConfigs',        description: '请求全局配置', methods: 'get', name: 'getCfgs',         response: 'query'},
    {path: '/signIn',            description: '登陆接口', methods: 'post',   name: 'signIn',           response: 'body'},
    {path: '/reg',               description: '注册接口', methods: 'post',   name: 'reg',              response: 'body'},
    {path: '/account/query',     description: '用户查询', methods: 'get',    name: 'accountQuery',     response: 'query'},
    {path: '/account/upload',    description: '用户修改', methods: 'post',   name: 'accountUpload',    response: 'body'},
    {path: '/account/delete',    description: '用户删除', methods: 'delete', name: 'accountDelete',    response: 'query'},
    {path: '/role/query',        description: '角色查询', methods: 'get',    name: 'roleQuery',        response: 'query'},
    {path: '/role/create',       description: '角色创建', methods: 'post',   name: 'roleCreate',       response: 'body'},
    {path: '/role/upload',       description: '角色修改', methods: 'post',   name: 'roleUpload',       response: 'body'},
    {path: '/role/delete',       description: '角色删除', methods: 'delete', name: 'roleDelete',       response: 'query'},
    {path: '/department/query',  description: '部门查询', methods: 'get',    name: 'departmentQuery',  response: 'query'},
    {path: '/department/create', description: '部门创建', methods: 'post',   name: 'departmentCreate', response: 'body'},
    {path: '/department/upload', description: '部门修改', methods: 'post',   name: 'departmentUpload', response: 'body'},
    {path: '/department/delete', description: '部门删除', methods: 'delete', name: 'departmentDelete', response: 'query'},
    {path: '/permission/query',    description: '权限查询', methods: 'get',    name: 'permissionQuery',    response: 'query'},
    {path: '/permission/create',   description: '权限创建', methods: 'post',   name: 'permissionCreate',   response: 'body'},
    {path: '/permission/upload',   description: '权限修改', methods: 'post',   name: 'permissionUpload',   response: 'body'},
    {path: '/permission/delete',   description: '权限删除', methods: 'delete', name: 'permissionDelete',   response: 'query'},
  ]
}