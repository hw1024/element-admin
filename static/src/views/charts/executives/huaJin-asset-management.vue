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
        <div class="col col-md-5" id="ProportionOfBusinessIncome"></div>
        <div class="col col-md-7">
          <img src="/img/table.png" alt style="width:100%;display:block;margin:0 auto">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col col-md-6" id="incomeAndProfit_bar"></div>
      <div class="col col-md-6" id="incomeAndProfit_line"></div>
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
      ProportionOfBusinessIncome: {
        chartTitle: '华通金租各业务收入占比',
        chartType: 'pie_E',
        data: [
          {name: '融资租赁业务', value: 10},
          {name: '经营租赁业务', value: 10},
          {name: '售后回租业务', value: 10},
          {name: '转租赁业务', value: 110},
          {name: '其他租赁业务', value: 10}
        ],
        height: 300
      },
      incomeAndProfit_bar: {
        title: '华通金租资产负债',
        chartType: 'bar_C',
        data: [
          {value: 70, name: '总资产'},
          {value: 10, name: '净资产'},
          {value: 20, name: '总负债'}
        ],
        height: 300
      },
      incomeAndProfit_line: {
        title: '行业排名',
        chartType: 'line_C',
        height: 300,
        data: {
          yUnit: '位',
          data: {
            '上年排名': [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            '实际排名': [60, 50, 51, 20, 38, 95, 51, 10, 20, 11, 10, 30]
          }
        }
      }
    };

    for (var key in option) {
      var __ = option[key];
      app.render(__, key);
    };
  }
};
</script>
