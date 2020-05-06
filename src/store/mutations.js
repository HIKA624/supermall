import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
	[ADD_COUNTER](state, payload) {
		payload.count++
	},
	[ADD_TO_CART](state,payload) {
		payload.checked = true
		state.cartList.push(payload)
	},
	delCartListData(state,id) {
		state.cartList.forEach((itemInfo,index) => {
			if(itemInfo.iid === id) {
				state.cartList.splice(index,1)
				return
			}
		})

	}
}
