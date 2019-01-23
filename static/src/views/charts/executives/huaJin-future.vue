<template>
  <div class="wws-chart-view">
    <div class="row">
      <div class="col col-md-2" id="income"></div>
      <div class="col col-md-2" id="profit"></div>
      <!-- TODO: 待做 -->
      <div class="col col-md-2" id="profitMargin"></div>
      <div class="col col-md-4">
        <b class="title">盈利性维度</b>
        <div class="row">
          <div class="col col-md-6" id="profitDimension"></div>
          <div class="col col-md-6" id="riskAdjusted"></div>
        </div>
        <div class="row">
          <div class="col col-md-6" id="opreateDimension"></div>
          <div class="col col-md-6" id="coseDimension"></div>
        </div>
      </div>
      <div class="col col-md-2" >
        <div id="windCompliance"></div>
        <div id="flowDimension"></div>
      </div>
    </div>

    <div class="row">
      <div class="col col-md-12">
        <div id="profitAnalysis"></div>
        <img src="/img/table.png" alt style="width:70%;display:block;margin:0 auto">
      </div>
    </div>

    <div class="row">
      <div class="col col-md-12">
        <b class="title">各业务收入</b>
        <div class="row">
          <div class="col col-md-5" id="incomeAndProfit_pie"></div>
          <div class="col col-md-7" id="incomeAndProfit_bar"></div>
        </div>
        <img src="/img/table_1.png" alt style="width:70%;display:block;margin:0 auto">
      </div>
    </div>

    <div class="row wws-btn-group">
      <div class="col col-md-10" id="industryRanking"></div>
      <div class="col col-md-2 wws-btn-view">
        <div class="btn-group-vertical" role="group">
          <button type="button" class="btn btn-info">营业收入</button>
          <button type="button" class="btn btn-info">净利润</button>
          <button type="button" class="btn btn-info">ROE</button>
          <button type="button" class="btn btn-info">投行业务收入</button>
          <button type="button" class="btn btn-info">投行业务股票主承销金额</button>
          <button type="button" class="btn btn-info">经纪业务收入</button>
          <button type="button" class="btn btn-info">资管业务收入</button>
          <button type="button" class="btn btn-info">资管业务月均受托资金</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col col-md-7 wws-dom-view" id="brokerageBusiness"></div>
      <div class="col col-md-5 wws-dom-view" id="brokerageBusiness1"></div>
    </div>

    <div class="row">
      <div class="col col-md-7" id="assetManagementBusinessScale"></div>
      <div class="col col-md-5 wws-dom-view" id="cccc"></div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    var app = new window._App();
    /**@desc 注：此处为dom节点配置，包含图表配置、表格配置等*/
    var option = {
      income: {
        title: '收入',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '-108%'}
        ],
        data: [{value: 0.7}, {value: 0.3}],
        chartTitle: '800万',
        chartSubtext: '累计',
        chartType: 'pie_A',
        height: 230
      },
      profit: {
        title: '净利润',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '108%'}
        ],
        data: [{value: 0.7}, {value: 0.3}],
        chartTitle: '800万',
        chartSubtext: '累计',
        chartType: 'pie_A',
        height: 230
      },
      profitMargin: {
        title: '行业参考',
        data: {
          yAxis: ['收入', '净利润'],
          add: ['+10%', '-100%'],
          data: {
            '同期': [110, 360],
            '实际': [100, 350]
          }
        },
        chartType: 'bar_E',
        height: 264
      },
      profitDimension: {
        data: 100,
        chartTitle: '净资产收益率',
        chartSubtext: '2017年-01月',
        chartType: 'gauge',
        height: 110
      },
      riskAdjusted: {
        data: 100,
        chartTitle: '风险调整资本收益',
        chartSubtext: '2017年-01月',
        chartType: 'gauge',
        height: 110
      },
      opreateDimension: {
        title: '资本性维度',
        data: 60,
        chartTitle: '风险覆盖率',
        chartSubtext: '2017年-01月',
        chartType: 'gauge',
        height: 110
      },
      coseDimension: {
        title: '成本性维度',
        data: 30,
        chartTitle: '成本收入比',
        chartSubtext: '2017年',
        chartType: 'gauge',
        height: 110
      },
      windCompliance: {
        title: '操风合规维度',
        data: 30,
        chartTitle: '重大操作风险损失',
        chartSubtext: '2017年',
        chartType: 'gauge',
        height: 110
      },
      flowDimension: {
        title: '流动性维度',
        data: 10,
        chartTitle: '计划偏离度',
        chartSubtext: '2017年',
        chartType: 'gauge',
        height: 110
      },
      profitAnalysis: {
        title: '盈利分析',
        chartType: 'bar_A',
        data: {
          '收入': [70, 10, 20, 50, 100, 30, 20, 55, 66, 12, 20, 12],
          '净利润': [10, 80, 100, 0, 20, 300, 10, 0, 250, 120, 2, 10]
        },
        height: 300
      },
      incomeAndProfit_pie: {
        data: [
          {value: 3.7, name: '测试1'},
          {value: 7.3, name: '测试2'},
          {value: 6.3, name: '测试3'},
          {value: 10.3, name: '测试4'}
        ],
        chartType: 'pie_B',
        height: 300
      },
      incomeAndProfit_bar: {
        chartType: 'bar_line',
        data: {
          '当期': {unit: '位', type: 'bar', data: [100, 2, 0, 8, 50, 33, 50, 15, 80, 60, 22, 10]},
          '增长率': {unit: '%', type: 'line', data: [20, 50, 80, 0, 10, 30, 50, 60, 80, 50, 10, 11]}
        },
        height: 300
      },
      industryRanking: {
        title: '行业排名',
        chartType: 'line_C',
        height: 300,
        data: {
          yUnit: '位',
          data: {
            '目标排名': [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            '上年排名': [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            '实际排名': [60, 50, 51, 20, 38, 95, 51, 10, 20, 11, 10, 30]
          }
        }
      },
      brokerageBusiness: {
        title: '经纪业务',
        data: [
          {img: '/img/icon_1.png', content: [
            {'股基交易量': '5.62亿', '环比': '1.23%', '同比': '6.23%'},
            {'市场占有率': '12.56%', '环比': '1.23%', '同比': '6.23%'}
          ]},
          {img: '/img/icon_2.png', content: {'两融余额': '12.56%', '环比': '1.23%', '同比': '6.23%'}},
          {img: '/img/icon_3.png', content: {'客户数': '300,400', '新增': '3,200', '累计新增': '8,100'}}
        ],
        height: 260
      },
      brokerageBusiness1: {
        title: '投行业务项目规模',
        data: [
          {img: '/img/icon_4.png', content: [
            {'股权类已立项项目数': '50个'},
            {'已立项项目合同金额': '3.2亿'}
          ]},
          {img: '/img/icon_5.png', content: [
            {'债权类已立项项目数': '50个'},
            {'已立项项目合同金额': '3.2亿'}
          ]}
        ],
        height: 260
      },
      assetManagementBusinessScale: {
        title: '资管业务规模',
        chartType: 'pie_D',
        height: 260,
        data: {
          pie: {
            '集合紫管': 700,
            '定向资管': 260,
            '专项资管': 500
          },
          text: {
            '总资管规模': '1000亿',
            '当期新增': '3260万',
            '累计新增': '3260万'
          }
        }
      },
      cccc: {
        title: '自营业务',
        data: [
          {
            img: '/img/icon_6.png', content: [
              {'自有资金平均资金占用': '1.27亿'},
              {'自有资金投资收益率': '12.56%'}
            ]
          }
        ],
        height: 260
      }
    };

    for (var key in option) {
      var __ = option[key];
      app.render(__, key);
    };
  }
};
</script>
