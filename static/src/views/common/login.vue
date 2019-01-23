<template>
  <div>
    <div class="view"></div>
    <el-card class="form-view">
      <p slot="header">欢迎登录...
        <el-button type="text" style="float:right" @click="type = !type">{{type ? '去注册' : '去登录'}}</el-button>
      </p>
      <el-input size="medium" placeholder="请输入手机号码..." prefix-icon="el-icon-phone-outline" v-model="user.mobile"></el-input>
      <el-input size="medium" placeholder="请输入密码..." type="password" prefix-icon="el-icon-warning" v-model="user.password"></el-input>
      <el-button style="margin-top:10px" type="primary" size="small" plain @click="handleClick" class="btn">{{type ? '登 录' : '注 册'}}</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        // var a = document.getElementById();
        const _el = el.querySelector('input');
        _el.focus();
      }
    }
  },
  data() {
    return {
      user: {
        mobile: '',
        password: ''
      },
      type: true,
      size_1: 'small',
      size_2: 'small'
    };
  },
  methods: {
    handleClick() {
      this.type ? this.login() : this.reg();
    },
    login() {
      if (!!this.user.mobile && !!this.user.password) {
        this.request('login', this.user).then(res => {
          this.$message({message: res.msg, type: 'success'});
          this.$store.commit('saveAccountInfo', res.data);
          this.$router.push('/');
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }).catch(err => console.log(err));
      } else this.$message({message: '请完善表单后重试', type: 'warning'});
    },
    reg() {
      if (!!this.user.mobile && !!this.user.password) {
        this.request('register', this.user).then(res => {
          this.$message({message: res.msg, type: 'success'});
          this.$store.commit('saveAccount', res.data).then(() => {
            this.$router.push('/');
            setTimeout(() => {
              window.location.reload();
            }, 10);
          });
        }).catch(err => console.log(err));
      } else this.$message({message: '请完善表单后重试', type: 'warning'});
    }
  }
};
</script>

<style lang="scss" scoped>
.view{background:url('https://picsum.photos/1920/1080/') center center; background-size:cover; height:100vh; filter:blur(2px) opacity(.9)}
.form-view{
  position:absolute; right:10%; top:30%; width:320px; padding:15px; background:$bg-3-5; transition:.5s;
  &:hover{background:$bg-1}
  box-shadow:0 0 2px 1px $bg-1;
  .el-input{margin:3px 0}
  .btn{display:block; margin:5px auto 0}
}
</style>
