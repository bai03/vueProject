<template>
	<div id="swiperloop">
		<swipercom :pagination="true" v-if="imgdatalist.length>0" >
			<swiperslide v-for="(item,index) in imgdatalist" v-once :key="index">
				<img :src="item" class="loopimg"/>
			</swiperslide>
		</swipercom>
	</div>
</template>

<script>
import swiperCom from "./swiperCom.vue"
import swiperSlide from "./swiperSlide.vue"
import {getImg} from "../../../../server/home/homeServer.js" 
export default {
	components:{
		swipercom:swiperCom,
		swiperslide:swiperSlide
	},
	data(){
		return {
			imgdatalist:[],
		}
	},
	created(){
		getImg().then(data=>{
			this.imgdatalist = data;
//			this.$nextTick().updateDom();
		});
	}
}
</script>

<style scoped>

	.loopimg{
		width: 100%;
	}
</style>