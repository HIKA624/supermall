<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeSwiper :banners="banners"></HomeSwiper>
    <RecommendView :recommends="recommends"></RecommendView>
    <FeatureView></FeatureView>
    <tab-control  class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
    <goods-list :goods="showGoods" />

    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from  'views/home/ChildComp/HomeSwiper'
  import RecommendView from './ChildComp/RecommendView'
  import FeatureView from './ChildComp/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from  'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/Goods/GoodsList'

  import  {getHomeMultidata,getHomeGoods} from 'network/home'


  export default {
    name: "home",
    components:{
	    HomeSwiper,
	    RecommendView,
	    FeatureView,

	    NavBar,
	    TabControl,
	    GoodsList
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
        currentType:'pop'
      }
    },
    computed: {
    	showGoods() {
    		return this.goods[this.currentType].list
      }
    },
    created() {
    	this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods: {
    	//事件监听相关方法
      tabClick(index) {
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
      },

    	//网络请求相关方法
	    getHomeMultidata() {
		    getHomeMultidata().then(res => {
			    this.banners = res.data.banner.list;
			    this.recommends = res.data.recommend.list;
		    })
      },
	    getHomeGoods(type){
	    	const page = this.goods[type].page + 1
		    getHomeGoods(type,1).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
		    })
      }
    }
  }
</script>

<style scoped>
#home {
  padding-top: 44px;
}

  #home .nav-bar {
    background-color:var(--color-tint);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
  .tab-control {
    z-index: 1001;
    position: sticky;
    top: 44px;
    background-color: #fff;
  }
</style>
