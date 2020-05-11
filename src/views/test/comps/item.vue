<template>
  <div>
    <h2>{{msg}}</h2>
    <h2 v-for="(item,i) in abc">{{i}} + {{item}}</h2>
  </div>
</template>

<script>
	export default {
		name: "item",
    props: {
			msg: String,
      abc: Array
    }
	}
</script>

<style scoped>

</style>