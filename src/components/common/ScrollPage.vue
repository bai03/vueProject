<template>
	<div :id="id" class="page" ref="page">
		<div class="scrollContent">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		id:String
	},
	mounted(){
		var scrollDom = this.$refs.page;
		this.mayScroll = new IScroll(scrollDom,{
			click:true,
			tap:true,
			probeType:3
		});
		this.mayScroll.on("beforeScrollStart",function(){
			this.refresh();
		})
	}
}
</script>

<style scoped>
	.page{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		overflow: hidden;
	}
	
</style>