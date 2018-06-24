<template>
	<div id="category">
		<swipercom :pagination="true" v-if="datalist.length>0" class="list"  v-once>
			<swiperslide v-for="(itemdata,i) in datalist" :key="i">
				<ul>
					<li v-for="(item,j) in itemdata">
						<img :src="item.imgurl" :key="j"/>
						<span>{{item.name}}</span>
					</li>
				</ul>
			</swiperslide>
			
		</swipercom>
	</div>
</template>

<script>
import swiperCom from "./swiperCom.vue"
import swiperSlide from "./swiperSlide.vue"
import {getlistdata} from "../../../../server/home/homeServer.js" 
export default {
	components:{
		swipercom:swiperCom,
		swiperslide:swiperSlide
	},
	data(){
		return {
			datalist:[],
		}
	},
	created(){
		getlistdata().then(data=>{
			this.datalist = data;
//			console.log(this.datalist);
		});
	}
}
</script>

<style scoped>
	#category{
		width: 100%;
		height: 150px;
	}
	#category .list li{
		width: 20%;
		height: 50%;
		float: left;
	}
	#category .list li img{
		width: 50%;
	}
	#category .list li span{
		font-size: 12px;
	}
</style>