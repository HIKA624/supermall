<template>
  <div class="Swiper">
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image">
      </a>
    </swiper-item>
  </swiper>
  </div>
</template>

<script>
	import Swiper from 'components/common/swiper/Swiper'
	import SwiperItem from 'components/common/swiper/SwiperItem'

	export default {
		name: "HomeSwiper",
    props:{
			banners:{
				type:Array,
        default(){
					return[]
        }
      }
    },
    components:{
	    Swiper,
	    SwiperItem
    }
	}
</script>

<style scoped>
.Swiper {

}
</style>