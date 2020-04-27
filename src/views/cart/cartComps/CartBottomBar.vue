<template>
    <div class="BottomBar">
      <div class="left">
        <check-botton class="check-botton" v-model="isSelectAll" @click.native="checkClick"></check-botton>
        <span class="select">全选</span>
      <span class="totalPrice">合计：{{totalprice}}</span></div>
      <span class="calculate" @click="calcClick">去计算({{checkList}})</span>
      <toast :message="message" :isToastShow="isToastShow"></toast>
    </div>
</template>

<script>
  import CheckBotton from './CheckBotton'

  import Toast from  'components/common/toast/Toast'

  import { mapGetters } from 'vuex'

	export default {
		name: "CartBottomBar",
    data() {
			return {
				message:'',
				isToastShow:false
      }
    },
    components: {
	    CheckBotton,
	    Toast
    },
    computed: {
      ...mapGetters(['cartList']),
	    totalprice() {
	    	return '￥' + this.cartList.filter(item => {
	    		return item.checked
        }).reduce((preValue,item) => {
        	return preValue +  item.price * item.count
        },0).toFixed(2)
      },
	    checkList() {
        return this.cartList.filter(item => item.checked).length
      },
	    isSelectAll() {
      	//如果购物车为空，按钮应该是灰色，为false，所以判断购物车是否为空
      	if (this.cartList.length === 0) return false
        //判断是否有未选中的物品,如果有，小的括号内为true，大的括号内为false，长度为0取反则为true，不为0取反则是false

        //1：使用filter
      	return !(this.cartList.filter(item => !item.checked).length)
        //2：使用find
		    // return this.cartList.find(item => item.checked === false) === undefined;
        //3：使用for循环
        // for (let item of this.cartList) {
        // 	if (!item.checked) {
		    //     return false
        //   }
        // }
		    // return true
      }
    },
    methods: {
	    checkClick() {
	    	//isSelectAll为false或是true。当isSelectAll为false的时候，意味着有未选中的商品，当isSelectAll为true时，商品全部为选中状态
	    	if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false )
        }else {
			    this.cartList.forEach(item => item.checked = true )
        }
	    },
	    calcClick() {
	    	this.message = '你已付款' + this.totalprice
        this.isToastShow = true

        setTimeout(() => {
        	this.isToastShow = false
        },2000)
      }
    }
	}
</script>
x`
<style scoped>
  .BottomBar {
    height: 50px;
    background-color: #eee;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 50px;
  }
  .left {
    margin-top: 12px;
    display: flex;
  }
  .select{
    font-size:13px;
    margin-left: 6px;
    margin-top: 6px;
  }
  .check-botton {
    margin-top: 3px;
    margin-left: 10px;
  }
  .totalPrice {
    margin-top: 4px;
    margin-left: 15px;
    width: 120px;
  }
  .calculate {
    background-color: orangered;
    position: relative;
    color: #fff;
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 48px;
    float: right;
  }
</style>