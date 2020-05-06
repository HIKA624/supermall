import {request} from './request'


//这里请求的是首页轮播图和推荐栏的数据
export function getHomeMultidata() {
	return request ({
		url: '/home/multidata'
	})
}

//这里请求的是首页商品信息的数据
export function getHomeGoods(type,page) {
	return request({
		url:'/home/data',
		params: {
			type,
			page
		}
	})
}


