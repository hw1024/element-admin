<template>
  <i ref="image" :style="`background:url('${newSrc}') center center / cover no-repeat;`"></i>
</template>
<script>
export default {
  props: {
    url: String,
    wid: {type: String},
    high: {type: String, default: '100'}
  },
  data() {
    return {
      newSrc: `https://dummyimage.com/${this.wid || 800}x${this.high}&text=loading...`
    };
  },
  created() {
    const IMG = new Image();
    IMG.src = this.url;
    IMG.onload = () => {
      this.newSrc = this.url;
    };
    IMG.onerror = () => {
      this.newSrc = `https://dummyimage.com/${this.wid || 800}x${this.high}&text=loading...`;
    };
  },
  mounted() {
    const img = this.$refs['image'];
    img.style.display = 'inline-block';
    img.style.width = this.wid ? `${this.wid}px` : '100%';
    img.style.height = `${this.high}px`;
  }
};
</script>
