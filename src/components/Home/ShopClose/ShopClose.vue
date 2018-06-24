<template>
<div id="shopclose">
	<div class="header">
		<span @click="goback"><</span>
		<p>确认订单</p>
	</div>
	<detialscroll>
		<ul>
			<li v-for="(item,index) in shopcar" class="lilist">
				<span>名称：{{item.name}}</span>
				<img :src="item.image_path" alt="" />
				<span>数量：{{item.num}}</span>
			</li>
		</ul>
	</detialscroll>
</div>
</template>

<script>
import Vuex from 'vuex';
import detialscroll from '../Detial/detialscroll.vue'
export default {
	components:{
		detialscroll,
	},
	data(){
		return {
			shopcar:this.$store.state.shopStore.shoplist
		}
	},
	computed:{
		...Vuex.mapState({
//			shopcar:state=>state.shopStore.aaa,
		}),
		
	},
	mounted(){
		console.log(this.$store.state.shopStore.shoplist)
	},
	methods:{
		goback(){
			this.$router.back();
		}
	}
}
</script>

<style scoped>
	#shopclose{
		position: absolute;
		width: 100%;
		top: 0;
		bottom: -49px;
		left: 0;
		background: #ccc;
		z-index: 14;
	}
	.lilist{
		height: 40px;
		display: flex;
		line-height: 40px;
	}
	.lilist img{
		width: 30px;
		
	}
</style>