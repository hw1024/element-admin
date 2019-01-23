<template>
  <div>
    <table-temp ref="tableTemp" :cfg="tableCfg">
      <span slot="extra">
        <el-button type="primary" @click="$refs['tableTemp'].query()">refresh</el-button>
      </span>
    </table-temp>

    <dialog-temp ref="dialogTemp" :cfg="dialog">
      <form-temp ref="formTemp" slot="content" :cfg="formCfg"></form-temp>
      <p slot="footer">
        <el-button type="text" @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="saveEdit">确定</el-button>
      </p>
    </dialog-temp>
  </div>
</template>

<script>
export default {
  name: 'account',
  computed: {
    roleOption() {
      // this.formCfg.el[3].child = this.$store.getters.serverCfg.role;
      return this.$store.getters.serverCfg.role;
    },
    departmentOption() {
      // this.formCfg.el[4].child = this.$store.getters.serverCfg.department;
      return this.$store.getters.serverCfg.department;
    }
  },
  data() {
    return {
      dialog: {
        title: '修改用户信息',
        width: '520px'
      },
      tableCfg: {
        border: true,
        title: '角色管理',
        icon: 'fa-cube',
        tableQueryMethods: 'queryAccount',
        columns: [
          {val: '#', type: 'selection'},
          {key: 'nickname', val: '昵称'},
          {key: 'mobile', val: '手机号'},
          {key: 'email', val: 'email'},
          {key: 'role', val: '所属角色', render: (h, data) => {
            const role = this.roleOption.filter(m => m.key === data.row.role)[0];
            return h('span', role ? role.val : '未知角色');
          }},
          {key: 'department', val: '所属部门', render: (h, data) => {
            const department = this.departmentOption.filter(m => m.key === data.row.department)[0];
            return h('span', department ? department.val : '未知部门');
          }},
          {key: 'last_login_time', val: '最后登陆时间', width: '140', render: (h, data) => {
            return h('span', this.$util.FormatTime(data.row.last_login_time, 'yyyy/MM/dd hh:mm:ss'));
          }}
        ],
        operates: {
          list: [{
            label: '修改',
            type: 'text',
            method: a => {
              this.$refs['dialogTemp'].open();
              if (this.$refs['formTemp']) this.$refs['formTemp'].reset();
              this.formCfg.data = this.$util.clone(a);
            }
          }]
        }
      },
      formCfg: {
        data: {
        },
        el: [
          {prop: 'nickname', label: '用户昵称', type: 'input'},
          {prop: 'mobile', label: '手机号码', type: 'input'},
          {prop: 'email', label: 'email', type: 'input'},
          {prop: 'role', label: '所属角色', type: 'select', children: []},
          {prop: 'department', label: '所属部门', type: 'select', children: []}
        ],
        rules: {
          roleName: {required: true},
          note: {max: 30}
        }
      }
    };
  },
  methods: {
    cancelEdit() {
      const msg = this.$refs['formTemp'].config.data;
      this.$util.formCache.save('将要离开编辑，是否保存内容？', 'role', msg);
      this.$refs['dialogTemp'].close();
    },
    saveEdit() {
      this.$refs['formTemp'].validate().then(result => {
        if (result) {
          let   params = this.$refs['formTemp'].config.data;
          const path   = 'uploadAccount';
          // FIXME: 暂时关闭修改头像
          delete params.last_login_time;
          delete params.avatar;
          this.request(path, params).then(res => {
            this.$message({message: res.msg, type: 'success'});
            this.$refs['dialogTemp'].close();
            this.$refs['tableTemp'].query();
          });
        } else this.$message({message: '请补全表单后重试~', type: 'error'});
      });
    },
    deleteRole() {
      const selected = this.$refs['tableTemp'].selectionCache;
      if (!selected.length) this.$message({message: '请选择将要删除的选项', type: 'warning'});
      else {
        let ids = [];
        for (const it of selected) {
          ids.push(it.id);
        };
        this.$confirm('将要删除部分数据，删除后无法找回，是否继续？').then(() => {
          this.request('deleteRole', {ids: ids}).then(res => {
            this.$message({message: res.msg, type: 'success'});
            this.$refs['tableTemp'].query();
          });
        });
      }
    }
  },
  created() {
    this.formCfg.el[3].child = this.roleOption;
    this.formCfg.el[4].child = this.departmentOption;
  }
};
</script>
