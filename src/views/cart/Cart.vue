<template>
  <div id="cart" @touchmove.prevent @mousewheel.prevent>
    <nav-bar class="nav-bar" >
      <div slot="center">购物车({{length}})</div>
      <div slot="right" @click="clear">清空</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar/>

    <toast :message="message" :isToastShow="isToastShow"></toast>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './cartComps/CartList'
  import CartBottomBar from './cartComps/CartBottomBar'
  import Toast from  'components/common/toast/Toast'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    data() {
    	return {
    		message:'',
        isToastShow:false
      }
    },
    components:{
	    NavBar,
	    CartList,
	    CartBottomBar,
	    Toast
    },
    computed: {
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength'
      })
    },
    methods: {
	    clear() {
	    	if(this.$store.state.cartList.length <1 ){
	    		this.isToastShow = true
          this.message = '购物车是空的'

          setTimeout(() => {
            this.isToastShow = false
	          this.message = ''
          },2000)
        }else {
			    this.$confirm('是否清空购物车？', '提示', {
				    confirmButtonText: '确定',
				    cancelButtonText: '取消',
				    type: 'warning',
            center:'true'
			    }).then(() => {
				    this.$store.getters.cartList.splice(0)
			    }).catch(() => {

			    });
        }
      }
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
