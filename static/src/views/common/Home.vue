<template>
  <div class="pages" :class="{minMenuIcon: !isMinMenuIcon}">
    <header-temp></header-temp>
    <menu-temp class="menu"></menu-temp>
    <tab-nav-temp class="nav"></tab-nav-temp>
    <div class="page">
      <keep-alive exclude="">
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    menuTemp: () => import('@/components/temp/menu.vue'),
    headerTemp: () => import('@/components/temp/header.vue'),
    tabNavTemp: () => import('@/components/temp/tabNav.vue')
  },
  computed: {
    isMinMenuIcon() {
      return this.$store.getters.getMenuStatus;
    }
  }
};
</script>

<style lang="scss">
.pages{width:100%; height:100%; position:absolute; background:$bg-4;
  .menu{background:$light; transition:$trans; position:absolute; top:$nav-height; left:0; bottom:0; width:$menu-max-width; overflow-y:auto;}
  .nav{background:$light; position:absolute; top:$nav-height; left:$menu-max-width+1px; right:0; height:$tab-height; box-shadow:0 2px 1px 0 $bg-1; z-index:1;}
  .page{position:absolute; top:$nav-height+$tab-height; right:0; bottom:0; left:$menu-max-width+1px; transition:$trans; overflow-y:auto;}
  &.minMenuIcon{
    .menu{width:$menu-min-width}
    .page{left:$menu-min-width}
  }
}
</style>
