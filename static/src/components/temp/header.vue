<template>
  <nav>
    <img class="logo" src="@/assets/images/logo.svg" alt="">
    <div class="unit-view">
      <i class="fa fa-volume-control-phone"></i>
      <span class="fa">CN</span>
      <el-dropdown trigger="click" @command="listenDropdownMenu" size="medium">
        <span class="el-dropdown-link">
          <img class="avatar" :src="avatar.avatar" alt=""> {{avatar.nickname || '管理员'}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="user">个人中心</el-dropdown-item>
          <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    avatar() {
      return this.$store.getters.accountInfo;
    }
  },
  methods: {
    listenDropdownMenu(cmd) {
      switch (cmd) {
        case 'user':
          this.$router.push('/user');
          break;
        case 'logOut':
          this.$store.commit('logOut');
          location.reload();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$icon_unit:28px;
nav{
  height:$nav-height; background:$bg-4; box-shadow:3px 0 2px 1px $bg-2; z-index:999;
  .logo{height:$nav-height * .7; position:relative; top:15%; left:10px;}
  .avatar{width:15px; position:relative;}
  .unit-view{float:right; padding-right:20px; height:100%;}
  .fa{
    font-size:14px; @include zen($icon_unit); line-height:$icon_unit; text-align:center;
    margin:0 5px; transition:$trans; cursor:pointer;
    border:1px solid; @include alignCenter; border-radius:50%;
    &:hover{@include alignCenter(relative, rotateZ(-30deg)); color:$active}
  }
  .el-dropdown{
    padding:5px 10px; margin-left:20px; color:$font-2;
    cursor:pointer; @include alignCenter;
    &:hover{color:$active}
  }
}
</style>
