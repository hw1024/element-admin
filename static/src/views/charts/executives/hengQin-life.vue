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
      <div class="col col col-md-12">
        <b class="title">首年保费</b>
        <div class="col col-md-5" id="profitAnalysis"></div>
        <img src="/img/table.png" alt style="width:58%;padding-top:100px">
      </div>
    </div>

    <div class="row">
      <div class="col col-md-12">
        <b class="title">投资收益</b>
        <div class="col col-md-12" id="incomeAndProfit_bar"></div>
      </div>
    </div>

    <div class="row">
      <div class="col col-md-6" id="industryRanking_1"></div>
      <div class="col col-md-6" id="industryRanking_2"></div>
    </div>

    <div class="row">
      <div class="col col-md-6" id="industryRanking_3"></div>
      <div class="col col-md-6" id="assetAnalysis"></div>
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
        title: '总保费收入',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '-108%'}
        ],
        data: [],
        chartTitle: '30.6亿',
        chartType: 'line_A',
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
        title: '净利润',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '-108%'}
        ],
        data: [],
        chartTitle: '3000万',
        chartType: 'line_A',
        height: 220
      },
      profitMargin2: {
        title: '内含价值',
        scale: [
          {key: '计划完成率', val: '+108%'},
          {key: '同比增长率', val: '-108%'}
        ],
        data: [],
        chartTitle: '8000万',
        chartType: 'line_A',
        height: 220
      },
      profitAnalysis: {
        chartType: 'bar_A',
        controller: {
          type: 'btnGroup',
          data: [
            {key: '首年规模保费', val: '首年规模保费'},
            {key: '首年标准保费', val: '首年标准保费'}
          ]
        },
        data: {
          '当期': [70, 10, 20, 50, 100, 30, 20, 55, 66, 12, 20, 12]
        },
        height: 300
      },
      incomeAndProfit_bar: {
        additional: [
          {type: 'text', paddingRight: '3em', val: '保险资金运用余额'},
          {type: 'text', paddingRight: '2em', val: '5000万'},
          {type: 'text', paddingRight: '2em', val: '同比50.65%'},
          {type: 'img', url: '/img/arrow_up.png'}
        ],
        controller: {
          type: 'select',
          data: [
            {key: '财务口径', val: '财务口径'},
            {key: '综合口径', val: '综合口径'}
          ]
        },
        chartType: 'bar_line',
        data: {
          '当期': {unit: '位', type: 'bar', data: [100, 2, 0, 8, 50, 33, 50, 15, 80, 60, 22, 10]},
          '增长率': {unit: '%', type: 'line', data: [20, 50, 80, 0, 10, 30, 50, 60, 80, 50, 10, 11]}
        },
        height: 300
      },
      industryRanking_1: {
        controller: {
          type: 'btnGroup',
          data: [
            {key: '首年规模保费', val: '首年规模保费'},
            {key: '首年标准保费', val: '首年标准保费'}
          ]
        },
        title: '内含价值',
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
      industryRanking_2: {
        controller: {
          type: 'btnGroup',
          data: [
            {key: '首年规模保费', val: '首年规模保费'},
            {key: '首年标准保费', val: '首年标准保费'},
            {key: '首年标准保费1', val: '首年标准保费1'}
          ]
        },
        title: '行业排名',
        chartType: 'line_C',
        height: 300,
        data: {
          yUnit: '%',
          data: {
            '去年排名': [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            '当期排名': [60, 50, 51, 20, 38, 95, 51, 10, 20, 11, 10, 30]
          }
        }
      },
      industryRanking_3: {
        title: '核心偿付能力充足率',
        chartType: 'line_C',
        height: 300,
        data: {
          yUnit: '%',
          data: {
            '监管红线': [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            '当期': [60, 50, 51, 20, 38, 95, 51, 10, 20, 11, 10, 30]
          }
        }
      },
      assetAnalysis: {
        title: '综合偿付能力充足率',
        chartType: 'line_C',
        height: 300,
        data: {
          yUnit: '%',
          data: {
            '监管红线': [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            '当期': [60, 50, 51, 20, 38, 95, 51, 10, 20, 11, 10, 30]
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
