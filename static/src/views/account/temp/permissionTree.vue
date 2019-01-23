<template>
  <div>
    <el-tree
      ref="tree"
      :data="allPerm"
      show-checkbox
      :check-strictly="true"
      node-key="id"
      :props="defaultProps"
    ></el-tree>
  </div>
</template>
<script>
export default {
  props: {
    permission: Array
  },
  data() {
    return {
      allPerm: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    };
  },
  methods: {
    queryAllPerm() {
      this.request('queryPermission').then(res => {
        this.allPerm = this.$util.handlePermission(res.data.list);
        this.$refs.tree.setCheckedKeys(this.permission || [], true);
      });
    },
    getSelected() {
      return this.$refs.tree.getCheckedKeys();
    }
  },
  created() {
    this.queryAllPerm();
  },
  watch: {
    permission(e) {
      e = e || [3, 5];
      this.$refs.tree.setCheckedKeys(e, true);
    }
  }
};
</script>

<style lang="scss">
.el-tree-node__content>.el-checkbox{margin-bottom:0}
</style>
