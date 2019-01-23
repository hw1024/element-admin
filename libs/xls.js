const xls = require('node-xlsx');
const fs  = require('fs');

const cachePath = './data'
module.exports = {
  get(tableName) {
    const lib = xls.parse(`${cachePath}/${tableName}.xls`);
    return lib;
  },
  upload(tableName, data) {
    const DATA_TYPE_ERROR = {code: false, msg: '存储数据格式不正确'};
    const SAVE_SUCCESS = {code: true, msg: '保存成功'};
    return new Promise((resolve, reject) => {
      if (!Array.isArray(data)) reject(DATA_TYPE_ERROR);
      else {
        for (const item of data) {
          if (!item.name) {reject(DATA_TYPE_ERROR)}
        };
        // 通过检测
        const buffer = xls.build(data);
        fs.writeFile(`${cachePath}/${tableName}.xls`, buffer, (err) => {
          if (err) throw err;
          else resolve(SAVE_SUCCESS);
        })
      }
    });
  },
  add(tableName, data) {
    fs.open(`${cachePath}/${tableName}.xls`, 'w+', (err, fd) => {
      if (err) throw err;
      else return this.upload(tableName, data);
    })
  },
  /**
   * @description 将数组格式数据转为对象格式
   * @param {Array} data 待转换数据
   * @returns {Object} lib
   */
  formatDataToObj(data) {
    data = data[0].data;  // xls文件限制造成，勿动
    let lib = [];
    let key = data[0];
    data.forEach((item, idx) => {
      if (idx) {
        let __ = {};
        key.map((_key, _idx) => {
          __[_key] = item[_idx];
        });
        lib.push(__);
      }
    });
    lib.__proto__._type = '_OBJECT';
    return lib;
  },
  /**
   * @description 将对象格式数据转为数组格式
   * @param {Object} data 待转换数据
   * @returns {Array} cacheData
   */
  formatDataToArr(data) {
    let cacheData = [];
    let head = [];
    for (const key in data[0]) {
      head.push(key);
    }
    cacheData.push(head);
    for (const it of data) {
      let __ = [];
      for (const child in it) {
        __.push(it[child]);
      }
      cacheData.push(__);
    };
    return [{name: 'datas', data: cacheData}]; //xls文件造成，勿动
  }
}