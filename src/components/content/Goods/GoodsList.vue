<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.id" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

	export default {
		name: "GoodsList",
    components:{
			GoodsListItem
    },
    props:{
			goods: {
				type:Array,
        default(){
					return[]
        }
      }
    }
	}
</script>

<style scoped>
.goods{
  display: flex;
  justify-content:space-around;
  flex-wrap:wrap;
  font-size:0;
  padding:5px;
}
</style>