const sql = require('../libs/sql');
module.exports = {
  getCfgs() {
    let cfg = {
      role: 'select id, roleName from role',
      department: 'select id, name from department'
    };
    let libs = [];
    for (const key in cfg) {
      libs.push(
        new Promise((resolve, reject) => {
          sql.query('test', cfg[key])
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
      );
    }
    return new Promise((resolve, reject) => {
      Promise.all(libs).then(res => {
        let idx = 0;
        for (const key in cfg) {
          let newData = [];
          for (const item of res[idx]) {
            let _item = {key: item.id, val: item.name || item.roleName};
            newData.push(_item);
          }
          cfg[key] = newData;
          idx++;
        }
        resolve(cfg);
      }).catch(err => reject(err));
    })
  }
}