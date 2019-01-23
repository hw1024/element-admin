const config = require('./config').company_database;
const mysql  = require('mysql');
const util   = require('./util');

const sql = {
  pool: {},
  cache: {},
  open(name) {
    if (!this.pool[name]) {
      this.pool[name] = mysql.createConnection({
        host: config.host,
        user: config.userName,
        password: config.password,
        port: config.port,
        database: name
      });
      this.pool[name].wws_status = false;
    };
    if (this.pool[name].wws_status === false) {
      this.pool[name].connect();
      this.pool[name].wws_status = true;
    };
  },
  /**
   * @description sql请求
   * @param {String} name 数据库名
   * @param {Array} msg sql查询语句
   */
  query(name, ...msg) {
    // console.log(msg);
    return new Promise((resolve, reject) => {
      this.open(name);
      this.pool[name].query(...msg, (error, result, feild) => {
        if (error) reject(error);
        else resolve(result);
      })
    });
  },
  close(name) {
    if (this.pool[name].wws_status === true) {
      this.pool[name].end();
      this.pool[name].wws_status = false;
    }
  },
  /**
   * @param {string} databaseName 数据库名
   * @param {string} tableName 表名
   * @param {object} opts 请求配置，见defaultConfig
   * 注1： filter中支持单选及复选，val值为筛选条件，为适应更多场景，请填入关键字如：like/>/</=...
   *      单选用{key: string\'like xxx'/'> 10'/' = 10'}表示
   *      复选用{key: array}表示
   * 注2： order需表明正序/倒序 exp: {key: asc/desc}
   */
  dataQuery(databaseName, tableName, opts) {
    const defaultConfig = {
      returnWords: ['*'],                 //返回字段
      isPaging: false,                    //是否分页
      pageNum: 1,                         //页码
      pageSize: 10,                       //分页配置
      order: null,                        //排序key值
      filter: null                        //筛选key值
    };
    opts = {...defaultConfig, ...opts};
    const sqlStatement = util.formatSqlStatement(tableName, opts);
    // console.log(`SELECT count(*) from ${tableName} ${sqlStatement[1]}`);
    // console.log(sqlStatement[0]);
    const counts = new Promise((resolve, reject) => {
      this.query(databaseName, `SELECT count(*) from ${tableName} ${sqlStatement[1]}`).then(res => {
        resolve(res);
      }).catch(err => reject(err));
    });
    const list = new Promise((resolve, reject) => {
      this.query(databaseName, sqlStatement[0]).then(res => {
        resolve(res);
      }).catch(err => reject(err));
    })
    return new Promise((resolve, reject) => {
      Promise.all([counts, list]).then(res => {
        const key = util.formatSqlDataPaging(...res, opts);
        resolve(key);
      }).catch(err => reject(err));
    });
  },
  /**
   * @description 数据填充
   * @param {string} databaseName 数据库名
   * @param {string} tableName 表名
   * @param {object} params columns
   */
  dataCreate(databaseName, tableName, params) {
    let keys = [];
    let vals = [];
    for (const key in params) {
      if (!!params[key]) {
        keys.push(key);
        vals.push(`'${params[key]}'`);
      }
    };
    const statement = `insert into ${tableName} (${keys.join(',')}) values (${vals.join(',')})`;
    return new Promise((resolve, reject) => {
      this.query(databaseName, statement).then(res => {
        resolve(res);
      }).catch(err => reject(err));
    });
  },
  /**
   * 数据上传
   * @param {string} databaseName 
   * @param {string} tableName 
   * @param {object} params 需上传的数据
   * @param {string} _id 修改依据，一般为数据库主键
   * @returns 
   */
  dataUpload(databaseName, tableName, params, _id) {
    let str = [];
    let root = ''
    for (const key in params) {
      if (key !== _id) str.push(`${key}='${params[key]}'`);
      else root = `${_id}='${params[key]}'`;
    };
    const sqlStatement = `UPDATE ${tableName} SET ${str.join(',')} WHERE ${root}`;
    return new Promise((resolve, reject) => {
      this.query(databaseName, sqlStatement).then(res => {
        resolve(res);
      }).catch(err => reject(err));
    })
  },
  /**
   * 数据删除
   * @param {string} databaseName
   * @param {string} tableName
   * @param {array} ids 需要删除的id
   * @param {string} key 删除依据，一般为主键
   */
  dataDelete(databaseName, tableName, ids, key) {
    !Array.isArray(ids) ? ids = [ids] : ids; 
    let str = [];
    for (const id of ids) {
      str.push(`${key}=${id}`);
    }
    str = `delete from ${tableName} where ${str.join('||')}`;
    return new Promise((resolve, reject) => {
      this.query(databaseName, str).then(res => {
        resolve(res);
      }).catch(err => reject(err));
    })
  },
};
module.exports = sql;
