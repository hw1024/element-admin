import Vue from 'vue';
import store from './store';
import Router from 'vue-router';

Vue.use(Router);
// 二级路由通用页面
const commentPage = [
  {path: '/user', name: 'user', component: () => import('@/views/account/usercenter.vue')},
  {path: '/user', name: 'user', component: () => import('@/views/account/usercenter.vue')},
  {path: '/main', name: 'main', component: () => import('../components/403.vue')}
];
// 需要权限判断页面
let pageRouter = [
  {path: '/system'},
  {path: '/charts'},

  {path: '/system/role', component: () => import('../views/account/role.vue')},
  {path: '/system/account', component: () => import('../views/account/account.vue')},
  {path: '/system/permission', component: () => import('../views/account/permission.vue')},
  {path: '/system/department', component: () => import('../views/account/department.vue')},
  {path: '/charts/executives/pandect', component: () => import('../views/charts/executives/pandect.vue')},
  {path: '/charts/executives/propertyRrightsExchangeCenter', component: () => import('../views/charts/executives/propertyRrightsExchangeCenter.vue')},
  {path: '/charts/executives/huaJinRent', component: () => import('../views/charts/executives/huaJin-rent.vue')},
  {path: '/charts/executives/huaJinAssure', component: () => import('../views/charts/executives/huaJin-assure.vue')},
  {path: '/charts/executives/huaJinSecuritie', component: () => import('../views/charts/executives/huaJin-securitie.vue')},
  {path: '/charts/executives/huaJinFuture', component: () => import('../views/charts/executives/huaJin-future.vue')},
  {path: '/charts/executives/huaJinAssetManagement', component: () => import('../views/charts/executives/huaJin-asset-management.vue')},
  {path: '/charts/executives/hengQinLife', component: () => import('../views/charts/executives/hengQin-life.vue')},
  {path: '/charts/executives/intimateFriend', component: () => import('../views/charts/executives/intimate-friend.vue')},
  {path: '/charts/executives/yueKeSmallLoans', component: () => import('../views/charts/executives/yueKe-small-loans.vue')},
  {path: '/charts/executives/financialCompany', component: () => import('../views/charts/executives/financial-company.vue')},
  {path: '/riskDashboard/index', component: () => import('@/views/riskDashboard/index.vue')},
  {path: '/riskDashboard/dimension', component: () => import('@/views/riskDashboard/dimension.vue')}
];

const userPromiess = store.getters.permission;
let newPathRouterBook = [];
if (userPromiess.length) {
  for (const page of pageRouter) {
    const __ = userPromiess.filter(m => m.path === page.path);
    if (__.length !== 0) newPathRouterBook.push({...page, ...__[0]});
  };
}
pageRouter = [...newPathRouterBook, ...commentPage];
console.log(userPromiess);
const rootRouter = [
  {path: '/', component: () => import('../views/common/Home.vue'), children: pageRouter, redirect: '/main'},
  {path: '/login', name: 'login', component: () => import('../views/common/login.vue')},
  {path: '*', name: '404', component: () => import('../components/404.vue')},
  {path: '/403', name: '403', component: () => import('../components/403.vue')},
  {path: '/500', name: '500', component: () => import('../components/500.vue')}
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: rootRouter
});
