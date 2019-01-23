import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './script/router';
import store from './script/store';
import './script/util/registerServiceWorker';
import Http from './script/libs/https';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './scss/common.scss';
import './scss/risk.scss';
import util from './script/util';

// 仪表盘 配置文件
import '../public/js/config';
import '../public/js/main';
import '../public/css/common.scss';

Vue.use(ElementUI);
Vue.prototype.$ELEMENT = {size: 'mini', zIndex: 3000, shadow: 'hover'};
// Vue.config.productionTip = false;
Vue.use(Http);
Vue.component('tableTemp', () => import('@/components/temp/table.vue'));
Vue.component('dialogTemp', () => import('@/components/temp/dialog.vue'));
Vue.component('formTemp', () => import('@/components/temp/form.vue'));
Vue.component('formItemTemp', () => import('@/components/temp/form-items.vue'));
Vue.component('wImage', () => import('@/components/temp/image.vue'));

Vue.prototype.$util = util;
router.beforeEach((to, from, go) => {
  const token = store.getters.token;
  if (!token && to.path !== '/login') {
    // 清空数据
    store.commit('saveAccountInfo', null);
    router.push('/login');
  } else go();
});

export default new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    getConfig() {
      this.request('getConfig').then(res => {
        store.commit('setDefaultConfig', res);
      });
    }
  },
  created() {
    util.listenBrowerTab();
    this.getConfig();
  }
}).$mount('#app');
