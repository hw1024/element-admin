<template>
  <div>
    <el-form :ref="ref" :model="config.data" :rules="config.rules" :label-width="config.width">
      <template v-for="(item, idx) in config.el">
        <el-form-item :label="item.label" :prop="item.prop" :key="idx">
          <form-item-temp :item="item" :formData="config.data" @upload="uploadData"></form-item-temp>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    cfg: Object
  },
  data() {
    return {
      ref: `form-${String(new Date().getTime()).substring(5)}`,
      config: {
        data: {},
        width: '80px'
      }
    };
  },
  methods: {
    validate() {
      return new Promise(resolve => {
        this.$refs[this.ref].validate(valid => {
          resolve(valid);
        });
      });
    },
    clears() { this.$refs[this.ref].clearValidate(); },
    reset() { this.$refs[this.ref].resetFields(); },
    uploadData(e) { this.config.data = e; }
  },
  created() {
    this.config = {...this.config, ...this.cfg};
  },
  watch: {
    'cfg.data'(a) {
      this.config.data = a;
    }
  }
};
</script>
