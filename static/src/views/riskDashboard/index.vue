<template>
  <section class="dashboard-container">
    <NavItem :id="id" :name="name" :data-level="dataLevel" @getTimeChangeEvent = "getTimeChange"></NavItem>
    <div class="dashboard-region dashboard-region-cur">
      <div class="region-header">
        <h3 class="region-title">
          <i class="fa fa-delicious"></i>
          <span>{{ name }}当期风险概述</span>
        </h3>
      </div>
      <div class="region-body">
        <div class="region-body-depict">{{ depict }}</div>
      </div>
    </div>
    <div class="dashboard-region">
      <div class="region-header">
        <h3 class="region-title">
          <i class="fa fa-fire"></i>
          <span>{{ name }}风险偏好指标</span>
        </h3>
      </div>
      <div class="region-body">
        <div class="region-row clearfix">
          <div class="item" v-for="(item, index) in preferData" :key="index">
            <div class="item-title">{{ item.NAME }}</div>
              <div class="item-content more-link" v-for="(value, key) in item.LIST" :key="key" data-title="金控集团风险指标详情" data-url="riskDashboardDetail.html?id='+ data[i].LIST[j].ID +'&status='+ data[i].LIST[j].STATUS +'">
              <div>{{ value.TIME }}</div>
              <div class="item-img"><i class="fa fa-flag" :style="{color: value.TYPE}"></i></div>
              <div class="item-intro" :title="value.TITLE">{{ value.TITLE }}</div>
              <div>{{ value.PERCENT }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="dashboard-region">
          <div class="region-header">
            <h3 class="region-title">
              <i class="fa fa-align-center"></i>
              <span>{{ name }}关键风险指标状况</span>
            </h3>
            <a class="region-link" href="javascript:void(0)" onclick="Common.CreateModalBg('关键风险指标状况.html', '金控集团关键风险指标具体状况', 'codiepie')">更多 - More ...</a>
          </div>
          <div class="region-body">
            <div class="region-row clearfix">
              <div class="item" v-for="(item, index) in cruxData" :key="index">
                <div class="item-content more-link" data-title="金控集团风险指标详情" data-url="riskDashboardDetail.html?id='+ data[i].ID +'&status='+ data[i].STATUS +'">
                  <div>{{ item.TIME }}</div>
                  <div class="item-img"><i class="fa fa-flag" :style="{color: item.TYPE}"></i></div>
                  <div class="item-intro" :title="item.TITLE">{{ item.TITLE }}</div>
                  <div>{{ item.PERCENT }}</div>
                </div>
              </div>
              <!-- <el-row :gutter="0">
                <el-col :md="{span: '4-8'}" :lg="{span: '4'}" :xl="{span: '4'}" v-for="(item, index) in cruxData" :key="index">
                  <div class="item-content more-link" data-title="金控集团风险指标详情" data-url="riskDashboardDetail.html?id='+ data[i].ID +'&status='+ data[i].STATUS +'">
                    <div>{{ item.TIME }}</div>
                    <div class="item-img"><i class="fa fa-flag" :style="{color: item.TYPE}"></i></div>
                    <div class="item-intro" :title="item.TITLE">{{ item.TITLE }}</div>
                    <div>{{ item.PERCENT }}</div>
                  </div>
                </el-col>
              </el-row> -->
            </div>
          </div>
        </div>
     </el-col>
    </el-row>
    <div class="dashboard-region">
      <div class="region-header">
        <h3 class="region-title">
            <i class="fa fa-bomb"></i>
          <span>{{ name }}本期超限指标状况</span>
        </h3>
      </div>
      <div class="region-body">
        <el-table :data="preferTableData" class="table" ref="multipleTable" border highlight-current-row style="width: 100%;">
          <el-table-column prop="name" label="指标名称" sortable width="110">
            <template slot-scope="scope">
              <span v-html='scope.row.name'></span>
            </template>
          </el-table-column>
          <el-table-column prop="fx_level1" label="风险分类（一级）" sortable width="160">
            <template slot-scope="scope">
                <span v-html='scope.row.fx_level1'></span>
            </template>
          </el-table-column>
          <el-table-column prop="fx_level2" label="风险分类（二级）" sortable width="160">
            <template slot-scope="scope">
              <span v-html='scope.row.fx_level2'></span>
            </template>
          </el-table-column>
          <el-table-column prop="fx_level3" label="风险分类（三级）" sortable width="160">
            <template slot-scope="scope">
              <span v-html='scope.row.fx_level3'></span>
            </template>
          </el-table-column>
          <el-table-column prop="rate" label="频率" sortable>
          </el-table-column>
          <el-table-column prop="unit" label="限额值" sortable>
          </el-table-column>
          <el-table-column prop="warning_value" label="预警值" sortable>
          </el-table-column>
          <el-table-column prop="current_value" label="当期值" sortable>
          </el-table-column>
          <el-table-column prop="prior_value" label="上期值" sortable>
          </el-table-column>
          <el-table-column prop="out_status" label="超限状态" sortable>
          </el-table-column>
          <el-table-column prop="cause_analy" label="原因分析" sortable>
          </el-table-column>
          <el-table-column prop="action_plan" label="行动方案" sortable>
          </el-table-column>
            <el-table-column prop="report_matter" label="呈报部门" sortable>
          </el-table-column>
          <el-table-column prop="report_man" label="呈报人" sortable>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dashboard-region">
      <div class="region-header">
        <h3 class="region-title">
          <i class="fa fa-flash"></i>
          <span>{{ name }}本期预警指标状况</span>
        </h3>
      </div>
      <div class="region-body">
        <el-table :data="cruxTableData" class="table" ref="multipleTable" border >
          <el-table-column prop="name" label="指标名称" sortable width="110">
            <template slot-scope="scope">
              <span v-html='scope.row.name'></span>
            </template>
          </el-table-column>
          <el-table-column prop="fx_level1" label="风险分类（一级）" sortable width="160">
            <template slot-scope="scope">
                <span v-html='scope.row.fx_level1'></span>
            </template>
          </el-table-column>
          <el-table-column prop="fx_level2" label="风险分类（二级）" sortable width="160">
            <template slot-scope="scope">
              <span v-html='scope.row.fx_level2'></span>
            </template>
          </el-table-column>
          <el-table-column prop="fx_level3" label="风险分类（三级）" sortable width="160">
            <template slot-scope="scope">
              <span v-html='scope.row.fx_level3'></span>
            </template>
          </el-table-column>
          <el-table-column prop="rate" label="频率" sortable>
          </el-table-column>
          <el-table-column prop="unit" label="限额值" sortable>
          </el-table-column>
          <el-table-column prop="warning_value" label="预警值" sortable>
          </el-table-column>
          <el-table-column prop="current_value" label="当期值" sortable>
          </el-table-column>
          <el-table-column prop="prior_value" label="上期值" sortable>
          </el-table-column>
          <el-table-column prop="out_status" label="超限状态" sortable>
          </el-table-column>
          <el-table-column prop="cause_analy" label="原因分析" sortable>
          </el-table-column>
          <el-table-column prop="action_plan" label="行动方案" sortable>
          </el-table-column>
            <el-table-column prop="report_matter" label="呈报部门" sortable>
          </el-table-column>
          <el-table-column prop="report_man" label="呈报人" sortable>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </section>
</template>

<script>

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
      depict: "",
      preferData: [],
      cruxData:[],
      preferTableData: [],
      cruxTableData: []
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
      that.getData()
    },
    getData() {
      let that = this;
      let params = {id: that.id, time: that.datetime}
      that.depict = "本评估期内华金证券风险状况良好，市场风险及信用风险水平较上期有所上升，主要体现在资本市场的剧烈波动，股票市场出现小幅下行，信用违约高发 ，受行业状况影响，……",
      that.preferData = [
        {
          "NAME": "盈利性维度",
          "LIST": [
            {
              "ID":"4455",
              "TIME": "2018-02月",
              "TYPE": "#FF0000",
              "STATUS": "1",
              "TITLE": "净资产收益率",
              "PERCENT": "4次"
            }
          ]
        },
        {
          "NAME": "所有者权益",
          "LIST": [
            {
            "ID":"4457",
            "TIME": "2018-02月",
            "TYPE": "#FF9900",
            "STATUS": "2",
            "TITLE": "净资产收益率",
            "PERCENT": "4次"
            }
          ]
        },
        {
          "NAME": "成本性维度",
          "LIST": [
            {
              "ID":"4459",
              "TIME":"2018-02月",
              "TYPE": "#00CC00",
              "STATUS": "3",
              "TITLE": "净资产收益率",
              "PERCENT": "4次"
            }
          ]
        },
        {
          "NAME": "操风合规维度",
          "LIST": [
            {
              "ID":"4459",
              "TIME": "2018-02月",
              "TYPE": "#FF0000",
              "STATUS": "4",
              "TITLE": "净资产收益率",
              "PERCENT": "4次"
            }
          ]
        },
        {
          "NAME": "流动性维度",
          "LIST": [
            {
              "ID":"4453",
              "TIME":"2018-02月",
              "TYPE": "#00CC00",
              "STATUS": "1",
              "TITLE": "净资产收益率",
              "PERCENT": "42次"
            }
          ]
        }
      ],
      that.cruxData=[
        {
          "NAME": "盈利性维度",
          "LIST": [
            {
              "ID":"4455",
              "TIME": "2018-02月",
              "TYPE": "#FF0000",
              "STATUS": "1",
              "TITLE": "净资产收益率",
              "PERCENT": "4次"
            }
          ]
        },
        {
          "NAME": "所有者权益",
          "LIST": [
            {
            "ID":"4457",
            "TIME": "2018-02月",
            "TYPE": "#FF9900",
            "STATUS": "2",
            "TITLE": "净资产收益率",
            "PERCENT": "4次"
            }
          ]
        },
        {
          "NAME": "成本性维度",
          "LIST": [
            {
              "ID":"4459",
              "TIME":"2018-02月",
              "TYPE": "#00CC00",
              "STATUS": "3",
              "TITLE": "净资产收益率",
              "PERCENT": "4次"
            }
          ]
        },
        {
          "NAME": "操风合规维度",
          "LIST": [
            {
              "ID":"4459",
              "TIME": "2018-02月",
              "TYPE": "#FF0000",
              "STATUS": "4",
              "TITLE": "净资产收益率",
              "PERCENT": "4次"
            }
          ]
        },
        {
          "NAME": "流动性维度",
          "LIST": [
            {
              "ID":"4453",
              "TIME":"2018-02月",
              "TYPE": "#00CC00",
              "STATUS": "1",
              "TITLE": "净资产收益率",
              "PERCENT": "42次"
            }
          ]
        }
      ],
      that.preferTableData= [
        {
            "id": 0,
            "name": "<a class='more-link' href='javascript: void(0);' data-title='金控集团风险指标详情' data-url='指标详情页示例1.html?id=2'>净资产负债率</a>",
            "fx_level1": "<a class='more-link' href='javascript: void(0);' data-title='金控集团信用风险关键风险指标具体状况' data-url='类别指标清单.html?id=1'>财务风险</a>",
            "fx_level2": "财务风险",
            "fx_level3": "财务风险",
            "rate": "日",
            "unit": "%",
            "limit_value": "10%",
            "warning_value": "12%",
            "current_value": "9%",
            "prior_value": "20%",
            "out_status": "新增超限",
            "cause_analy": "......",
            "action_plan": "......",
            "report_matter": "风险管理部",
            "report_man": "程欣"
        },
        {
            "id": 1,
            "name": "<a class='more-link' href='javascript: void(0);' data-title='金控集团风险指标详情' data-url='指标详情页示例2.html?id=2'>净资产负债率</a>",
            "fx_level1": "<a class='more-link' href='javascript: void(0);' data-title='金控集团信用风险关键风险指标具体状况' data-url='类别指标清单.html?id=4'>信用风险</a>",
            "fx_level2": "集中度风险",
            "fx_level3": "评级迁移风险",
            "rate": "日",
            "unit": "%",
            "limit_value": "60%",
            "warning_value": "50%",
            "current_value": "63%",
            "prior_value": "62%",
            "out_status": "持续超限",
            "cause_analy": "......",
            "action_plan": "......",
            "report_matter": "风险管理部",
            "report_man": "程欣"
        }
    ],
      that.cruxTableData= [
        {
            "id": 0,
            "name": "<a class='more-link' href='javascript: void(0);' data-title='金控集团风险指标详情' data-url='指标详情页示例1.html?id=2'>净资产负债率</a>",
            "fx_level1": "<a class='more-link' href='javascript: void(0);' data-title='金控集团信用风险关键风险指标具体状况' data-url='类别指标清单.html?id=1'>财务风险</a>",
            "fx_level2": "财务风险",
            "fx_level3": "财务风险",
            "rate": "日",
            "unit": "%",
            "limit_value": "10%",
            "warning_value": "12%",
            "current_value": "9%",
            "prior_value": "20%",
            "out_status": "新增超限",
            "cause_analy": "......",
            "action_plan": "......",
            "report_matter": "风险管理部",
            "report_man": "程欣"
        },
        {
            "id": 1,
            "name": "<a class='more-link' href='javascript: void(0);' data-title='金控集团风险指标详情' data-url='指标详情页示例2.html?id=2'>净资产负债率</a>",
            "fx_level1": "<a class='more-link' href='javascript: void(0);' data-title='金控集团信用风险关键风险指标具体状况' data-url='类别指标清单.html?id=4'>信用风险</a>",
            "fx_level2": "集中度风险",
            "fx_level3": "评级迁移风险",
            "rate": "日",
            "unit": "%",
            "limit_value": "60%",
            "warning_value": "50%",
            "current_value": "63%",
            "prior_value": "62%",
            "out_status": "持续超限",
            "cause_analy": "......",
            "action_plan": "......",
            "report_matter": "风险管理部",
            "report_man": "程欣"
        }
    ]
    }
  }
};
</script>

<style scoped lang="scss"></style>
