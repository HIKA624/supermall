<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "TabControl",
    props:{
			titles:{
				type:Array,
        default() {
					return []
        }
      }
    },
    data() {
			return{
				currentIndex:0
      }
    },
    methods: {
			//用于向父组件提供对应的index，从而达到切换商品种类的目的
	    itemClick(index) {
        this.currentIndex = index;
        this.$emit('itemClick',index)
      }
    }
	}
</script>

<style scoped>
.tab-control {
  display: flex;
  font-size: 15px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: white;
}
  .tab-control-item{
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    padding: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>