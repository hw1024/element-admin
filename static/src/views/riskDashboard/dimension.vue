<template>
  <section class="dashboard-container">
    <NavItem :id="id" :name="name" :data-level="dataLevel" @getTimeChangeEvent = "getTimeChange"></NavItem>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="dashboard-region dashboard-region-cur">
          <div class="region-header">
            <h3 class="region-title"><i class="fa fa-delicious"></i><span>{{ name }}关键风险指标整体状况</span></h3>
          </div>
          <div class="region-body">
            <div class="region-row clearfix">
              <div class="item" v-for="(item, index) in wholeData" :key="index">
                <div class="dimension-pies dimension-pies-big" :id="'risk-whole'+index"></div>
                <div v-if="index == '0'" class="dimension-link dimension-nolink">{{ item.title }}</div>
                <div v-else class="dimension-link dimension-default-link more-link"><a href="javascript:void(0);">{{ item.title }}</a></div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="dashboard-region">
            <div class="region-header">
              <h3 class="region-title"><i class="fa fa-align-center"></i>{{ name }}各业务线条关键风险指标</h3>
            </div>
            <div class="region-body">
              <div class="region-row clearfix">
                <el-row :gutter="24" class="outer-item" v-for="(item, index) in circuitData" :key="index">
                <el-col :md="{span: '7'}" :lg="{span: '6'}" :xl="{span: '4'}" class="outer-item-left">
                  <div class="item">
                    <div class="dimension-link dimension-link-active more-link" :data-title="name+'信用风险关键风险指标具体状况'" ><a href="javascript:void(0);">{{ item.title }}</a></div>
                    <div class="dimension-pies dimension-pies-big" :id="'risk-circuiti'+index"></div>
                  </div>
                </el-col>
                <el-col :md="{span: '17'}" :lg="{span: '18'}" :xl="{span: '20'}" class="outer-item-right">
                  <div class="item" v-for="(value, key) in item.list" :key="key" >
                    <div class="item-content more-link" data-title="风险指标详情">
                      <div>{{ value.TIME }}</div>
                      <div class="item-img"><i class="fa fa-flag" :style="{color: value.TYPE}"></i></div>
                      <div class="item-intro" :title="value.TITLE">{{ value.TITLE }}</div>
                      <div>{{ value.PERCENT }}</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="dimension-more more-link" data-title="信用风险关键风险指标具体状况">更多 - More ...</div>
                  </div>
                </el-col>
              </el-row>
              </div>
            </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { DrawPieChart } from '../../utils/common';
import NavItem from './common/NavItem';

