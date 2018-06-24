<template>
	<div id="address">
		<div class="header">
			<div class="back" @click.stop="goback"><</div>
			<p class="titles">选择收货地址</p>
		</div>
		<div class="wrap">
			<detialscroll>
				<div>
					<div class="search">
						 <input type="text" v-model="addressdata" placeholder="请输入地址" class="input_address" @change="getAddress"/>
					</div>
					<ul>
						<li v-for="(item,index) in data" class="liList" @click.stop="giveAddress(index)" :key="index">{{item.address}}</li>
					</ul>
				</div>
			</detialscroll>
		</div>
	</div>
</template>

<script>
import Vuex from 'vuex';
import {getaddress} from "../../../../server/home/addressServer.js";
import detialscroll from "../Detial/detialscroll.vue"
export default {
	components:{
		detialscroll,
	},
	data(){
		return{
			addressdata:'',
			data:[],
		}
	},
	computed:{
		//获取全局参数：经纬度，地址
		...Vuex.mapState(['latitude','langitude','address'])
	},
	methods:{
		//获取全局参数修改方法：修改经纬度和地址
		...Vuex.mapActions(['changeAddress']),
		//手动返回
		goback(){
			this.$router.back();
		},
		//输入地址请求地址
		getAddress(){
			console.log(22222);
			getaddress(this.addressdata)
			.then(result=>{
				this.data = result;
			});
		},
		giveAddress(index){
			this.changeAddress(this.data[index]);
			this.$router.back();
		}
	},
	created(){
		
	},
	
}
</script>

<style>
	#address{
		width: 100%;
		position: absolute;
		bottom: -49px;
		top: 0;
		left:0;	
		z-index: 15;
		background: #fff;
		display: flex;
		flex-direction: column;
	}
	.header{
		height: 44px;
		background: #00AAFF;
		line-height: 44px;
		text-align: center;
		color: #fff;
		position: relative;
	}
	.titles{
		width: 100%;
		height: 100%;
		line-height: 44px;
		
	}
	.back{
		position: absolute;
		font-size: 30px;
		height:44px;
		line-height: 44px;
		left: 12px;
	}
	.search{
		height: 50px;
		background: #ccc;
		position: relative;
	}
	.input_address{
		display: block;
		width: 85%;
		height: 30px;
		line-height: 30px;
		border-radius: 2px;
		background: #fff;
		outline: none;
		border: 0;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
	}
	.liList{
		height: 25px;
		line-height: 25px;
		border-bottom: 1px solid #ccc;
	}
	.wrap{
		flex: 1;
		overflow: hidden;
	}
</style>