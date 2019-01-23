/**
 * 网络请求封装库
 */
import AxiosInst from './axios';
import methodMap from '../method-maps';
import Vue from 'vue';
import config from '../../assets/config';
/**
 * 成功响应处理
 * @param {*} result 成功返回对象
 * @param {*function} cb 回调
 */
function doSuccessInfo(result, cb) {
  setTimeout(() => {
    if (result.request.status === 200) {
      const res = result.data;
      // 后台业务处理判断
      if (!res.code) cb(result.data);
      else {
        doErrInfo(result.data, cb);
      }
    }
  }, config.serverMinResponse);
};

/**
 * 错误处理
 * @param error 错误对象
 * @param cb    回调
 */
function doErrInfo(error, cb) {
  if (handleErrors[error.code]) {
    handleErrors[error.code](error);
  } else {
    cb(error);
  }
};

const requestMethods = {
  get(url, param) {
    return new Promise((resolve, reject) => {
      AxiosInst.get(url, {params: param}).then(res => {
        doSuccessInfo(res, resolve);
      }).catch(err => doErrInfo(err.data, reject));
    });
  },
  post(url, param) {
    return new Promise((resolve, reject) => {
      AxiosInst.post(url, param).then(res => {
        doSuccessInfo(res, resolve);
      }).catch(err => doErrInfo(err.data, reject));
    });
  },
  // TODO: 待确认param携带是否可行
  delete(url, param) {
    return new Promise((resolve, reject) => {
      AxiosInst.delete(url, {params: param}).then(res => {
        doSuccessInfo(res, resolve);
      }).catch(err => doErrInfo(err.data, reject));
    });
  },
  put(url, param) {
    return new Promise((resolve, reject) => {
      AxiosInst.put(url, {params: param}).then(res => {
        doSuccessInfo(res, resolve);
      }).catch(err => doErrInfo(err.data, reject));
    });
  },
  patch(url, param) {
    return new Promise((resolve, reject) => {
      AxiosInst.patch(url, {params: param}).then(res => {
        doSuccessInfo(res, resolve);
      }).catch(err => doErrInfo(err.data, reject));
    });
  }
};

const handleErrors = {
  1201(res) {
    Vue.prototype.$message({type: 'error', message: res.msg});
  },
  300() {},
  4000() {}
};

class Http {}

/**
 * 注册VUE插件
 * @param Vue
 */
Http.install = function (Vue) {
  /**
   * 全局请求接口
   * @param method 方法
   * @param opts 参数
   * @param toast 是否提示
   * @returns {string}
   */
  Vue.prototype.request = function (method, params, toast) {
    // 请求提示
    // 如果有给 toast 参数则显示 loading 加载数据
    if (toast && typeof (toast) === 'boolean') {
      console.log('加载中...');
    } else if (toast && typeof (toast) === 'string') {
      console.log(toast);
    }
    let m = methodMap[method];
    if (m) {
      if (typeof m.method === 'undefined') {
        console.log('method 错误', '缺少请求 method 方法', '\n');
        return false;
      }
      // 请求发起
      return requestMethods[m.method](m.url, params);
    } else {
      closeLoading();
      console.log('url 错误', '返回结果：err = ', '无法请求，无效的请求！', '\n');
    }
  };

  /**
   * 关闭方法
   */
  function closeLoading() {
    // Vue.prototype.$loading.close();
  }
};

export default Http;
