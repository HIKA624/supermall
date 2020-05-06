<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button @checkBtnClick="checkClick" v-model="itemInfo.checked"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="delete" @click="deleteItem(itemInfo.iid)">删除商品</div>
        <button class="minus" @click="minus">-</button>
        <div class="item-count right">x{{itemInfo.count}}</div>
        <button class="plus" @click="plus">+</button>
      </div>
      <toast :message="message" :isToastShow="isToastShow"></toast>
    </div>
  </div>
</template>

<script>
	import CheckButton from './CheckBotton'
	import Toast from  'components/common/toast/Toast'


	export default {
		name: "CartListItem",
    data() {
			return {
				message: '',
				isToastShow: false
      }
    },
    props:{
			itemInfo:{
				type:Object,
        default() {
					return {}
        }
      }
    },
		components: {
			CheckButton,
			Toast
		},
    methods: {
	    checkClick() {
		    this.itemInfo.checked = !this.itemInfo.checked;
		    console.log('---');
	    },
	    deleteItem(id) {
	    	this.$store.commit('delCartListData',id)
	    },
	    plus() {
	    	this.itemInfo.count ++
      },
	    minus() {
	    	if(this.itemInfo.count < 2) {
	    		this.isToastShow = true
          this.message = '商品数量不能再减少了哦'

			    setTimeout(() => {
				    this.isToastShow = false
				    this.message = ''
			    },2000)
        }else{
	    		this.itemInfo.count --
        }
      }
    }
	}
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .info-bottom {
    display: flex;
    justify-content: space-between;
  }

  .delete {
    /*border: 1px solid var(--color-tint);*/
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  .plus {
    margin-right: 15px;
    float: right;
    background-color: #fff;
    border: 2px solid var(--color-tint);
    width: 20px;
    height: 20px;
  }

  .minus {
    margin-left: 15px;
    background-color: #fff;
    border: 2px solid var(--color-tint);
    float: right;
    width: 20px;
    height: 20px;
  }
</style>