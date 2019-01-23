const config     = require('../../libs/config');
const sql        = require('../../libs/sql');
const util       = require('../../libs/util');
const dateFormat = require('format-datetime');
const Identicon  = require('identicon.js');
const randomName = require('chinese-random-name');
module.exports = {
  /**
   * @description 用户登陆
   * @param {} params.mobile
   * @param {} params.password
   */
  signIn(params) {
    return new Promise((resolve, reject) => {
      util.validator(params, config.databaseOptions.account).then(res => {
        if (res.code) {
          sql.query('test', `select * from test.account where mobile = '${params.mobile}' || nickname = '${params.mobile}'`).then(res => {
            let account = res[0];
            if (account) {
              const psd = util.md5(params.password + config.passwordHash);
              if (psd === account.password) {
                account.last_login_time = dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss');
                account.token = util.getUserToken();
                // 请求用户权限
                util.getUserpermission(account.role, sql).then(res => {
                  // 更新用户token及lastLoginTime数据
                  let NewObj = {
                    'last_login_time': account.last_login_time,
                    id: account.id,
                    token: account.token
                  };
                  account.permission = res;
                  sql.dataUpload('test', 'account', NewObj, 'id');
                  resolve({code: config.serverCode.success, msg: '登陆成功', data: account});
                })
              } else reject({code: config.serverCode.businessError, msg: '账户与密码不匹配'});
            } else reject({code: config.serverCode.businessError, msg: '未找到该用户'});
          });
        } else reject({code: config.serverCode.businessError, data: res.msg, msg: '登陆失败'});
      })
    });
  },
  /**
   * @description 用户注册
   * @param {} params.mobile
   * @param {} params.password
   */
  reg(params) {
    return new Promise((resolve, reject) => {
      util.validator(params, config.databaseOptions.account).then(res => {
        if (!res.code) reject({code: config.serverCode.businessError, data: res.msg, msg: '验证失败'});
        else {
          const cfg = {isPaging: false, filter: {mobile: `= ${params.mobile}`}};
          sql.dataQuery('test', 'account', cfg).then(res => {
            if (res.length) reject({code: config.serverCode.businessError, msg: '该手机号码已被注册'});

            const account = {
              nickname: randomName.generate(),
              email: null,
              avatar: `data:image/png;base64, ${new Identicon(`小可爱一号-${params.mobile}`, 5).toString()}`,
              mobile: params.mobile,
              password: util.md5(params.password + config.passwordHash),
              last_login_time: dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')
            }
            sql.dataCreate('test', 'account', account).then(res => {
              resolve({code: config.serverCode.success, msg: '注册成功', data: account});
            })
          });
        }
      });
    });
  },
  /**
   * @description 分页查询, 支持模糊查询
   * @param {string} params.pageNum 页码
   * @param {string} params.pageSize 页面数据条数
   * @param {string?} params.nickname 用户昵称 
   * @param {string?} params.mobile 手机号码
   */
  accountQuery(params = {}) {
    return new Promise((resolve, reject) => {
      sql.dataQuery('test', 'account', {
        isPaging: true,
        pageNum: params.pageNum || 1,
        pageSize: params.pageSize || 10,
        filter: {
          nickname: params.nickname ? `like '%${params.nickname}%'` : undefined,
          mobile:   params.mobile   ? `like '%${params.mobile}%'` : undefined
        }
      }).then(res => {
        resolve({code: config.serverCode.success, data: res, msg: '列表拉取成功~'});
      }).catch(err => {
        resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
      })
    });
  },
  /**
   * @description 分页查询, 支持模糊查询
   * @param {string} params.id 必须， 将修改的角色id
   * @param {string?} params.nickname 角色名
   * @param {string?} params.note 用户昵称
   * @param {string?} params.mobile 手机号码
   * @param {string?} params.email  邮箱
   * @param {string?} params.department 所属部门
   * @param {string?} params.role 所属角色
   * @param {string?} params.avatar 头像
   * @param {string?} params.password 密码
   */
  accountUpload(params) {
    return new Promise((resolve) => {
      const cfg = {id: {required: true}}; 
      delete params['token'];
      if (params.password.length !== 32) params['password'] = util.md5(params.password + config.passwordHash);
      util.validator(params, cfg).then(result => {
        if (result.code) {
          sql.dataUpload('test', 'account', params, 'id').then(() => {
            resolve({code: config.serverCode.success, msg: '修改成功~'});
          }).catch(err => {
            resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
          })
        } else resolve({code: config.serverCode.businessError, msg: result.msg});
      })
    });
  },
  accountDelete(params) {
    return new Promise(resolve => {
      if (!params.ids) resolve({code: config.serverCode.businessError, msg: '请选择需要删除的角色'});
      else {
        sql.dataDelete('test', 'account', params.ids, 'id').then(() => {
          resolve({code: config.serverCode.success, msg: '删除成功~'});
        }).catch(err => {
          resolve({code: config.serverCode.businessError, data: err, msg: '列表查询失败'});
        })
      }
    });
  }
}
