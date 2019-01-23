<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <!-- <img src="https://picsum.photos/800/200/?random" alt="" width="100%"> -->
      <w-image class="banner" url="https://picsum.photos/800/200/?random" high="150"></w-image>

      <div class="info-view">
        <w-image class="avatar" :url="account.avatar" wid="50" high="50" ></w-image>
        <span>{{account.nickname}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      account: {}
    };
  },
  methods: {
    getInfo() {
      // this.request('getAccountInfo').then(res => {
      //   console.log(res);
      // });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped>
.banner{border-radius:5px; filter:blur(1px) opacity(.9)}
.info-view{
  padding-top:20px;
  .avatar{border-radius:50%}
}
</style>
