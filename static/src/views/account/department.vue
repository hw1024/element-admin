<template>
  <div>
    <table-temp ref="tableTemp" :cfg="tableCfg">
      <span slot="extra">
        <el-button type="success" @click="createRole">create</el-button>
        <el-button type="warning" @click="deleteRole">delete</el-button>
        <el-button type="primary" @click="$refs['tableTemp'].query()">refresh</el-button>
      </span>
      <p slot="filter">
      </p>
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
  name: 'department',
  data() {
    return {
      dialog: {
        title: '创建部门',
        isAdd: true,
        width: '520px'
      },
      tableCfg: {
        border: true,
        title: '部门管理',
        icon: 'fa-cubes',
        tableQueryMethods: 'queryDepartment',
        columns: [
          {val: '#', type: 'selection'},
          {key: 'name', val: '部门名'},
          {key: 'note', val: '部门职能'},
          {key: 'counts', val: '部门人数'},
          {key: 'comment', val: '备注'}
        ],
        operates: {
          list: [{
            label: '修改',
            type: 'text',
            method: a => {
              this.dialog.isAdd = false;
              this.dialog.title = '修改部门';
              this.$refs['dialogTemp'].open();
              if (this.$refs['formTemp']) this.$refs['formTemp'].reset();
              this.formCfg.data = this.$util.clone(a);
            }
          }]
        }
      },
      formCfg: {
        data: {
          name: '',
          note: '',
          comment: ''
        },
        el: [
          {prop: 'name', label: '部门名',   type: 'input', isRange: true},
          {prop: 'note', label: '部门描述', type: 'textarea'},
          {prop: 'comment', label: '备注',  type: 'textarea'}
        ],
        rules: {
          name: {required: true},
          note: {max: 30}
        }
      }
    };
  },
  methods: {
    createRole() {
      this.$util.formCache.get('role').then(res => {
        this.dialog.isAdd = true;
        this.dialog.title = '创建部门';
        if (this.$refs['formTemp']) this.$refs['formTemp'].reset();
        this.formCfg.data = res || {roleName: '', note: ''};
        this.$refs['dialogTemp'].open();
      });
    },
    cancelEdit() {
      const msg = this.$refs['formTemp'].config.data;
      this.$util.formCache.save('将要离开编辑，是否保存内容？', 'role', msg);
      this.$refs['dialogTemp'].close();
    },
    saveEdit() {
      this.$refs['formTemp'].validate().then(result => {
        if (result) {
          const params = this.$refs['formTemp'].config.data;
          const path   = this.dialog.isAdd ? 'createDepartment' : 'uploadDepartment';
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
          this.request('deleteDepartment', {ids: ids}).then(res => {
            this.$message({message: res.msg, type: 'success'});
            this.$refs['tableTemp'].query();
          });
        });
      }
    }
  },
  mounted() {}
};
</script>
