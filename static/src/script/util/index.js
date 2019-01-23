import Vm from '../../main';

const util = {
  formCache: {
    save(tip, name, msg) {
      return new Promise(resolve => {
        Vm.$confirm(tip).then(() => {
          Vm.$store.commit('saveEditCache', this.format(name, msg));
          Vm.$message({message: '保存成功，关闭浏览器将丢失数据！', type: 'warning'});
          resolve();
        });
      });
    },
    get(name) {
      return new Promise(resolve => {
        const lib = Vm.$store.getters.editCache;
        if (lib && lib[name]) {
          Vm.$confirm('检索到您保存的表单数据，是否提取？').then(() => {
            const _copy = lib[name];
            Vm.$store.commit('saveEditCache', this.format(name, null));
            resolve(_copy);
          }).catch(() => {
            Vm.$store.commit('saveEditCache', this.format(name, null));
            resolve();
          });
        } else {
          resolve();
        }
      });
    },
    format(name, msg) {
      let key = {};
      key[name] = msg;
      return key;
    }
  },
  clone(obj) {
    let str = obj.constructor === Array ? [] : {};
    let newObj = obj.constructor === Array ? [] : {};
    //判断是否是对象
    if (typeof obj !== 'object') {
      return newObj;
    } else if (window.JSON) {
      str = JSON.stringify(obj); //序列化对象
      newObj = JSON.parse(str); //还原
    } else {
      for (let i in obj) {
        newObj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i];
      }
    }
    return newObj;
  },
  /**@description 升序排序 */
  compareUp(arr, propertyName) {
    if ((typeof arr[0][propertyName]) !== 'number') { // 属性值为非数字
      return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value1.localeCompare(value2);
      };
    } else {
      return function(object1, object2) { // 属性值为数字
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value1 - value2;
      };
    }
  },
  /**@description 降序排序 */
  compareDown(arr, propertyName) {
    if ((typeof arr[0][propertyName]) !== 'number') { // 属性值为非数字
      return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        console.log(propertyName, value2);
        return value2.localeCompare(value1);
      };
    } else {
      return function(object1, object2) { // 属性值为数字
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2 - value1;
      };
    }
  },
  /**标题栏监听 */
  listenBrowerTab() {
    function getHiddenProp() {
      var prefixes = ['webkit', 'moz', 'ms', 'o'];
      // if 'hidden' is natively supported just return it
      if ('hidden' in document) return 'hidden';
      // otherwise loop over all the known prefixes until we find one
      for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'Hidden') in document) return prefixes[i] + 'Hidden';
      }
      // otherwise it's not supported
      return null;
    }
    function getVisibilityState() {
      var prefixes = ['webkit', 'moz', 'ms', 'o'];
      if ('visibilityState' in document) return 'visibilityState';
      for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document) return prefixes[i] + 'VisibilityState';
      }
      // otherwise it's not supported
      return null;
    }

    // function isHidden() {
    //   var prop = getHiddenProp();
    //   if (!prop) return false;
    //   return document[prop];
    // }

    // use the property name to generate the prefixed event name
    var visProp = getHiddenProp();
    if (visProp) {
      var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
      document.addEventListener(evtname, function () {
        document.title = document[getVisibilityState()] === 'visible' ? '你肥来辣，开心♪~' : '(/▽＼)憋走！！！';
      }, false);
    }
  },
  FormatTime(date, fmt) {
    date = new Date(date);
    const o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); };
    for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); };
    return fmt;
  },
  handlePermission(datas, sort) {
    let box = [];
    // 迭代器
    const iterationer = (lib, item) => {
      for (let it of lib) {
        if (it.id === item.parentId) {
          it.children = [...it.children || [], item];
          if (sort) it.children.sort(util.compareDown(it.children, sort));
          break;
        } else if (it.children) {
          iterationer(it.children, item);
        };
      }
    };
    for (let item of datas) {
      // item.name = `${item.name} ${item.id}`;
      if (item.parentId === 0) box.push(item);
      else iterationer(box, item);
    };
    if (sort) box.sort(util.compareDown(box, sort));
    return box;
  }
};

export default util;
