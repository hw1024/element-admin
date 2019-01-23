/**
 * axios初始封装
 */
import axios from 'axios';
import router from '../router';
// import Cookie from 'js-cookie';

// let myToken = Cookie.getJSON('DELOITTE_ACCOUNT_INFO');
// myToken = myToken.token ? myToken.token : '';
let myToken = '';

const config = {
  // baseURL: '',
  // 时间短了 先关闭掉
  // timeout: 2000,
  // 是否是跨域请求
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
    'X-account-token': myToken
  },
  // transformRequest: [function (data) {
  //   // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
  //   data = Qs.stringify(data);
  //   return data;
  // }],
  // 返回数据类型
  responseType: 'json'
};
const AxiosInst = axios.create(config);
/** @type {请求拦截} */
AxiosInst.interceptors.request.use((config) => {
  if (config.method === 'post') {
    // 如果是post方式，则使用json方式处理
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'X-account-token': myToken
    };
  };
  return config;
}, (err) => {
  return Promise.reject(err);
});
/** @type {响应拦截} */
AxiosInst.interceptors.response.use(response => {
  // 检查数据是否返回NULL
  if (response.data === null) {
    return Promise.reject(response);
  }
  return response;
}, (error) => {
  // 下面是接口回调的status ,因为我做了一些错误页面,所以都会指向对应的报错页面
  switch (error.response.status) {
    case 404:
      setTimeout(() => { router.push( { path: '/404' }); }, 1500);
      break;
    case 500:
      setTimeout(() => { router.push( { path: '/500' }); }, 1500);
      break;
  }
  //请求错误时做些事
  return Promise.reject(error);
});
export default AxiosInst;
