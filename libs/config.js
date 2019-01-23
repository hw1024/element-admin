module.exports = {
  outside_database: {
    host: 'mysql57.rdsm1oeuc9fptta.rds.gz.baidubce.com',
    port: 3306,
    userName: 'hello',
    password: '1234567890a'
  },
  company_database: {
    host: '10.173.40.36',
    port: 3306,
    userName: 'risk',
    password: 'risk',
    database: 'test'
  },
  host: "localhost",
  port: 13666,
  serverUrlHeader: '/api',
  pageTitle: "通信及储存测试",
  serverCode: {
    success: 0,
    businessError: 1201
  },
  passwordHash: "xxu.com",
  databaseOptions: {
    account: {
      mobile: {required: true},
      password: {required: true, pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9\\W]{6,20}$/}
    },
    role: { 
      roleName: {required: true, max: 20},
      note: {max: 100}
    },
    department: {
      name: {required: true, max: 20},
      note: {max: 100}
    },
    permission: {
      name: {required: true, max: 5},
      type: {required: true, pattern: /^[0|1]$/},
      icon: {max: 30},
      path: {validator(rule, val, cb, source) {
        if (source.type == 0 && !val) cb(new Error('type为0时，path必填'));
        cb();
      }},
      parentId: {required: true}
    }
  }
}