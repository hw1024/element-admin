<template>
  <div class="wws-chart-view">
    <div class="row">
      <div class="col col-md-3" id="income"></div>
      <div class="col col-md-3" id="profit"></div>
      <div class="col col-md-2" id="profitMargin"></div>
      <div class="col col-md-2" id="profitMargin1"></div>
      <div class="col col-md-2" id="profitMargin2"></div>
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
        <div class="col col-md-5" id="incomeAndProfit_pie"></div>
        <div class="col col-md-7" id="incomeAndProfit_bar"></div>
        <img src="/img/table_1.png" alt style="width:70%;display:block;margin:0 auto">
      </div>
    </div>

    <div class="row">
      <div class="col col-md-6" id="brokerageTransactionSize"></div>
      <div class="col col-md-3" id="incomeAndProfit_line_0"></div>
      <div class="col col-md-3" id="incomeAndProfit_line_1"></div>
    </div>

    <div class="row">
      <div class="col col-md-6" id="AssetsAndLiabilities"></div>
      <div class="col col-md-6" id="AssetAnalysis"></div>
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
        title: '成本费用',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '当期排名', val: '98/107'}
        ],
        data: [{value: 0.7}, {value: 0.3}],
        chartTitle: '800万',
        chartSubtext: '累计',
        chartType: 'pie_A',
        height: 220
      },
      profitMargin1: {
        title: '总资产',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '-108%'}
        ],
        data: [],
        chartTitle: '800万',
        chartType: 'line_A',
        height: 220
      },
      profitMargin2: {
        title: 'ROE',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '-108%'}
        ],
        data: [20, 50, 60, 100, 10],
        chartTitle: '20%',
        chartType: 'line_A',
        height: 220
      },
      profitAnalysis: {
        title: '盈利分析',
        chartType: 'bar_A',
        data: {
          '收入': [70, 10, 20, 50, 100, 30, 20, 55, 66, 12, 20, 12],
          '净利润': [10, 80, 100, 0, 20, 300, 10, 0, 250, 120, 2, 10],
          '成本费用': [10, 80, 100, 0, 20, 300, 10, 0, 250, 120, 2, 10]
        },
        height: 300
      },
      incomeAndProfit_pie: {
        data: [
          {value: 30.7, name: '测试1'},
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
      brokerageTransactionSize: {
        title: '经纪业务交易规模',
        chartType: 'bar_line',
        data: {
          '经纪业务成交金额': {unit: '位', type: 'bar', data: [100, 2, 0, 8, 50, 33, 50, 15, 80, 60, 22, 10]},
          '经纪业务成交量': {unit: '%', type: 'line', data: [20, 50, 80, 0, 10, 30, 50, 60, 80, 50, 10, 11]}
        },
        height: 300
      },
      incomeAndProfit_line_0: {
        title: '行业排名',
        chartType: 'pie_F',
        height: 300,
        data: [20, 30],
        chartTitle: '1000亿',
        chartSubtext: '累计'
      },
      incomeAndProfit_line_1: {
        title: '行业排名',
        chartType: 'pie_F',
        height: 300,
        data: [20, 30],
        chartTitle: '1000亿',
        chartSubtext: '累计'
      },
      AssetsAndLiabilities: {
        title: '资产负债',
        chartType: 'bar_C',
        data: [
          {value: 70, name: '总资产'},
          {value: 10, name: '净资产'},
          {value: 20, name: '总负债'}
        ],
        height: 300
      },
      AssetAnalysis: {
        title: '资产分析',
        chartType: 'bar_line',
        data: {
          '净资产': {unit: '位', type: 'bar', data: [100, 2, 0, 8, 50, 33, 50, 15, 80, 60, 22, 10]},
          'ROE': {unit: '%', type: 'line', data: [20, 50, 80, 0, 10, 30, 50, 60, 80, 50, 10, 11]}
        },
        height: 300
      }
    };

    for (var key in option) {
      var __ = option[key];
      app.render(__, key);
    };
  }
};
</script>
