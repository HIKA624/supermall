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
    width: 320px;
    display: flex;
    height: 44px;
    line-height: 44;
    text-align: center;
  }
  .left, .right {
    width: 60px;
    display: flex;
    align-items:center;
    justify-content :center;
  }

  .center {
    flex: 1 ;
    display: flex;
    align-items:center;
    justify-content :center;
  }

</style>