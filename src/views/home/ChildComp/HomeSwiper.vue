<template>
  <div class="Swiper">
  <swiper ref="swiper">
    <swiper-item v-for="item in banners">
      <div>
        <img :src="item.image" @load="imageLoad">
      </div>
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
    data() {
			return{
				isLoad:false
      }
    },
    components:{
	    Swiper,
	    SwiperItem
    },
    methods:{
	    imageLoad() {
		    if (!this.isLoad) {
			    this.$emit('swiperImageLoad')
          this.isLoad = true
        }
	    },
	    stopTimer() {
		    this.$refs.swiper.stopTimer()
	    },
	    startTimer() {
		    if (this.$refs.swiper) {
			    this.$refs.swiper.startTimer()
		    }
	    }
    }
	}
</script>

<style scoped>
.Swiper {

}
</style>