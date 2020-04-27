<template>
  <div class="toast" v-show="isToastShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
	export default {
		name: "Toast",
    props:{
			message:{
				type:String,
        default:''
      },
	    isToastShow:{
				type: Boolean,
        default: false
      }
    }
	}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 10px 10px;
    border-radius: 10%;

    transform: translate(-50%,-50%);

    color: #fff;
    background-color: rgba(0,0,0,0.6);
  }
</style>