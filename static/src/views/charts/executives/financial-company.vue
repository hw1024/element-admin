<template>
  <div class="wws-chart-view">
    <div class="row">
      <div class="col col-md-3" id="financial_company_income"></div>
      <div class="col col-md-3" id="financial_company_profit"></div>
      <div class="col col-md-2" id="financial_company_profitMargin"></div>
      <div class="col col-md-2" id="financial_company_profitMargin1"></div>
      <div class="col col-md-2" id="financial_company_profitMargin2"></div>
    </div>

    <div class="row">
      <div class="col col-md-12">
        <div id="financial_company_profitAnalysis"></div>
        <img src="/img/table.png" alt style="width:70%;display:block;margin:0 auto">
      </div>
    </div>

    <div class="row">
      <div class="col col-md-12">
        <b class="title">各业务收入</b>
        <div class="col col-md-5" id="financial_company_incomeAndProfit_pie"></div>
        <div class="col col-md-7" id="financial_company_incomeAndProfit_bar"></div>
        <img src="/img/table_1.png" alt style="width:70%;display:block;margin:0 auto">
      </div>
    </div>

    <div class="row">
      <div class="col col-md-3" id="financial_company_averageDailyDepositBalance"></div>
      <div class="col col-md-3" id="financial_company_dailyAverageBalanceOfLoans"></div>
      <div class="col col-md-3" id="financial_company_billDiscountScale"></div>
      <div class="col col-md-3" id="financial_company_billAcceptanceScale"></div>
    </div>

    <div class="row">
      <div class="col col-md-6" id="financial_company_industryRanking_1"></div>
      <div class="col col-md-6" id="financial_company_industryRanking_2"></div>
    </div>

    <div class="row">
      <div class="col col-md-6" id="financial_company_industryRanking_3"></div>
      <div class="col col-md-6" id="financial_company_assetAnalysis"></div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    var app = new window._App();
    /**@desc 注：此处为dom节点配置，包含图表配置、表格配置等*/
    var option = {
      financial_company_income: {
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
      financial_company_profit: {
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
      financial_company_profitMargin: {
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
      financial_company_profitMargin1: {
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
      financial_company_profitMargin2: {
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
      financial_company_profitAnalysis: {
        title: '盈利分析',
        chartType: 'bar_A',
        data: {
          '收入': [70, 10, 20, 50, 100, 30, 20, 55, 66, 12, 20, 12],
          '净利润': [10, 80, 100, 0, 20, 300, 10, 0, 250, 120, 2, 10],
          '成本费用': [10, 80, 100, 0, 20, 300, 10, 0, 250, 120, 2, 10]
        },
        height: 300
      },
      financial_company_incomeAndProfit_pie: {
        data: [
          {value: 3.7, name: '信贷业务'},
          {value: 7.3, name: '资金业务'},
          {value: 6.3, name: '投资业务'},
          {value: 10.3, name: '中间业务'}
        ],
        chartType: 'pie_E',
        height: 300
      },
      financial_company_incomeAndProfit_bar: {
        chartType: 'bar_line',
        data: {
          '当期': {unit: '位', type: 'bar', data: [100, 2, 0, 8, 50, 33, 50, 15, 80, 60, 22, 10]},
          '增长率': {unit: '%', type: 'line', data: [20, 50, 80, 0, 10, 30, 50, 60, 80, 50, 10, 11]}
        },
        height: 300
      },
      financial_company_averageDailyDepositBalance: {
        title: '日均存款余额',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '-108%'},
          {key: '同比增长率', val: '108%'}
        ],
        data: [{value: 0.7}, {value: 0.3}],
        chartTitle: '800万',
        chartType: 'pie_A',
        height: 220
      },
      financial_company_dailyAverageBalanceOfLoans: {
        title: '贷款日均余额',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '108%'},
          {key: '', val: ''}
        ],
        data: [{value: 0.7}, {value: 0.3}],
        chartTitle: '800万',
        chartType: 'pie_A',
        height: 220
      },
      financial_company_billDiscountScale: {
        title: '票据贴现规模',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '-108%'},
          {key: '', val: ''}
        ],
        data: [{value: 0.7}, {value: 0.3}],
        chartTitle: '800万',
        chartSubtext: '累计',
        chartType: 'pie_A',
        height: 220
      },
      financial_company_billAcceptanceScale: {
        title: '票据承兑规模',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '', val: ''},
          {key: '', val: ''}
        ],
        data: [{value: 0.7}, {value: 0.3}],
        chartTitle: '800万',
        chartType: 'pie_A',
        height: 220
      },
      financial_company_industryRanking_1: {
        title: '资金归集率',
        chartType: 'line_C',
        height: 300,
        data: {
          yUnit: '%',
          data: {
            '目标': [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            '同期': [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            '当期': [60, 50, 51, 20, 38, 95, 51, 10, 20, 11, 10, 30]
          }
        }
      },
      financial_company_industryRanking_2: {
        title: '结算收支比',
        chartType: 'line_C',
        height: 300,
        data: {
          yUnit: '%',
          data: {
            '同期': [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            '当期': [60, 50, 51, 20, 38, 95, 51, 10, 20, 11, 10, 30]
          }
        }
      },
      financial_company_industryRanking_3: {
        title: '贷款比例',
        chartType: 'line_C',
        height: 300,
        data: {
          yUnit: '%',
          data: {
            '同期': [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            '当期': [60, 50, 51, 20, 38, 95, 51, 10, 20, 11, 10, 30]
          }
        }
      },
      financial_company_assetAnalysis: {
        title: '资产分析',
        chartType: 'bar_line',
        data: {
          '当期': {unit: '位', type: 'bar', data: [100, 2, 0, 8, 50, 33, 50, 15, 80, 60, 22, 10]},
          '增长率': {unit: '%', type: 'line', data: [20, 50, 80, 0, 10, 30, 50, 60, 80, 50, 10, 11]}
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
