<template>
  <div class="wws-chart-view">
    <div class="row">
      <div class="col col-md-2" id="income"></div>
      <div class="col col-md-2" id="profit"></div>
      <div class="col col-md-2" id="profitMargin"></div>
      <div class="col col-md-3">
        <div id="profitDimension"></div>
        <div id="opreateDimension"></div>
      </div>
      <div class="col col-md-3">
        <div id="coseDimension"></div>
        <div id="flowDimension"></div>
      </div>
    </div>

    <div class="row">
      <div class="col col-md-12">
        <div id="profitAnalysis"></div>
        <img src="/img/table.png" alt="" style="width:70%;display:block;margin:0 auto">
      </div>
    </div>

    <div class="row">
      <div class="col col-md-12">
        <p class="title">
          <b>收入/利润组成</b>
          <a href="javascript:;" class='link'>业务单元经营业绩一览</a>
        </p>
        <div class="col col-md-5" id="incomeAndProfit_pie"></div>
        <div class="col col-md-7" id="incomeAndProfit_bar"></div>
      </div>
    </div>

    <div class="row">
      <div class="col col-md-6" id="assetsLiabilities"></div>
      <div class="col col-md-6" id="returnOnAssets"></div>
    </div>

    <div class="row">
      <div class="col col-md-12">
        <b class="title">人力资源分布</b>
        <div class="col col-md-6" id="human_pie"></div>
        <div class="col col-md-6" id="human_bar"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    var app = new window._App();
    /** @desc 注：此处为dom节点配置，包含图表配置、表格配置等*/
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
        height: 220
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
        height: 220
      },
      profitMargin: {
        title: '成本费用利润率',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '-108%'}
        ],
        data: [0, 120, 110, 60, 30],
        chartTitle: '20%',
        chartType: 'line_A',
        height: 220
      },
      profitDimension: {
        title: '盈利性维度',
        data: 100,
        chartTitle: '净资产收益率',
        chartSubtext: '2017年-01月',
        chartType: 'gauge',
        height: 100
      },
      opreateDimension: {
        title: '操风合规维度',
        data: 60,
        chartTitle: '重大操作风险损失',
        chartSubtext: '2017年-01月',
        chartType: 'gauge',
        height: 100
      },
      coseDimension: {
        title: '成本性维度',
        data: 30,
        chartTitle: '成本收入比',
        chartSubtext: '2017年',
        chartType: 'gauge',
        height: 100
      },
      flowDimension: {
        title: '流动性维度',
        data: 10,
        chartTitle: '计划偏离度',
        chartSubtext: '2017年',
        chartType: 'gauge',
        height: 100
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
        chartType: 'bar_B',
        data: [
          [70, 10, 20, 50],
          [10, 80, 60, 30]
        ],
        height: 300
      },
      assetsLiabilities: {
        title: '资产负债',
        height: 300,
        data: [200, 100, 500],
        chartType: 'bar_C'
      },
      returnOnAssets: {
        title: '净资产收益率',
        height: 300,
        data: [
          [1, 20, 50, 100],
          [20, 3, 60, 200]
        ],
        chartType: 'line_B'
      },
      human_pie: {
        height: 300,
        chartType: 'pie_C',
        data: [
          {name: '员工数', value: 2000},
          {name: '核心员工数', value: 500}
        ]
      },
      human_bar: {
        height: 300,
        chartTitle: '员工年龄分布',
        data: [
          {value: 300, dime: '15%'},
          {value: 500, dime: '25%'},
          {value: 700, dime: '35%'},
          {value: 400, dime: '20%'},
          {value: 100, dime: '5%'}
        ],
        chartType: 'bar_D'
      }
    };

    for (var key in option) {
      var __ = option[key];
      app.render(__, key);
    };
  }
};
</script>
