const sql    = require('../../libs/sql');
const config = require('../../libs/config');
const util   = require('../../libs/util');

module.exports = {
  /**
   * @description 分页查询, 支持模糊查询
   * @param {pageNum, pageSize, name?} params 
   */
  departmentQuery(params = {}) {
    return new Promise((resolve, reject) => {
      sql.dataQuery('test', 'department', {
        isPaging: true,
        pageNum: params.pageNum || 1,
        pageSize: params.pageSize || 10,
        filter: {
          name: params.name ? `like '%${params.name}%'` : undefined
          // name: params.name ? `='${params.name}'` : undefined
        }
      }).then(res => {
        resolve({code: config.serverCode.success, data: res, msg: '列表拉取成功~'});
      }).catch(err => {
        resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
      })
    });
  },
  /**
   * @param {object} params {name 部门名，note：部门职能}
   */
  departmentCreate(params) {
    return new Promise((resolve, reject) => {
      util.validator(params, config.databaseOptions.department).then(res => {
        if (res.code) {
          sql.dataCreate('test', 'department', params).then(() => {
            resolve({code: config.serverCode.success, msg: '新增成功~'});
          }).catch(err => {
            resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
          })
        } else resolve({code: config.serverCode.businessError, msg: res.msg});
      });
    });
  },
  /**
   * @param {object} params {id: 必须， 将修改的部门id，name: 部门名，note: 部门职能}
   */
  departmentUpload(params) {
    return new Promise((resolve) => {
      const cfg = {...config.databaseOptions.department, ...{id: {required: true}}}; 
      util.validator(params, cfg).then(result => {
        if (result.code) {
          sql.dataUpload('test', 'department', params, 'id').then(() => {
            resolve({code: config.serverCode.success, msg: '修改成功~'});
          }).catch(err => {
            resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
          })
        } else resolve({code: config.serverCode.businessError, msg: result.msg});
      })
    });
  },
  departmentDelete(params) {
    return new Promise(resolve => {
      if (!params.ids) resolve({code: config.serverCode.businessError, msg: '请选择需要删除的部门'});
      else {
        sql.dataDelete('test', 'department', params.ids, 'id').then(() => {
          resolve({code: config.serverCode.success, msg: '删除成功~'});
        }).catch(err => {
          resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
        })
      }
    });
  }
}
