<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
	export default {
		name: "NavBar"
	}
</script>

<style scoped>
  .nav-bar {
    z-index: 10;
    position: relative;
    display: flex;
    height: 44px;
    line-height: 44;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .left, .right {
    flex: 0 0 60px;
    line-height:44px;
    display: flex;
    align-items:center;
    justify-content :center;
  }

  .center {
    line-height:44px;
    flex: 1 ;
    display: flex;
    align-items:center;
    justify-content :center;
  }

</style>