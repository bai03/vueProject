<template>
	<div id="address_home">
		<p @click.stop="gotoPageAddress">{{address}}</p>
	</div>
</template>

<script>
import Vuex from 'vuex';
import {addressServer} from "../../../../server/home/homeServer.js"
export default {
	data(){
		return {
//			addressdata:''
		}
	},
	computed:{
		...Vuex.mapState(['longitude','latitude','address']),
		
		mount(){
			return this.longtitude + this.latitude;
		}
	},
	created(){
		this.getInitialAddress();
	},
	methods:{
		//导出store中action方法   开启软件初始化经纬度
		...Vuex.mapActions(['getInitialAddress']),
		//跳转到地址页面
		gotoPageAddress(){
			this.$router.push("/home/address")
		}
		
	},
	mounted(){
		
	}
}
</script>

<style scoped>
	#address_home{
		width: 100%;
		height: 40px;
		padding: 5px 10px;
		box-sizing: border-box;
		line-height: 30px;
		color: #fff;
		background: linear-gradient(90deg,#0af,#0085ff)
	}
</style>