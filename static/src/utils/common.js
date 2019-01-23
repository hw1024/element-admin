/**
   * 绘制饼图
   * @param name 参数名
   */
  export function DrawPieChart(echarts, id, color, data, animation, seriesFormat){
    var myChart = echarts.init(id);
    var seriesFormatter = seriesFormat == "2" ? "{d}%": "{c}";
    myChart.clear();
    var option = {
      animation: animation || true,
      color: color,
      tooltip: {
        trigger: 'item',
        position: function (pos, params, dom, rect, size) {
          var obj = {top: 60};
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        },
        formatter: "{c} ({d}%)"
      },
      series: [
        {
          name:'',
          type:'pie',
          radius: ['48%', '80%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
                fontSize: 12,
                formatter: seriesFormatter,
                position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:data
        }
      ]
    };
    myChart.clear();
    myChart.setOption(option);
  }