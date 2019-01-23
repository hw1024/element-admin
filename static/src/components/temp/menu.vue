<template>
  <div>
    <el-menu class="el-menu-vertical" :collapse="isCollapse" router :default-active="$route.path" :unique-opened="true">
      <template v-for="(item, idx) in menuList">
        <el-submenu v-if="item.children" :index="item.path" :key="idx">
          <template slot="title">
            <i :class="`fa ${item.icon}`"></i>
            <span slot="title">{{item.title ||item.name}}</span>
          </template>
          <template v-for="(child, childIdx) in item.children">
            <!-- <el-submenu v-if="child.children" :index="child.path" :key="childIdx">
              <template slot="title">
                <i :class="`fa ${child.icon}`"></i>
                <span slot="title">{{child.title ||child.name}}</span>
              </template>
              <template v-for="(grandson, grandsonIdx) in child.children">
                <el-menu-item :index="grandson.path" :key="grandsonIdx">
                  <i :class="`fa ${grandson.icon}`"></i>
                  <span slot="title">{{grandson.title ||grandson.name}}</span>
                </el-menu-item>
              </template>
            </el-submenu> -->

            <!-- <el-menu-item v-else :index="String(idx + 1)" :key="childIdx"> -->
            <el-menu-item :index="child.path" :key="childIdx">
              <i :class="`fa ${child.icon}`"></i>
              <span slot="title">{{child.title ||child.name}}</span>
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item v-else :index="item.path" :key="idx">
          <i :class="`fa ${item.icon}`"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuList: []
    };
  },
  computed: {
    accountpermission() { return this.$store.getters.permission; }
  },
  created() {
    const lib = this.$util.clone(this.accountpermission);
    if (lib.length) this.menuList = this.$util.handlePermission(lib, 'sort');
  }
};
</script>

<style lang="scss" scope>
.fa {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
  box-sizing: border-box;
}
</style>
