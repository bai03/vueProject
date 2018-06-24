<template>
  <div id="app">
  		<div class="firstpage">
  				<router-view></router-view>
  		</div>
			<tab-com></tab-com>
  </div>
</template>
<script>
import Tab from "./components/common/Tab.vue"
export default {
  	components:{
  		 'tab-com':Tab,
  	}
}
</script>

<style scoped>
	.firstpage{
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 49px;
		left: 0;
	}
</style>
