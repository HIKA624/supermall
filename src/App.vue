<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar v-if="$route.meta.showTab"></main-tab-bar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/MainTabBar/MainTabBar'
  import Icon from 'components/content/Icon/Icon'
  import svgIcon from 'components/content/Icon/svg'

  export default {
    name: 'App',
    components: {
    	MainTabBar,Icon,svgIcon
    }
  }
</script>

<style>
@import "assets/css/base.css";
</style>
