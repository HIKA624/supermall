module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
	    viewportWidth: 375, //视窗的宽度，对应的是设计稿的宽度
	    viewportHeight: 667,//视窗的高度，对应的是设计稿的高度
      unitPrecision: 5,//指定'px'为视窗单位值的小数位数
	    viewportUnit: 'vw',//指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore','tab-bar','tab-bar-irem'],//指定不需要转换的类
      minPixelValue:1,//小于或等于'1px'不转换成视窗单位
      mediaQuery: false  //允许在媒体查询中转换'px'
    }
  }
}


//大多数设计稿都是以iPhone6的宽度高度来指定的，由于大多数手机都是高清rtina屏幕，一个点上有两个像素，所以真实的手机屏幕是iPhone6手机尺寸750*1334大小的一半375*667
//尺寸根据不同的标准有变化
