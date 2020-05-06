<template>
  <div id="home" @touchmove.prevent @mousewheel.prevent>
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @itemClick="tabClick"
                 ref="tabControl1"
                 :probe-type="3"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <div>
        <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
        <RecommendView :recommends="recommends"></RecommendView>
        <FeatureView></FeatureView>
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
        <goods-list :goods="showGoods" />
      </div>
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from  'views/home/ChildComp/HomeSwiper'
  import RecommendView from './ChildComp/RecommendView'
  import FeatureView from './ChildComp/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from  'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/Goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import  {getHomeMultidata,getHomeGoods} from 'network/home'
  import  {debounce} from "common/utils";


  export default {
    name: "home",
    components:{
	    HomeSwiper,
	    RecommendView,
	    FeatureView,

	    NavBar,
	    TabControl,
	    GoodsList,
	    Scroll,
	    BackTop,

    },
    data(){
      return {
      	banners: [],
        recommends: [],
        goods:{
      		'pop':{page:0 , list:[]},
      		'new':{page:0 , list:[]},
      		'sell':{page:0 , list:[]},
        },
        currentType:'pop',
	      isShowBackTop: false,
	      tabOffsetTop: 0,
	      isTabFixed: false,
	      saveY: 0,
      }
    },
    computed: {
    	showGoods() {
    		//默认展示的商品类型
    		return this.goods[this.currentType].list
      }
    },
    created() {
    	this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
	  activated() {
		  this.$refs.scroll.scrollTo(0, this.saveY)
	  },
	  deactivated() {
		  this.saveY = this.$refs.scroll.getScrollY()
	  },
    mounted(){
	    // 1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh,200)
	    this.$bus.$on('homeItemImgLoad', () => {
	    refresh()
    })

    },
    methods: {
    	//事件监听相关方法

      /*实现点击切换商品种类的思路是通过点击子组件中的3个种类（pop,new,sell)，
      向父组件（Home)提交对应index，
      再通过index的不同来修改currentType的不同，
      最后根据currentType的不同来请求不同的数据*/
      tabClick(index) {
      	//通过点击的种类（pop,new,sell)的不同来更改currentType的值
	      switch (index) {
          case 0:
          	this.currentType = 'pop'
	          break
          case 1:
	          this.currentType = 'new'
            break
          case 2:
	          this.currentType = 'sell'
            break
	      }
	      //使2个tabControl的类目选择是相同的
	      this.$refs.tabControl1.currentIndex = index;
	      this.$refs.tabControl2.currentIndex = index;

      },
	    backClick() {
      	//回到顶部按钮，三个参数分别是x轴位置，y轴位置和滚动延迟
        this.$refs.scroll.scrollTo(0,0,500)
      },
	    contentScroll(position) {
		    // 1.判断BackTop是否显示
		    this.isShowBackTop = (-position.y) > 1000

		    // 2.决定tabControl是否吸顶(position: fixed)
		    this.isTabFixed = (-position.y) > this.tabOffsetTop
	    },
	    loadMore() {
      	//上拉加载更多
		    this.getHomeGoods(this.currentType)
	    },
	    swiperImageLoad() {
      	//tabControl固定的原理是创建第二个tabControl，平时是隐藏的，当页面滚动到第一个tabControl的offsettop的时候，显示出第二个tabControl,而第二个tabControl是固定在视口的，
        // 所以看起来是使用了position：fixed，其实只是一个简单的显示隐藏
		    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
	    },


    	//网络请求相关方法

      //获取首页轮播图和推荐栏的数据
	    getHomeMultidata() {
		    getHomeMultidata().then(res => {
			    this.banners = res.data.banner.list;
			    this.recommends = res.data.recommend.list;
		    })
      },
      //获取首页商品信息输数据
	    getHomeGoods(type){

      	//由于默认的page值是0，所以每次使用这个方法的时候，page的值+1
	    	const page = this.goods[type].page + 1
        //这里的getHomeGoods是axios中的方法，用来向服务器请求数据
		    getHomeGoods(type,1).then(res => {
          //向首页的商品列表push进请求过来的res中的每一个商品
          this.goods[type].list.push(...res.data.list)
          //请求完数据后当前商品的页数从默认的0变为1
          this.goods[type].page += 1
			    this.$refs.scroll.finishPullUp()
		    })
      },

    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
  }

  #home .nav-bar {
    background-color:var(--color-tint);
    font-weight: 700;
    color: #fff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 10;*/
  }
  .tab-control {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
</style>
