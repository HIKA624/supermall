<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>

    <div class="content">

      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>

      <scroll id="tab-content">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import TabMenu from './childComps/TabMenu'
	import Scroll from 'components/common/scroll/Scroll'
	import TabControl from 'components/content/TabControl/TabControl'
  import TabContentCategory from './childComps/TabContentCategory'
	import TabContentDetail from './childComps/TabContentDetail'


  import { getCategory,getSubcategory,getCategoryDetail } from 'network/category'
  import { POP,NEW,SELL } from '@/common/const'

  export default {
    name: "Category",
    components: {
	    NavBar,
	    TabMenu,
	    Scroll,
	    TabContentCategory,
	    TabControl,
	    TabContentDetail,

    },
    data() {
    	return {
        categories:[],
		    categoryData: {},
		    currentIndex: -1,
		    currentType: POP,
      }
    },
    created() {
    	//请求分类数据
      this.getCategory()
    },
	  computed: {
		  showSubcategory() {
			  if (this.currentIndex === -1) return {}
			  return this.categoryData[this.currentIndex].subcategories
		  },
      showCategoryDetail() {
	      if (this.currentIndex === -1) return []
			  return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
		  }
    },
    methods: {
    	tabClick(index) {
		    switch (index) {
			    case 0:
				    this.currentType = POP
				    break
			    case 1:
				    this.currentType = NEW
				    break
			    case 2:
				    this.currentType = SELL
				    break
		    }
		    console.log(this.currentType);
      },
	    getCategory() {
		    getCategory().then(res => {
			    //获取分类数据
			    this.categories = res.data.category.list
			    //初始化每个类别的子数据（pop,new,sell）
			    for (let i = 0; i < this.categories.length; i++) {
				    this.categoryData[i] = {
					    subcategories: {},
					    categoryDetail: {
						    'pop': [],
						    'new': [],
						    'sell': []
					    }
				    }
			    }
			    this.getSubcategories(0)
		    })
      },
	    getSubcategories(index) {
	    	this.currentIndex = index;
        const mailKey = this.categories[index].maitKey
		    getSubcategory(mailKey).then(res => {
			    this.categoryData[index].subcategories = res.data
			    this.categoryData = {...this.categoryData}
			    this.getCategoryDetail(POP)
			    this.getCategoryDetail(NEW)
			    this.getCategoryDetail(SELL)
		    })
      },
	    getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
		    const miniWallkey = this.categories[this.currentIndex].miniWallkey;
		    // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
			    // 3.将获取的数据保存下来
			    this.categoryData[this.currentIndex].categoryDetail[type] = res
			    this.categoryData = {...this.categoryData}
		    })
	    },
	    selectItem(index) {
		    this.getSubcategories(index)
	    }
    }

  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
