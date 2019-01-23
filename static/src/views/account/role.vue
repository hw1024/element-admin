<template>
  <div>
    <table-temp ref="tableTemp" :cfg="tableCfg">
      <span slot="extra">
        <el-button type="success" @click="createRole">create</el-button>
        <el-button type="warning" @click="deleteRole">delete</el-button>
        <el-button type="primary" @click="$refs['tableTemp'].query()">refresh</el-button>
      </span>
    </table-temp>

    <dialog-temp ref="modelTemp" :cfg="modelForForm">
      <form-temp slot="content" :cfg="formCfg" ref="formTemp"></form-temp>
      <p slot="footer">
        <el-button type="text" @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="saveEdit">确定</el-button>
      </p>
    </dialog-temp>

    <dialog-temp ref="modelForTree" :cfg="modelForTree">
      <tree ref="tree" slot="content" :permission="handleRole.permission"></tree>
      <p slot="footer">
        <el-button type="text" @click="$refs['modelForTree'].close()">取消</el-button>
        <el-button type="primary" @click="savePermisstion">确定</el-button>
      </p>
    </dialog-temp>
  </div>
</template>

<script>
export default {
  name: 'role',
  data() {
    return {
      modelForForm: {
        title: '创建角色',
        isAdd: true,
        width: '520px'
      },
      modelForTree: {
        title: '权限分配'
      },
      tableCfg: {
        border: true,
        title: '角色管理',
        icon: 'fa-cube',
        tableQueryMethods: 'queryRole',
        columns: [
          {val: '#', type: 'selection'},
          // {key: 'id', val: 'id', width: 50},
          {key: 'roleName', val: '角色名', align: 'left'},
          {key: 'counts', val: '角色数'},
          {key: 'note', val: '备注', align: 'left'}
        ],
        operates: {
          list: [
            {
              label: '修改',
              type: 'text',
              method: row => {
                this.modelForForm.isAdd = false;
                this.modelForForm.title = '修改角色';
                this.$refs['modelTemp'].open();
                if (this.$refs['formTemp']) this.$refs['formTemp'].reset();
                this.formCfg.data = this.$util.clone(row);
              }
            },
            {
              label: '分配权限',
              type: 'text',
              method: row => {
                this.handleRole = this.$util.clone(row);
                this.handleRole.permission = JSON.parse(row.permission);
                this.$refs.modelForTree.open();
              }
            }
          ]
        }
      },
      formCfg: {
        data: {
          roleName: '',
          note: ''
        },
        el: [
          {prop: 'roleName', label: '角色名', type: 'input', disabled: false},
          {prop: 'note', label: '角色描述', type: 'textarea', disabled: false}
        ],
        rules: {
          roleName: {required: true},
          note: {max: 30}
        }
      },
      handleRole: {}
    };
  },
  methods: {
    createRole() {
      this.$util.formCache.get('role').then(res => {
        this.modelForForm.isAdd = true;
        this.modelForForm.title = '创建角色';
        if (this.$refs['formTemp']) this.$refs['formTemp'].reset();
        this.formCfg.data = res || {roleName: '', note: ''};
        this.$refs['modelTemp'].open();
      });
    },
    cancelEdit() {
      const msg = this.$refs['formTemp'].config.data;
      this.$util.formCache.save('将要离开编辑，是否保存内容？', 'role', msg);
      this.$refs['modelTemp'].close();
    },
    saveEdit() {
      this.$refs['formTemp'].validate().then(result => {
        if (result) {
          const params = this.$refs['formTemp'].config.data;
          const path   = this.modelForForm.isAdd ? 'createRole' : 'uploadRole';
          this.request(path, params).then(res => {
            this.$message({message: res.msg, type: 'success'});
            this.$refs['modelTemp'].close();
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
    },
    savePermisstion() {
      const permission = this.$refs['tree'].getSelected();
      const params = {...this.handleRole, ...{permission: JSON.stringify(permission)}};
      this.request('uploadRole', params).then(res => {
        this.$message({message: res.msg, type: 'success'});
        this.$refs.modelForTree.close();
        this.$refs.tableTemp.query();
      }).catch(err => {
        this.$message({message: res.msg, type: 'error'});
      })
    }
  },
  components: {
    tree: () => import('./temp/permissionTree.vue')
  },
  mounted() {
    this.request("queryPermission").then(res => {
      this.allPerm = this.$util.handlePermission(res.data.list);
    });
  }
};
</script>
