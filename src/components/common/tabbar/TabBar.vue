<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  .tab-bar {
    width: 100%;
    height: 49px;
    display: flex;
    justify-content:center;
    align-items:center;
    background-color: #f6f6f6;
    position: fixed;
    z-index: 1000;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 1px rgba(100,100,100,.2);
  }

</style>
