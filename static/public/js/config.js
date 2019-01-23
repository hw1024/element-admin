window.wws_config = (function() {
  return {
    charts: {
      pie_A: function(legend, title, subTitle) {
        return {
          // tooltip: {trigger: 'item', formatter: "{a} <br/>{b}: {c} ({d}%)"},
          title: [
            {y: 'center', x: 'center', text: title, textStyle: {fontSize: 16}},
            {y: '51%', x: 'center', text: subTitle, textStyle: {fontSize: 12, color: '#ccc'}}
          ],
          series: {
            type: 'pie',
            radius: ['55%', '85%'],
            avoidLabelOverlap: false,
            label: {normal: {show: false}},
            labelLine: {normal: {show: false}},
            data: legend
          }
        }
      },
      pie_B: function(data) {
        return {
          series: {
            type:'pie',
            radius : [0, 110],
            roseType : 'radius',
            data: data
          }
        };
      },
      pie_C: function(data) {
        return {
          graphic: {
            left: '55%', top: 'center', type: 'text', style: {
            fill: '#32a6c3', font: 'bolder 16px "STHeiti", sans-serif',
            text: [
              data[0].name + ' ' + data[0].value,
              data[1].name + ' ' + data[1].value,
              '员工流失率 ' + (data[1].value / data[0].value * 100) + '%'
            ].join('\n')}
          },
          series: {
            type:'pie',
            center : ['25%', '50%'],
            data: data || [
              {value:10, name:'rose1'},
              {value:5, name:'rose2'}
            ],
            label: {normal: {show: false}},
            labelLine: {normal: {show: false}}
          }
        }
      },
      pie_D: function(data) {
        var legend = [];
        var datas = [];
        var textKey = [];
        var textVal = [];
        for (var key in data['pie']) {
          legend.push(key);
          datas.push({value: data['pie'][key], name: key});
        };
        for (var key in data.text) {
          textKey.push(key);
          textVal.push(data.text[key]);
        }
        return {
          legend: {data: legend, orient: 'vertical', x: '38%', y: 'center'},
          series: {
            data: datas, center: ['20%', '50%'], type: 'pie',
            label: {position: 'inside', formatter: '{c}亿\n{d}%'}
          },
          graphic: [
            {
              type: 'text', left: '60%', top: 'center',
              style: {
                fill: '#999', font: 'bolder 20px "STHeiti", sans-serif',
                text: textKey.join('\n')
              }
            },
            {
              type: 'text', left: '72%', top: 'center',
              style: {
                fill: '#32a6c3', font: 'bolder 20px "STHeiti", sans-serif',
                text: textVal.join('\n')
              }
            }
          ]
        }
      },
      pie_E: function(data, title) {
        return {
          title: {text: title, right: '36%'},
          legend: {type: 'scroll', orient: 'vertical', y: 'center', x: '65%'},
          series: {
            type: 'pie',
            center: ['35%', '55%'],
            avoidLabelOverlap: false,
            label: {normal: {position: 'inside', formatter: '{d}%'}},
            labelLine: {normal: {show: false}},
            data: data
          }
        }
      },
      pie_F: function(data, title, subTitle, height, width) {
        return {
          graphic: [
            {type: 'group', left: 0, top: '62%', width: width, height: height * .36, children: [
              {type: 'text', style: {text: '客户保证金规模'}, left: 0, top: '30%'},
              {type: 'text', style: {text: '计划完成量'}, left: 0, top: '50%'},
              {type: 'text', style: {text: '3300万'}, left: '50%', top: '30%'},
              {type: 'text', style: {text: '10%'}, left: '50%', top: '50%'},
              {type: 'image', style: {image: '../img/Snipaste_2019-01-02_15-18-58.png'}, left: '80%', top: '50%'}
            ]},
            {type: 'group', left: 0, top: '81%', width: width, height: height * .36, children: [
              {type: 'text', style: {text: '客户保证金规模', color: '#333'}, left: 0, top: '30%'},
              {type: 'text', style: {text: '计划完成量', color: '#333'}, left: 0, top: '50%'},
              {type: 'text', style: {text: '3300万'}, left: '50%', top: '30%'},
              {type: 'text', style: {text: '10%'}, left: '50%', top: '50%'},
              {type: 'image', style: {image: '../img/Snipaste_2019-01-02_15-18-58.png'}, left: '80%', top: '50%'}
            ]}
          ],
          title: [
            {y: '25%', x: 'center', text: title || '800万', textStyle: {fontSize: 16}},
            // {y: '30%', x: 'center', text: subTitle || '累计', textStyle: {fontSize: 12, color: '#ccc'}}
          ],
          series: {
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '30%'],
            avoidLabelOverlap: false,
            label: {normal: {show: false}},
            labelLine: {normal: {show: false}},
            data: data
          }
        }
      },
      line_A: function(data, title) {
        return {
          title: {
            x: 'center', y: '20%', text: title || '20%',
            textStyle: {fontSize: 48, color: '#1298ba'}
          },
          xAxis: {type: 'category', show: false},
          yAxis: {type: 'value', show: false},
          grid: {top: '60%', left:15, right:15, bottom:'20%'},
          series: {
            data: data || [0, 20000, 901, 934, 500],
            type: 'line'
          }
        }
      },
      line_B: function(data) {
        return {
          xAxis: {type: 'category', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]},
          yAxis: {type: 'value', name: '%'},
          series: [
            {data: data[0], type: 'line'},
            {data: data[1], type: 'line'}
          ]
        }
      },
      line_C: function(data) {
        var series = [];
        var legend = [];
        for (var key in data.data) {
          legend.push(key);
          series.push({data: data.data[key], type: 'line', name: key});
        }
        return {
          tooltip: {trigger: 'axis'},
          legend: {data: legend, x: 'center'},
          xAxis: {
            type: 'category', data: data.xUnit || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            axisLine: {onZero: false}, axisTick: {alignWithLabel: true}
          },
          yAxis: {type: 'value', name: data.yUnit, inverse: true, nameLocation: 'start'},
          series: series
        }
      },
      gauge: function(data, title, subtext) {
        return {
          title: [
            {text: title || '净资产收益率', x: 'center', y: '50%', textStyle: {fontSize: 16}},
            {text: subtext || '2017年', x: 'center', y: '70%', textStyle: {fontSize: 12, color: '#aaa'}}
          ],
          // tooltip : {formatter: "{a} <br/>{b} : {c}%"},
          series: {
            type: 'gauge', radius: '95%', startAngle: 180, endAngle: 0,
            axisLine: {lineStyle: {
              width: 6,
              color: [[0.5, '#00ac54'], [0.75, '#f1bf00'], [1, '#e21b29']]
            }},
            axisTick: {            // 坐标轴小标记
              length: 8,          // 属性length控制线长
              lineStyle: {color: 'auto'}
            },
            splitLine: {           // 分隔线
              length: 10,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              show: false,
              color: 'auto',
            },
            pointer: {width: 3, length: '75%'},
            detail: {show: false},
            data: [{value: data}]
          }
        }
      },
      bar_A: function(data) {
        // data.map(function(item) {
        //   console.log(item);
        // });
        var legends = [];
        var datas = [];
        for (var key in data) {
          legends.push(key);
          datas.push({name: key, type: 'bar', data: data[key]});
        }
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {type: 'shadow'}
          },
          legend: {data: legends, x: '80%'},
          calculable: true,
          xAxis: {
            type: 'category',
            axisTick: {show: false},
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          },
          yAxis: {type: 'value', name: '万元'},
          series: datas
        };
      },
      bar_B: function(data) {
        var label = {
          normal: {
            formatter: '{a}: {c}',
            show: true,
            position: 'top'
          }
        };
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {type: 'shadow'}
          },
          legend: {data: ['本期', '同期'], x: '80%'},
          calculable: true,
          xAxis: {
            type: 'category',
            axisTick: {show: false},
            data: ['核心业务', '战略业务', '支持业务', '财务投资']
          },
          yAxis: {type: 'value', show: false},
          series: [
            {
              name: '本期',
              type: 'bar',
              barGap: 0,
              data: data[0] || [320, 332, 301, 334],
              label: label
            },
            {
              name: '同期',
              type: 'bar',
              data: data[1] || [220, 182, 191, 234],
              label: label
            }
          ]
        };
      },
      bar_C: function(data) {
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {type: 'shadow'}
          },
          xAxis: {
            type: 'category',
            data: ['总资产', '净资产 ', '总负债']
          },
          yAxis: {type: 'value', name: '万元'},
          series: {
            type: 'bar',
            barGap: 0,
            data: data || [320, 332, 301, 334],
            label: {normal: {show: true, position: 'top'}}
          },
        }
      },
      bar_D: function(data, title) {
        return {
          title: {text: title, x: 'center', textStyle: {fontWeight: '0'}},
          tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
          yAxis: {
            type: 'category',
            data: ['<25岁', '25-35岁', '35-45岁', '45-55岁', '>55岁']
          },
          xAxis: {type: 'value'},
          series: {
            type: 'bar',
            barGap: 0,
            data: data,
            label: {normal: {show: true, position: 'right', formatter: function(a) {
              return a.value+'人 ' + ' 占比' + a.data.dime;
            }, textStyle: {color: '#1298ba', fontWeight: 'bold'}}}
          },
        }
      },
      bar_E: function(data, title, subTitle, height, width) {
        var series = [];
        for (var key in data.data) {
          series.push({
            type: 'bar',
            data: data.data[key],
            name: key,
            label: {show: true},
            markLine: {width: 10}
          });
        };
        var graphic = [];
        data.add.map(function(item, idx) {
          var src = item.indexOf('-') === -1 ? '../img/Snipaste_2019-01-02_15-19-08.png' : '../img/arrow_up.png';
          graphic.push({
            type: 'group', children: [
              {type: 'text', style: {text: item, x: width - 60, y: height * (idx + 1) * .3}},
              {type: 'image', style: {image: src, width: 15, height: 15, x: width - 15, y: height * (idx + 1) * .31}}
            ]
          });
        })

        return {
          graphic: graphic,
          tooltip: {trigger: 'axis'},
          grid: {right: 60, top: 30, bottom: 30},
          legend: {x: 'right', y: 'bottom'},
          xAxis: {type: 'value', axisLabel: {show: false}, axisLine: {show: false}, splitLine: {show: false}, axisTick: {show: false}},
          yAxis: {
            type: 'category', data: data.yAxis, axisTick: {show: false},
            axisLabel: {interval: 0, formatter: function(val) {
              var str = val.split('').join('\n');
              return str;
            }}
          },
          series: series
        }
      },
      bar_line: function(data) {
        var leg = [];
        var datas = [];
        var y = [];
        for(var key in data) {
          leg.push(key);
          y.push({type: 'value', name: data[key].unit});
          datas.push({type: data[key].type, data: data[key].data, name: key});
        }
        return {
          legend: {data: leg, right: '15%', y: 15, textStyle: {fontWeight: 600, color: '#333'}},
          tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
          xAxis: {type: 'category', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]},
          yAxis: y,
          series: datas
        }
      }
    }
  }
})();

