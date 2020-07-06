module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  },
	config.module
	.rule("css")
	.test(/\.css$/)
	.oneOf("vue")
	.resourceQuery(/\?vue/)
	.use("px2rem")
	.loader("px2rem-loader")
	.options({

		remUnit: 192
	})
}