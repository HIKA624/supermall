<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll" >
      <detail-swiper :top-images="topImages"/>

      <div>
        <ul v-for="item in this.$store.state.cartlist">
          <li>{{item}}</li>
        </ul>
      </div>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
    <toast :message="message" :isToastShow="isToastShow"></toast>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from './detailComps/DetailNavBar'
  import DetailSwiper from './detailComps/DetailSwiper'
  import DetailBaseInfo from './detailComps/DetailBaseInfo'
  import DetailShopInfo from './detailComps/DetailShopInfo'
  import DetailGoodsInfo from './detailComps/DetailGoodsInfo'
  import DetailParamInfo from './detailComps/DetailParamInfo'
  import DetailCommentInfo from './detailComps/DetailCommentInfo'
  import GoodsList from 'components/content/Goods/GoodsList'
  import DetailBottomBar from './detailComps/DetailBottonBar'
  import BackTop from 'components/content/backTop/BackTop'

  import Scroll from 'components/common/scroll/Scroll'
  import Toast from  'components/common/toast/Toast'

  import {getDetail, Goods, Shop, GoodsParam,getTheRecommend} from "network/detail";
  import  {debounce} from "common/utils";
  import { mapActions } from 'vuex'
  // import {itemListenerMixin} from "common/mixin";


  export default {
		name: "Detail",
    components: {
	    DetailNavBar,
	    DetailSwiper,
	    DetailBaseInfo,
	    DetailShopInfo,
	    DetailGoodsInfo,
	    DetailParamInfo,
	    DetailCommentInfo,
	    GoodsList,
	    Scroll,
	    DetailBottomBar,
	    BackTop,
	    Toast
    },
    // mixins:[itemListenerMixin],
    data() {
			return {
				iid: null,
        topImages:null,
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
        commentInfo:{},
				recommends:[],
        // itemImgListener:null,
        themeTopY:[],
				isShowBackTop: false,
        message: '',
        isToastShow: false
      }
    },
    created() {
			//保存传入的iid
			this.iid = this.$route.params.iid

      //根据iid请求数据
      getDetail(this.iid).then(res => {
	      this.topImages = res.result.itemInfo.topImages

      //请求推荐数据
	      getTheRecommend().then(res => {
        this.recommends = res.data.list
      })

	      // 1.获取顶部的图片轮播数据
	      // console.log(res);
	      const data = res.result;
	      this.topImages = data.itemInfo.topImages

	      // 2.获取商品信息
	      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

	      // 3.创建店铺信息的对象
	      this.shop = new Shop(data.shopInfo)

	      // 4.保存商品的详情数据
	      this.detailInfo = data.detailInfo;

	      // 5.获取参数的信息
	      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.获取评论区的信息
        if(data.rate.cRate !== 0) {
        	this.commentInfo = data.rate.list[0]
        }
        //
        // this.$nextTick(() => {
        //
	      //   this.themeTopY.push(0)
	      //   this.themeTopY.push(this.$refs.param.$el.offsetTop)
	      //   this.themeTopY.push(this.$refs.comment.$el.offsetTop)
	      //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        //
	      //   console.log(this.themeTopY);
        // })

      })
    },
	  methods: {
      ...mapActions(['addcart']),
			//详情页点击标题滚动：获取每个标题的offsetTop
		  imageLoad() {
			  this.$refs.scroll.refresh()

        this.themeTopY = []
			  this.themeTopY.push(0)
			  this.themeTopY.push(this.$refs.param.$el.offsetTop)
			  this.themeTopY.push(this.$refs.comment.$el.offsetTop)
			  this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        //
			  // console.log(this.themeTopY);
		  },
      //详情页点击标题滚动
		  titleClick(index) {
			  this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
		  },
      //详情页下拉内容对应标题
		  contentScroll(position) {
			  // 1.判断BackTop是否显示
			  this.isShowBackTop = (-position.y) > 1000

			  //获取Y值
			  // const positionY = -position.y
        // for (let i in this.themeTopY) {
	      //   console.log(i);
        // }
		  },
		  backClick() {
			  this.$refs.scroll.scrollTo(0,0,500)
		  },
		  addToCart() {
		  	const product = {}
		  	product.image = this.topImages[0]
		  	product.title = this.goods.title
		  	product.desc = this.goods.desc
		  	product.price = this.goods.realPrice
		  	product.iid = this.iid

        this.addcart(product).then(res => {
        	this.message = res
          this.isToastShow = true

          setTimeout(() => {
          	this.isToastShow = false
              this.message = ''
          },2000)
        })

        // this.$store.dispatch('addcart',product)
      }
	  },
	  mounted() {
		  // 1.图片加载完成的事件监听
		  const refresh = debounce(this.$refs.scroll.refresh, 200)
		  this.$bus.$on('datailItemImgLoad', () => {
			  refresh()
		  })
	  }
	}
</script>

<style scoped>
   .detail {
     height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-nav {
    width: 100%;
    position: fixed;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
   .back-top {
     position: fixed;
     right: 10px;
     bottom: 65px;
   }
</style>