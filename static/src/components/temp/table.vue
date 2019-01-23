<template>
  <el-card class="box-card" shadow="hover">
    <!-- 页面头部及操作按钮 -->
    <div slot="header" class="clearfix">
      <span><i v-if="!!config.icon" :class="`fa ${config.icon}`"></i> {{config.title}}</span>
      <div style="display:inline-block; float:right">
        <slot name="extra"></slot>
      </div>
    </div>
    <!-- 筛选区域 -->
    <div class="filter-view">
      <slot name="filter"></slot>
    </div>
    <!-- 表格区域 -->
    <el-table :ref="commonTableRef" :data="tableData" :stripe="config.border" v-loading="config.load"
      :show-summary="config.summary" @sort-change="config.sortChangeCallback" @selection-change="selectionChangeCallback">
      <template v-for="(it, idx) in config.columns">
        <!-- 第一列选项 支持的type有 index/selection -->
        <el-table-column v-if="it.type" :key="idx" :label="it.val" :type="it.type"></el-table-column>
        <el-table-column v-else :key="idx" :label="it.val" :prop="it.key"
          :align="it.align || 'center'" :fixed="it.fixed" :width="it.width"
          :filters="it.filter" :filter-method="it.filterMethod"
          :sortable="it.sort"
          >
          <template slot-scope="scope">
            <template v-if="it.formatter">
              <span v-html="it.formatter(scope.row, it)"></span>
            </template>
            <template v-else-if="it.render">
              <expand-dom :column="it" :row="scope.row" :render="it.render"></expand-dom>
            </template>
            <template v-else>
              <span>{{scope.row[it.key]}}</span>
            </template>
          </template>
        </el-table-column>
      </template>

      <!-- 按钮操作组-->
      <el-table-column v-if="config.operates" ref="fixedColumn" label="操作" align="center"
        :width="config.operates.width" :fixed="config.operates.fixed">
        <template slot-scope="scope">
          <div class="operate-group">
            <template v-for="(btn, key) in config.operates.list">
              <el-button :key="key" :type="btn.type || 'primary'" size="mini" :icon="btn.icon" :disabled="btn.disabled"
                          :plain="btn.plain" @click.native.prevent="btn.method(scope.row, scope.$index, scope)">{{ btn.label }}
              </el-button>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-if="config.pagination" @size-change="handleSizeChange" @current-change="handleIndexChange"
      :page-size="tableParams.pageSize" :page-sizes="pageSizeArr" :current-page="tableParams.pageNum"
      :total="tableParams.total" layout="total,sizes, prev, pager, next,jumper"
      style="margin-top: 20px;text-align: right">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  /**
   * @param cfg 表格通用设置 exp {}
   */
  props: {
    cfg: Object
  },
  data() {
    return {
      pageSizeArr: [5, 10, 20, 50, 100],
      commonTableRef: `commonTable-${new Date().getTime()}`,
      config: {},
      tableData: [],
      selectionCache: [],
      tableParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  components: {
    // render支持
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {row: ctx.props.row, index: ctx.props.index};
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      }
    }
  },
  methods: {
    query() {
      this.config.load = true;
      const param = {...this.config.params, ...this.tableParams};
      this.request(this.config.tableQueryMethods, param).then(res => {
        this.config.load = false;
        this.tableData = res.data.list;
        this.tableParams.total = res.data.totalElements;
      });
    },
    search() {
      this.tableParams.pageNum = 1;
      this.query();
    },
    /**
     * @param {String} name 将要清除的过滤器的prop，不传将清除所有过滤器
     */
    clearFilter(name) {
      if (name) this.$refs[this.commonTableRef].clearFilter(name);
      else this.$refs[this.commonTableRef].clearFilter();
    },
    handleSizeChange(size) {
      this.tableParams.pageNum = 1;
      this.tableParams.pageSize = size;
      this.query();
    },
    handleIndexChange(num) {
      this.tableParams.pageNum = num;
      this.query();
    },
    selectionChangeCallback(data) {
      this.selectionCache = data;
    }
  },
  created() {
    /**
     * @desc 默认参数处理
     * @param title 页面标题 exp: '页面管理'
     * @param icon 页面标题图标 exp: 'fa-qq'
     * @param columns element表格配置 exp: [{key: xx, val: xxx}]
     * @param operates 操作按钮组 exp {list: []} 注：list内label\method必填
     */
    this.config = {...{
      isNeedStopFirstQuery: false,                     //是否需要拦截首次请求，默认不需要
      border: false,                                   //斑马纹
      load: false,                                     //loading符
      summary: false,                                  //底部合计
      params: {},                                      //请求所携带条件
      tableQueryMethods: '',                           //表格请求地址 *必填
      sortChangeCallback(e) { console.log(e); },       //排序监听
      pagination: true,
      title: '',
      icon: '',
      columns: [],
      operates: {}
    }, ...this.cfg};
    this.query();
  }
};
</script>

<style lang="scss">
.filter-view{padding-bottom:15px;
  section{width:200px; display:inline-block;margin-right: 10px}
}
</style>
