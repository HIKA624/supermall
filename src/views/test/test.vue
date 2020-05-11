<template>
  <div>
    <item :msg="message" :abc="name"></item>
  </div>
</template>

<script>
  import item from './comps/item'

	export default {
		name: "test",
    components: {
	    item
    },
    data() {
			return {
				message:'我是msg',
        name: ['科比','乔丹','詹姆斯','姚明']
      }
    }
	}
</script>

<style scoped>

</style>