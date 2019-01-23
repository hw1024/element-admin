const sql    = require('../../libs/sql');
const config = require('../../libs/config');
const util   = require('../../libs/util');

module.exports = {
  /**
   * @description 分页查询, 支持模糊查询
   * @param {?Number} params.pageNum 页码
   * @param {?Number} params.pageSize 页面数据条数
   * @param {?string} params.id 权限id
   * @param {?string} params.parentId 父级权限id
   */
  permissionQuery(params = {}) {
    return new Promise((resolve, reject) => {
      sql.dataQuery('test', 'permission', {
        isPaging: params.pageNum ? true : false,
        pageNum: params.pageNum,
        pageSize: params.pageSize || 10,
        filter: {
          id: params.id ? `= ${params.id}` : undefined,
          parentId: params.parentId ? `= ${params.parentId}` : undefined,
        }
      }).then(res => {
        resolve({code: config.serverCode.success, data: res, msg: '列表拉取成功~'});
      }).catch(err => {
        resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
      })
    });
  },
  /**
   * @param {string} params.name 权限名
   * @param {string} params.note 权限备注
   * @param {string} params.path 前端路由路径
   * @param {string} params.icon 菜单图标
   * @param {string} params.parentId 父级id
   */
  permissionCreate(params) {
    return new Promise((resolve, reject) => {
      util.validator(params, config.databaseOptions.permission).then(res => {
        if (res.code) {
          sql.dataCreate('test', 'permission', params).then(() => {
            resolve({code: config.serverCode.success, msg: '新增成功~'});
          }).catch(err => {
            resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
          })
        } else resolve({code: config.serverCode.businessError, msg: res.msg});
      });
    });
  },
  permissionUpload(params) {
    return new Promise((resolve) => {
      const cfg = {...config.databaseOptions.permission, ...{id: {required: true}}}; 
      util.validator(params, cfg).then(result => {
        if (result.code) {
          sql.dataUpload('test', 'permission', params, 'id').then(() => {
            resolve({code: config.serverCode.success, msg: '修改成功~'});
          }).catch(err => {
            resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
          })
        } else resolve({code: config.serverCode.businessError, msg: result.msg});
      })
    });
  },
  permissionDelete(params) {
    return new Promise(resolve => {
      if (!params.ids) resolve({code: config.serverCode.businessError, msg: '请选择需要删除的部门'});
      else {
        sql.dataDelete('test', 'permission', params.ids, 'id').then(() => {
          resolve({code: config.serverCode.success, msg: '删除成功~'});
        }).catch(err => {
          resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
        })
      }
    });
  }
}
