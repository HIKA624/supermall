<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive"><slot  name="item-icon"></slot></div>
    <div  v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active: !isActive}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      props:{
        path: String
      },
      computed: {
        isActive(){
        	//$route指的是当前活跃的路由
          return this.$route.path.indexOf(this.path)
        }
      },
      methods:{
        itemClick() {
          this.$router.replace(this.path).catch(()=>{})
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active {
    color: red;
  }
</style>
