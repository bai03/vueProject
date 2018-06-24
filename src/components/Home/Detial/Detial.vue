<template>
<div class="detialwrap">
	<div class="detialbox">	
		<div class="content" ref="content" :style="{'height':domheight+'px','top':positiontop+'px'}">
			<!--<detialscroll ref="scroll">-->
				<div>
				<shopheader></shopheader>
				<shopcontent @giveindex="getindex"></shopcontent>
				</div>
			<!--</detialscroll>-->
		</div>
		<!--底部选择的信息栏-->
		<div class="footer" v-show="chooseindex == 0">
			<div class="discribe">
				满20减13，满30减19，满42减26，满60减33，满130减53
			</div>
			<span class="circle" @click="gotoclose">{{num>0?num:''}}</span>
			<div class="foot">
				<div class="pricebox">
					<span>￥{{allprice}}</span>
					<p>配送赛￥2</p>
				</div>
				<div class="balance"  v-if="martitle == '￥20起送'">
					{{martitle}}
				</div>
				<div class="balance" @click="gotoclose" v-if="martitle == '去结算'">
					{{martitle}}
				</div>
			</div>
	</div>
	</div>
</div>
</template>

<script>
import shopheader from "./shopHeader.vue"
import shopContent from "./shopContent.vue"
import {getdetialdata} from "../../../../server/home/detialsServer.js";
import Vuex from 'vuex';
export default {
	components:{
		shopheader,
		shopcontent:shopContent,
//		detialscroll
	},
	data(){
		return {
			y:0,
			id:null,
			shopcar:[],
			martitle:"￥20起送",
			chooseindex:0,
		}
	},
	computed:{
		...Vuex.mapGetters({
			num:'shopStore/allNum',
			allprice:'shopStore/allprice',
		}),
		//设置变化的dom高度
		domheight(){
			if(this.y>-172){
				return this.hh-this.y;
			}else if(this.y<-172){
				return this.hh+172;
			}
		},
		//设置变化的dom定位
		positiontop(){
			if(this.y>=-172){
				return this.y;
			}else if(this.y<-172){
				return -172;
			}
		},

	},
	watch:{
		allprice(newval,oldval){
			if(newval>20){
				this.martitle = "去结算"
			}else{
				this.martitle = "￥20起送"
			}
		}
	},
	methods:{
		//获取滚动尺寸
		getscrolly(y){
			this.y = y;
//			console.log(y);
		},
		//获取购物车信息
		getshopcar(data){
			this.shopcar = data;
		},
		//获取是哪个页面参数  
		getindex(index){
			this.chooseindex = index;
		},
		gotoclose(){
			this.$router.push({
				name:'shopclose'
			})
		}
	},
	created(){
		//获取id
		this.id = this.$route.params.id;
		console.log(this.$route.params.id);
		//获取主页面信息
		getdetialdata(this.id).then((result)=>{
//			console.log(result)
		});
		//监听购物车变化
		this.$center.$on("giveshopcar",this.getshopcar)
	},
	mounted(){
		//获取元素尺寸
		var content = this.$refs.content;
		this.hh = content.clientHeight;
		//监听子组件滚动y值得变化
		this.$center.$on("scrolly",this.getscrolly);
		this.$center.$emit("giveid",this.id);
	},
	
}
</script>

<style scoped>
	.detialwrap{
		height: 100%;
	}
	.detialbox{
		position: absolute;
		top: 0;
		width: 100%;
		bottom: -49px;
		left: 0;
		z-index: 5;
		background: #fff;
	}
	.content{
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	#detial{
		width: 100%;
		height: 100%;
	}
	.footer{
		width: 100%;
		height: 58px;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.foot{
		width: 100%;
		height: 41px;
		position: absolute;
		bottom: 0;
		left: 0;
		background: #535356;
		overflow: hidden;
	}
	.pricebox{
		width: 50px;
		margin-left: 60px;
	}
	.pricebox span{
		display: block;
		line-height: 18px;
		height: 18px;
		font-size: 12px;
		color: #fff;
		
	}
	.pricebox p{
		height: 10px;
		font-size: 10px;
		color: #fff;
	}
	.balance{
		width: 90px;
		line-height: 41px;
		color: #fff;
		font-size: 14px;
		font-weight: bold;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.circle{
		width: 40px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		position: absolute;
		left: 8px;
		bottom: 20px;
		background:radial-gradient(circle,#363636 6.266667vw,#444 0);
		z-index: 6;
		border-radius: 50%;
		color: #fff;
	}
	.discribe{
		height: 17px;
		line-height: 17px;
		font-size: 10px;
		text-align: center;
		background:#f9e8a3;
	}
	
</style>