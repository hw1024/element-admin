const crypto     = require('crypto');
const schema     = require('async-validator');

module.exports = {
  md5(psd) {
    const MD5 = crypto.createHash('md5');
    MD5.update(psd);
    return MD5.digest('hex');
  },
  validator(msg, descriptor) {
    // 神奇代码，勿动！！！
    // 注：由于sql返回的是一个数据类的object，与js中的object不同，它莫得hasOwnProperty，所以需要进行改造...
    msg = JSON.parse(JSON.stringify(msg));
    return new Promise((resolve, reject) => {
      var validator = new schema(descriptor);
      validator.validate(msg, errors => {
        if (errors) resolve({code: false, msg: errors});
        else resolve({code: true});
      });
    })
  },
  /**
   * @description sql查询语句封装
   * @param {string} tableName 表名 
   * @param {object} opts 配置
   * @returns {string} sqlStatement
   */
  formatSqlStatement(tableName, opts) {
    let sqlStatement = `select ${opts.returnWords.join(',')} from ${tableName} `;
    let _filter = '';
    if (opts.filter) {
      let statement = '';
      for (const key in opts.filter) {
        const val = opts.filter[key];
        if (typeof val === 'string') statement += ` ${key} ${opts.filter[key]} &&`;
        else if (Array.isArray(val)) {
          for (const child of val) {
            _filter += `${key}='${child}'||`;
          }
          _filter = _filter.substring(0, _filter.length - 2);
          statement += ` (${_filter}) &&`;
        }
      }
      statement = statement.substring(0, statement.length - 2);
      _filter = !!statement ? `where${statement}` : '';
      sqlStatement += _filter;
    }
    if (opts.order) {
      let str = '';
      for (const key in opts.order) {
        str += `${key} ${opts.order[key]},`;
      }
      sqlStatement += `order by ${str.substr(0, str.length - 1)} `;
    };
    if (opts.isPaging) sqlStatement += `limit ${(opts.pageNum - 1) * opts.pageSize}, ${opts.pageSize}`;
    return [sqlStatement, _filter];
  },
  /**
   * @description 数据分页
   * @param {*} counts 数据条数
   * @param {*} data 数据
   * @param {*} opts 分页配置
   */
  formatSqlDataPaging(counts, data, opts) {
    counts = JSON.stringify(counts[0]).replace(/[^0-9]/ig, "");
    const pageCount = opts.isPaging ? Math.ceil(counts / opts.pageSize) : 1;
    const formatData = {
      currentIdx: opts.isPaging ? Number(opts.pageNum) : 1,          //页码
      pageSize: opts.isPaging ? Number(opts.pageSize) : data.length, //每一页数据条数
      totalCount: Number(pageCount),                                        //总页数
      totalElements: Number(counts),                                        //总数据条数
      isFirst: opts.pageNum == 1,                                    //是否第一页
      isEnd: opts.pageNum == pageCount,                              //是否最后一页
      list: data
    };
    return opts.isPaging ? formatData : {list: data, currentIdx: 1, totalElements: Number(counts)};
  },
  /**
   * 获取一个随机32位token
   */
  getUserToken() {
    const lib = '0123456789qwertuiopasdfghjklzxcvbnm';
    const length = 32;
    let token = [];
    for (let i = 0; i < length; i++) {
      const key = Math.ceil(Math.random() * lib.length);
      token.push(lib[key]);
    };
    const spacing = [4, 9, 18, 22];
    for (const it of spacing) {
      token[it] = '-';
    }
    return token.join('');
  },
  getUserpermission(roleId, sql) {
    return new Promise(resolve => {
      sql.dataQuery('test', 'role', {isPaging: false, filter: {id: `= ${roleId}`}}).then(res => {
        const permissions = JSON.parse(res.list[0].permission);
        sql.dataQuery('test', 'permission', {
          isPaging: false,
          filter: {
            id: permissions
          }}
        ).then(userPermissions => {
          resolve(userPermissions.list);
        });
      })
    })
  }
}