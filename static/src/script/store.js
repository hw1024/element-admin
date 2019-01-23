import Vue from 'vue';
import Vuex from 'vuex';
import Cookie from 'js-cookie';
import cfg from '../assets/config';

Vue.use(Vuex);
const usderInfo = localStorage.getItem('DELOITTE_ACCOUNT_INFO');
const permission = localStorage.getItem('DELOITTE_ACCOUNT_PERMISSION');
const editCache = sessionStorage.getItem('DELOITTE_EDITCACHE');
const serverCfg = sessionStorage.getItem('DELOITTE_SERVERCFG');
const tabCache = sessionStorage.getItem('DELOITTE_TAB_CACHE');

export default new Vuex.Store({
  state: {
    // 左侧菜单大/小状态
    menuStatus: true,
    // 用户token
    DELOITTE_TOKEN: Cookie.getJSON('DELOITTE_TOKEN'),
    // 用户信息缓存
    usderInfo: usderInfo ? JSON.parse(usderInfo) : {},
    // 用户权限缓存
    permission: permission ? JSON.parse(permission) : [],
    // 编辑修改缓存
    editCache: editCache ? JSON.parse(editCache) : {},
    // 服务端配置
    serverCfg: serverCfg ? JSON.parse(serverCfg) : {},
    // tab标签页
    tabCache: tabCache ? JSON.parse(tabCache) : {}
  },
  getters: {
    token: state => state.DELOITTE_TOKEN,
    accountInfo: state => state.usderInfo,
    getMenuStatus: state => state.menuStatus,
    permission: state => state.permission,
    editCache: state => state.editCache,
    serverCfg: state => state.serverCfg,
    tabCache: state => state.tabCache
  },
  mutations: {
    /**@desc 左侧菜单展开/缩小*/
    toggleMenuStatus(state) { state.menuStatus = !state.menuStatus; },
    /**
     * @desc 记录用户信息（token、信息、权限）
     * 使用场景： 登陆/注册
     */
    saveAccountInfo(state, msg) {
      if (msg !== null) {
        Cookie.set('DELOITTE_TOKEN', msg.token, {expires: cfg.userInfoValidityPeriod});
        state.DELOITTE_TOKEN = msg.token;
        localStorage.setItem('DELOITTE_ACCOUNT_PERMISSION', JSON.stringify(msg.permission));
        state.permission = permission;
        delete msg.token;
        delete msg.permission;
        delete msg.password;
        localStorage.setItem('DELOITTE_ACCOUNT_INFO', JSON.stringify(msg));
        state.usderInfo = msg;
      }
    },
    /**
     * @desc 提交用户权限
     */
    saveAccountpermission(state, msg) { state.permission = msg; },
    /**@desc 提交表单修改缓存，尤其涉及到大量文字修改时的缓存 */
    saveEditCache(state, msg) {
      let key = {...state.editCache, ...msg};
      sessionStorage.setItem('DELOITTE_EDITCACHE', JSON.stringify(key));
      state.editCache = msg;
    },
    /**@desc 登出账号 */
    logOut(state) {
      Cookie.remove('DELOITTE_TOKEN');
      state.DELOITTE_TOKEN = '';
      localStorage.removeItem('DELOITTE_ACCOUNT_PERMISSION');
      localStorage.removeItem('DELOITTE_ACCOUNT_INFO');
      state.permission = [];
      state.usderInfo = {};
    },
    /**@desc 提交系统配置 */
    setDefaultConfig(state, config) {
      sessionStorage.setItem('DELOITTE_SERVERCFG', JSON.stringify(config));
      state.serverCfg = config;
    },
    /**@desc 新建标签页*/
    openNewPage(state, pageName) {
      console.log(state, pageName);
    },
    closePage(state, pageName) {
      console.log(state, pageName);
    },
    closeOtherPage(state, pageName) {
      console.log(state, pageName);
    },
    closeRightPage(state, pageName) {
      console.log(state, pageName);
    },
    closeAllPage() {}
  },
  actions: {
    // 支持异步操作...
  }
});
