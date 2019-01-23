<template>
  <div>
    <table-temp ref="tableTemp" :cfg="tableCfg">
      <span slot="extra">
        <el-tooltip class="item" effect="light" content="权限图标请参考 http://www.fontawesome.com.cn/icons-ui" placement="bottom">
          <i class="fa fa-question-circle-o"></i>
        </el-tooltip>
        <el-button type="success" @click="createRole">create</el-button>
        <el-button type="warning" @click="deleteRole">delete</el-button>
        <el-button type="primary" @click="$refs['tableTemp'].query()">refresh</el-button>
      </span>

      <div slot="filter">
        <template v-for="(item, idx) in filters">
          <section :key="idx">
            <form-item-temp :item="item" :formData="tableCfg.params" @upload="uploadTableFilter"></form-item-temp>
          </section>
        </template>
        <el-button type="primary" @click="$refs['tableTemp'].search()">搜索</el-button>
      </div>
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
  name: 'permission',
  data() {
    return {
      dialog: {
        title: '创建权限',
        isAdd: true,
        width: '520px'
      },
      filters: [
        {prop: 'id', label: '权限ID / 父级权限ID', type: 'input', tooltip: 'top-start'}
      ],
      tableCfg: {
        border: true,
        title: '权限管理',
        icon: 'fa-cube',
        params: {},
        tableQueryMethods: 'queryPermission',
        columns: [
          {val: '#', type: 'selection'},
          {key: 'id', val: '权限ID', width: 60},
          {key: 'name', val: '权限名'},
          {key: 'title', val: '权限标题'},
          {key: 'parentId', val: '父级权限ID'},
          {key: 'icon', val: '权限图标'},
          {key: 'path', val: '权限路由', render: (h, data) => {
            return h('span', {class: 'line-clamp-1'}, data.row.path);
          }},
          {key: 'sort', val: '权限排序', sort: true},
          {key: 'type', val: '是否页面导航', width: 60, render(h, data) {
            return h('span', {style: {color: `#${!data.row.type ? '67c23a' : 'f56c6c'}`, fontWeight: 600}}, !data.row.type ? '√' : '×');
          }},
          {key: 'note', val: '备注'}
        ],
        operates: {
          list: [{
            label: '修改',
            type: 'text',
            method: a => {
              this.dialog.isAdd = false;
              this.dialog.title = '修改权限';
              this.$refs['dialogTemp'].open();
              if (this.$refs['formTemp']) this.$refs['formTemp'].reset();
              this.formCfg.data = this.$util.clone(a);
              console.log(this.formCfg.data);
            }
          }]
        },
        sortChangeCallback(msg) {
          console.log(msg);
        }
      },
      formCfg: {
        data: {},
        width: '120px',
        el: [
          {prop: 'name', label: '权限名', type: 'input'},
          {prop: 'title', label: '权限标题', type: 'input'},
          {prop: 'type', label: '是否页面导航', type: 'select', child: [
            {key: 0, val: '√'},
            {key: 1, val: 'x'}
          ]},
          {prop: 'path', label: '权限路由', type: 'input'},
          {prop: 'parentId', label: '父级权限ID', type: 'input'},
          {prop: 'icon', label: '权限图标', type: 'input'},
          {prop: 'note', label: '备注', type: 'textarea'}
        ],
        rules: {
          name: {required: true, max: 5},
          type: {required: true, pattern: /^[0|1]$/},
          icon: {max: 30},
          path: {validator(rule, val, cb, source) {
            if (source.type === 0 && !val) cb(new Error('type为0时，path必填'));
            cb();
          }},
          parentId: {required: true}
        }
      }
    };
  },
  methods: {
    uploadTableFilter(msg) { this.tableCfg.params = msg; },
    createRole() {
      this.$util.formCache.get('role').then(res => {
        this.dialog.isAdd = true;
        this.dialog.title = '创建权限';
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
          const path   = this.dialog.isAdd ? 'createPermission' : 'uploadPermission';
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
          this.request('deletePermission', {ids: ids}).then(res => {
            this.$message({message: res.msg, type: 'success'});
            this.$refs['tableTemp'].query();
          });
        });
      }
    }
  }
};
</script>
