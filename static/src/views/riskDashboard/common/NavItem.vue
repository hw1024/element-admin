<template>
  <div class="dashboard-head">
    <ul class="dashboard-nav" id="dashboard-nav">
      <li><router-link :to="{path:'/riskDashboard/index', query: {id: id, name: name, dataLevel:dataLevel}}">{{ dataLevel == '1' ? name : name + '本部' }}</router-link></li>
      <template v-if="dataLevel == '1'">
        <li><router-link :to="{path:'/riskDashboard/dimension', query: {id: id, name: name, dataLevel:dataLevel,dimension:'risk'}}">风险维度</router-link></li>
        <li><router-link :to="{path:'/riskDashboard/subsidiary', query: {id: id, name: name, dataLevel:dataLevel}}">子公司维度</router-link></li>
      </template>
      <template v-else>
        <li><router-link :to="{path:'/riskDashboard/dimension', query: {id: id, name: name, dataLevel:dataLevel,dimension:'business'}}">业务维度</router-link></li>
        <li><router-link :to="{path:'/riskDashboard/dimension', query: {id: id, name: name, dataLevel:dataLevel,dimension:'risk'}}">风险维度</router-link></li>
      </template>
    </ul>
    <div class="input-group-date">
      <el-date-picker
        v-model="datetime"
        type="datetime"
        @change="getTime"
        value-format="yyyy-MM-dd hh:mm:ss"
        placeholder="选择日期时间"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    'data-level': {
      required: true
    },
    'name': {
       required: true
    },
    'id': {
      required: true
    }
  },
  data() {
    return {
      datetime: ""
    };
  },
  methods: {
    getTime(value){
      let that = this;
      that.$emit('getTimeChangeEvent', {time: value});
    },
    initTime() {
      let that = this;
      that.datetime = "";
    }
  },
  watch: {
    '$route':'initTime',
  }
};
</script>

<style scoped lang="scss"></style>