export default {
  components: {
    NavItem
  },
  data() {
    return {
      datetime: "",
      id: "",
      name: "",
      dataLevel: "",
      dimension: "",
      wholeData: [],
      circuitData: []
    };
  },
  created() {
    let that = this;
    that.datetime = '';
    that.getQuery()
  },
  mounted(){
    let that = this;
  },
  methods: {
    getTimeChange(opt){
      let that = this;
      that.datetime = opt.time;
      that.getData()
    },
    getQuery() {
      let that = this;
      that.datetime = '';
      that.id = that.$route.query.id;
      that.name = that.$route.query.name;
      that.dataLevel = that.$route.query.dataLevel;
      that.dimension = that.$route.query.dimension;
      that.getData();
    },
    getData() {
      let that = this;
      let params = {id: that.id, time: that.datetime};
      that.getWholeData(params);
      that.getCircuitData(params);
    },
    getWholeData(params) {
      let that = this
      that.wholeData = [
        {
          "id": "1001",
          "title": "集团整体",
          "status": "4",
          "pies": [
            {"NAME":"指标1","TOTAL_COUNT":5,"ID":"100111","COLOR": "#ff0000"},
            {"NAME":"指标2","TOTAL_COUNT":3,"ID":"100112","COLOR": "#FFC000"},
            {"NAME":"指标3","TOTAL_COUNT":44,"ID":"100113","COLOR": "#00B050"}
          ]
        },
        {
          "id": "1002",
          "title": "操作风险",
          "status": "4",
          "pies" : [
            {"NAME":"指标1","TOTAL_COUNT":4,"ID":"100211","COLOR": "#ff0000"},
            {"NAME":"指标2","TOTAL_COUNT":1,"ID":"100212","COLOR": "#FFC000"},
            {"NAME":"指标3","TOTAL_COUNT":13,"ID":"100213","COLOR": "#00B050"}
          ]
        },
        {
          "id": "1003",
          "title": "战略风险",
          "status": "4",
          "pies" : [
            {"NAME":"指标1","TOTAL_COUNT":3,"ID":"100311","COLOR": "#ff0000"},
            {"NAME":"指标2","TOTAL_COUNT":1,"ID":"100312","COLOR": "#FFC000"},
            {"NAME":"指标3","TOTAL_COUNT":21,"ID":"100313","COLOR": "#00B050"}
          ]
        },
        {
          "id": "1004",
          "title": "财务风险",
          "status": "4",
          "pies" : [
            {"NAME":"指标1","TOTAL_COUNT":3,"ID":"100411","COLOR": "#ff0000"},
            {"NAME":"指标2","TOTAL_COUNT":1,"ID":"100412","COLOR": "#FFC000"},
            {"NAME":"指标3","TOTAL_COUNT":18,"ID":"100413","COLOR": "#00B050"}
          ]
        },
        {
          "id": "1005",
          "title": "信息科技风险",
          "status": "4",
          "pies" : [
            {"NAME":"指标1","TOTAL_COUNT":2,"ID":"100511","COLOR": "#ff0000"},
            {"NAME":"指标2","TOTAL_COUNT":5,"ID":"100512","COLOR": "#FFC000"},
            {"NAME":"指标3","TOTAL_COUNT":14,"ID":"100512","COLOR": "#00B050"}
          ]
        }
      ];
      let wholePieData = [];
      let wholePieColor = [];
      that.wholeData.forEach((v, i) => {
        this.$nextTick(function () {
          let wholeChart = document.getElementById('risk-whole'+i);
          v.pies.forEach((d, k) => {
            wholePieData.push({value: d.TOTAL_COUNT,name: d.NAME})
            wholePieColor.push(d.COLOR)
          })
          DrawPieChart(echarts,wholeChart, wholePieColor, wholePieData, false)
          wholePieData = [];
          wholePieColor = [];
        })
      })
    },
    getCircuitData(params) {
      let that = this
      that.circuitData = [
        {
          "id": "1002",
          "title": "操作风险",
          "status": "4",
          "pies" : [
            {"NAME":"指标1","TOTAL_COUNT":4,"ID":"100211","COLOR": "#ff0000"},
            {"NAME":"指标2","TOTAL_COUNT":1,"ID":"100212","COLOR": "#FFC000"},
            {"NAME":"指标3","TOTAL_COUNT":13,"ID":"100213","COLOR": "#00B050"}
          ],
          "list": [
            {"STATUS": "4","TIME":"2018-02月","TYPE":"#FF0000","ID":"100221","TITLE": "子公司被监管机构净资产收益率", "PERCENT": "4次"},
            {"STATUS": "2","TIME":"2018-02月","TYPE":"#FF9900","ID":"100222","TITLE": "主体评级下调", "PERCENT": "2个"},
            {"STATUS": "3","TIME":"2018-02月","TYPE":"#FF9900","ID":"100223","TITLE": "资产回报率", "PERCENT": "42.11%"},
            {"STATUS": "3","TIME":"2018-02月","TYPE":"#00CC00","ID":"100224","TITLE": "所有者权益", "PERCENT": "42.11%"}
          ]
        },
        {
          "id": "1003",
          "title": "战略风险",
          "status": "4",
          "pies" : [
            {"NAME":"指标1","TOTAL_COUNT":3,"ID":"100311","COLOR": "#ff0000"},
            {"NAME":"指标2","TOTAL_COUNT":1,"ID":"100312","COLOR": "#FFC000"},
            {"NAME":"指标3","TOTAL_COUNT":21,"ID":"100313","COLOR": "#00B050"}
          ],
          "list": [
            {"STATUS": "1","TIME":"2018-02月","TYPE":"#FF0000","ID":"100321","TITLE": "成本收入比", "PERCENT": "4次"},
            {"STATUS": "1","TIME":"2018-02月","TYPE":"#FF9900","ID":"100322","TITLE": "净资产收益率", "PERCENT": "2个"},
            {"STATUS": "3","TIME":"2018-02月","TYPE":"#00CC00","ID":"100324","TITLE": "所有者权益", "PERCENT": "42.11%"}
          ]
        },
        {
          "id": "1004",
          "title": "财务风险",
          "status": "4",
          "pies" : [
            {"NAME":"指标1","TOTAL_COUNT":3,"ID":"100411","COLOR": "#ff0000"},
            {"NAME":"指标2","TOTAL_COUNT":1,"ID":"100412","COLOR": "#FFC000"},
            {"NAME":"指标3","TOTAL_COUNT":18,"ID":"100413","COLOR": "#00B050"}
          ],
          "list": [
            {"STATUS": "1","TIME":"2018-02月","TYPE":"#FF0000","ID":"100421","TITLE": "成本收入比", "PERCENT": "4次"},
            {"STATUS": "4","TIME":"2018-02月","TYPE":"#FF9900","ID":"100422","TITLE": "所有者权益", "PERCENT": "2个"},
            {"STATUS": "2","TIME":"2018-02月","TYPE":"#00CC00","ID":"100423","TITLE": "成本收入比", "PERCENT": "42.11%"},
            {"STATUS": "3","TIME":"2018-02月","TYPE":"#00CC00","ID":"100424","TITLE": "净资产收益率", "PERCENT": "42.11%"}
          ]
        },
        {
          "id": "1005",
          "title": "信息科技风险",
          "status": "4",
          "pies" : [
            {"NAME":"指标1","TOTAL_COUNT":2,"ID":"100511","COLOR": "#ff0000"},
            {"NAME":"指标2","TOTAL_COUNT":5,"ID":"100512","COLOR": "#FFC000"},
            {"NAME":"指标3","TOTAL_COUNT":14,"ID":"100512","COLOR": "#00B050"}
          ],
          "list": [
            {"STATUS": "1","TIME":"2018-02月","TYPE":"#FF9900","ID":"100521","TITLE": "未经授权活动次数", "PERCENT": "4次"},
            {"STATUS": "2","TIME":"2018-02月","TYPE":"#FF9900","ID":"100522","TITLE": "内部欺诈发生次数", "PERCENT": "2个"},
            {"STATUS": "3","TIME":"2018-02月","TYPE":"#00CC00","ID":"100523","TITLE": "未来三年现金流", "PERCENT": "42.88%"},
            {"STATUS": "4","TIME":"2018-02月","TYPE":"#00CC00","ID":"100524","TITLE": "未来三年现金流", "PERCENT": "42.11%"}
          ]
        }
      ]
      let circuitPieData = [];
      let circuitPieColor = [];
      that.circuitData.forEach((v, i) => {
        this.$nextTick(function () {
          let circuitChart = document.getElementById('risk-circuiti'+i);
          v.pies.forEach((d, k) => {
            circuitPieData.push({value: d.TOTAL_COUNT,name: d.NAME})
            circuitPieColor.push(d.COLOR)
          })
          DrawPieChart(echarts,circuitChart, circuitPieColor, circuitPieData, false)
          circuitPieData = [];
          circuitPieColor = [];
        })
      })
    }
  }
};
</script>

<style scoped lang="scss"></style>
