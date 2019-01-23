var $ = window.$;
var echarts = window.echarts;
window._App = (function() {
  var cache = {
    chart: {}
  };
  var color = ['#c5ec6e', '#ffc979', '#8fd5f0', '#6cb9bc', '#cccccc'];
  var App = function() {
    if (this instanceof App === false) return new App();
    this.cfg = window.wws_config;
    this.setCopyright();
  };

  App.prototype = {
    setCopyright: function() {
      this.copyright = {
        version: '1.0.0',
        creatTime: '2019/01/02 am.',
        author: 'wws1993<15696141050@163.com>'
      };
    },
    render: function(__, key) {
      var _title = __.title ? '<b class="title">' + __.title + '</b>' : '';
      var controller = __.controller ? this.handleController(__, key) : '';
      var additional = __.additional ? this.handleAdditional(__, key) : '';
      var html = _title + controller + additional;
      if (__.chartType) this.renderChart(__, key, html);
      else this.renderDom(__, key, html);
    },
    renderChart: function(__, key, _title) {
      var el = $('#' + key);
      var _scale = __.scale ? this.handleScale(__) : '';            // edit icon for scale
      var _html = _title + "<div class='chart'></div>" + _scale;
      el.html(_html);                                               // set html
      var _chart = el.find('.chart');                               // get chart dom
      var wid = __.height <= 1 ? _chart.innerWidth() * __.height : __.height;
      _chart.css('height', wid);                                    // set height
      cache.chart[key] = echarts.init(_chart[0]);                   // start echarts install
      this.uploadChart(key, __);
    },
    renderDom: function(__, key, _title) {
      var self = this;
      var el = $('#' + key);
      var _html = '<div>' + _title + '<div class="context" style="height:' + __.height + 'px">';
      __.data.map(function(item) {
        var img = '';
        var icon = '';
        var _dom = '';
        img = item.img ? '<img src="' + item.img + '">' : '';
        icon = item.icon ? '<i class="fa fa-' + item.icon + '"></i>' : '';
        if (Array.isArray(item.content)) {
          var childHtml = '<div class="content">';
          item.content.map(function(child) {
            childHtml += self.handleDomForRenderDom(child);
          });
          _dom = childHtml + '</div>';
        } else {
          _dom = '<div class="content">' + self.handleDomForRenderDom(item.content) + '</div>';
        }
        var lineHeight = (__.height / __.data.length - 20) / (item.content.length || 1);
        _html += '<div class="view" style="height:' + (100 / __.data.length).toFixed(2) + '%; line-height:' + lineHeight + 'px">' + (img || icon) + _dom + '</div>';
      });
      _html += '</div></div>';
      el.html(_html);
    },
    handleScale: function(__) {
      var _scale = '<div>';
      for (var i = 0; i < __.scale.length; i++) {
        var _this = __.scale[i];
        var _icon = _this.val ? 'conv' : '';
        if (!_this.val.indexOf(' + ')) _icon = 'add';
        else if (!_this.val.indexOf('-')) _icon = 'min';
        _scale += '<p class="desc">' +
                    '<span class="fir">' + _this.key + '</span>' +
                    '<span>' + _this.val + '</span>' +
                    '<span class="icon ' + _icon + '"></span>' +
                  '</p>';
      };
      return _scale + '</div>';
    },
    handleController: function(__, vmId) {
      var lib = __.controller;
      switch (lib.type) {
        case 'btnGroup':
          var html = '<div class="controller"><div class="btn-group">';
          lib.data.map(function(item) {
            html += '<button type="button" class="btn btn-sm btn-info" onclick="_App.search(' + vmId + ')">' + item.key + '</button>';
          });
          return html + '</div></div>';
        case 'select':
          var _string = '<div class="controller select">' +
                     '<select class="form-control" onchange="_App.search(' + vmId + ')">';
          lib.data.map(function(item) {
            _string += '<option value="' + item.val + '">' + item.key + '</option>';
          });
          return _string + '</select></div>';
        default:
          break;
      }
      return '<div class="controller"></div>';
    },
    handleAdditional: function(__) {
      var html = '<p class="additional">';
      __.additional.map(function(it) {
        switch (it.type) {
          case 'text':
            html += '<span style="padding-right:' + it.paddingRight + '">' + it.val + '</span>';
            break;
          case 'img':
            html += '<img src="' + it.url + '" style="padding-right:' + it.paddingRight + '">';
            break;
          default:
            break;
        }
      });
      return html + '</p>';
    },
    handleDomForRenderDom: function(child) {
      var __ = '';
      var len = 0;
      var _key = '<p>';
      for (var key in child) {
        _key += '<span class="text" style="width:TODOWIDTH">' + key + '<code>' + child[key] + '</code></span>';
        len++;
      }
      __ += _key + '</p>';
      __ = __.replace(/TODOWIDTH/g, (100 / len).toFixed(2) + '%');
      return  __;
    },
    uploadChart: function(vmId, options) {
      //                          (/▽＼)                            // get chart config
      var chartOpts = this.cfg.charts[options.chartType](options.data, options.chartTitle, options.chartSubtext, options.height, $('#' + vmId).width());
      chartOpts.color = color;                                      // set chart theme
      cache.chart[vmId].setOption(chartOpts);                       // render echarts
    }
  };

  return App;
})();

window._App.search = function(vmId) {
  console.log(vmId.id, vmId);
};
