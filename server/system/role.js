const sql    = require('../../libs/sql');
const config = require('../../libs/config');
const util   = require('../../libs/util');

module.exports = {
  /**
   * @description 分页查询, 支持模糊查询
   * @param {pageNum, pageSize, ?roleName} params 
   */
  roleQuery(params = {}) {
    return new Promise((resolve, reject) => {
      sql.dataQuery('test', 'role', {
        isPaging: true,
        pageNum: params.pageNum || 1,
        pageSize: params.pageSize || 10,
        filter: {
          roleName: params.roleName ? `like '%${params.roleName}%'` : undefined
          // roleName: params.roleName ? `='${params.roleName}'` : undefined
        }
      }).then(res => {
        resolve({code: config.serverCode.success, data: res, msg: '列表拉取成功~'});
      }).catch(err => {
        resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
      })
    });
  },
  /**
   * @param {string} params.roleName 角色名
   * @param {?string} params.note 备注
   */
  roleCreate(params) {
    return new Promise((resolve, reject) => {
      util.validator(params, config.databaseOptions.role).then(res => {
        if (res.code) {
          sql.dataCreate('test', 'role', params).then(() => {
            resolve({code: config.serverCode.success, msg: '新增成功~'});
          }).catch(err => {
            resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
          })
        } else resolve({code: config.serverCode.businessError, msg: res.msg});
      });
    });
  },
  /**
   * 修改角色
   * @param {number}  params.id       必须， 将修改的角色id
   * @param {?string} params.roleName 角色名
   * @param {?string} params.note     角色职能/备注
   * @param {?object} params.permission 角色权限
   */
  roleUpload(params) {
    return new Promise((resolve) => {
      const cfg = {...config.databaseOptions.role, ...{id: {required: true}}}; 
      util.validator(params, cfg).then(result => {
        if (result.code) {
          sql.dataUpload('test', 'role', params, 'id').then(() => {
            resolve({code: config.serverCode.success, msg: '修改成功~'});
          }).catch(err => {
            resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
          })
        } else resolve({code: config.serverCode.businessError, msg: result.msg});
      })
    });
  },
  roleDelete(params) {
    return new Promise(resolve => {
      if (!params.ids) resolve({code: config.serverCode.businessError, msg: '请选择需要删除的角色'});
      else {
        sql.dataDelete('test', 'role', params.ids, 'id').then(() => {
          resolve({code: config.serverCode.success, msg: '删除成功~'});
        }).catch(err => {
          resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
        })
      }
    });
  }
}
