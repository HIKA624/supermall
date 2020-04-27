import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
	//重复添加商品时数量加1，而不是新添加一个类
	addcart(context,payload) {
		return new Promise((resolve,reject) => {
			//查找之前数组中是否有该商品
			let oldProduct = context.state.cartList.find(function (item) {
				return item.iid === payload.iid
			})

			//判断,如果有，count加一，如果没有，为新商品新增加一个count属性为1
			if(oldProduct) {
				// oldProduct.count += 1
				context.commit(ADD_COUNTER,oldProduct)
				resolve('当前商品数量+1')
			}else {
				payload.count = 1
				// context.state.cartlist.push(payload)
				context.commit(ADD_TO_CART,payload)
				resolve('添加了新的商品')
			}
		})
	}
}