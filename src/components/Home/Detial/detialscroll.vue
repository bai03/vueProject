<template>
	<div class="detialscroll" ref="detial">
		<slot></slot>
	</div>
</template>

<script>
export default {
	mounted(){
		var detial = this.$refs.detial;
		this.detialscroll = new IScroll(detial,{
			tap:true,
			click:true,
			probeType:3
		});
		this.detialscroll.on("beforeScrollStart",function(){
			this.refresh();
//			this.stopPropagation();
		})
		
	}
}
</script>

<style scoped>
.detialscroll{
	height: 100%;
	width: 100%;
	overflow: hidden;
}
</style>