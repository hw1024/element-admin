# element_admin

# 更新日志
> 2019.01.21 v.0.1.0
>> 权限与角色可以正常联动了~\
>> 为了解决登陆繁琐的问题，新增了用户名登陆，快去设置自己的用户名吧~\
>> ...




#### 介绍
基于element、node的后台管理管理系统


#### 软件架构
```
├─.gitee
├─config ---------------------- 配置文件
├─data ------------------------ 数据存储处
│  └─ACCOUNT
|  └─...
├─libs      ------------------- 工具插件/用于后台
├─server    ------------------- 请求处理js
└─static    ------------------- 前端页面
    ├─public
    │  └─img
    │      └─icons
    ├─src
    │  ├─assets --------------- 静态资源
    │  ├─components ----------- 公共组件
    │  │  └─temp
    │  ├─script --------------- 各类js
    │  │  ├─libs
    │  │  └─util
    │  ├─scss ----------------- 样式
    │  └─views ---------------- 页面
    └─tests
        └─unit
```
#### 安装教程

># node后台
>cnpm install\
>nodemon main.js\
>...
># 基于vue前端
>cd ./static\
>cnpm install\
>npm run dev | 编译\
>npm run build | 打包

#### 参考文档

- [node中文网](http://nodejs.cn/api/)
- [菜鸟教程-node篇](http://www.runoob.com/nodejs/nodejs-tutorial.html)
- [node-xlsx](https://www.cnblogs.com/MakeView660/p/7902715.html)
- [更多npm文档请查询](https://npms.io/)
- [vue-cli@3.x](https://cli.vuejs.org/zh/guide/)
- [ElementUI](http://element-cn.eleme.io/#/zh-CN)
