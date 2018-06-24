<template>
<div class="swiper-container" ref="container">
    <div class="swiper-wrapper">
    	<slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
</div>
</template>

<script>
export default {
	data(){
		return {
			name: 'zhangsan'
		}
	},
	props:{
		pagination:Boolean,
	},
	methods: {
		//更新轮播的方法
		updateDOM(){
			console.log('更新');
			this.swiper.update();
		}
	},
	mounted(){
		//获得轮播的dom对象
		const swiperDom = this.$refs.container;
		//创建轮播视图
		this.swiper = new Swiper(swiperDom, {
			//设置循环滚动
			loop: true,
			//分页控制器
			pagination: this.pagination?'.swiper-pagination':""
		});
	}
}
</script>