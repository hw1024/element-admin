<template>
  <div>
    <el-dialog :title="cfg.title" :visible.sync="state" :width="cfg.width">
      <slot name="content"></slot>
      <slot slot="footer" name="footer" class="dialog-footer"></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    cfg: Object
  },
  data() {
    return {
      state: false
    };
  },
  methods: {
    open() { this.state = true; },
    close() { this.state = false; }
  }
};
</script>
