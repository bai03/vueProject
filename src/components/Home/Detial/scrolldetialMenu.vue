<template>
	<div id="menu">
		<div class="masterList">
			<detialscroll>
				<ul>
					<li v-for="(item,index) in main" v-if="item.name" class="mainlist" :key="index" @click.stop="goto(index)" :class="{bgcolor:bgindex == index}">{{item.name}}</li>
				</ul>
			</detialscroll>
		</div> 
		<div class="menuList">
			<detialscroll   ref="masterlist">
				<div>
					<ul class="foodlist" v-for="(listitem,j) in food" :key="j" ref="ullist">
						<li v-for="(item,i) in listitem.food" :key="i" class="list borderbottom" :id="item.id" @click.stop="showbig(j,i)">
							<div>
								<div class="img"><img :src="item.image_path" /></div>
								<div class="main">
									<h3>{{item.name}}</h3>
									<p>￥{{item.spacefood.price}}</p>
								</div>
								<div class="btn">
									<div v-show="item.num>0" @click.stop="numdown(j,i)">-</div>
									<p v-show="item.num>0">{{item.num}}</p>
									<div @click.stop="numup(j,i)">+</div>
								</div>
							</div>
							
						</li>
					</ul>
				</div>
			</detialscroll>
		</div>
		<div class="clickalert" v-if="isshow" >
			<div class="showdata">
				<div class="img"><img :src="food[j].food[i].image_path" /></div>
				<div class="main">
					<h3>{{food[j].food[i].name}}</h3>
					<p>￥{{food[j].food[i].spacefood.price}}</p>
				</div>
				<div class="btn">
					<div v-show="food[j].food[i].num>0" @click.stop="numdown(j,i)">-</div>
					<p v-show="food[j].food[i].num>0">{{food[j].food[i].num}}</p>
					<div @click.stop="numup(j,i)">+</div>
				</div>
				<button @click="goback">返回</button>
			</div>
		</div>
	</div>	
</template>

<script>
import detialscroll from "./detialscroll.vue";
import {getordermenu} from "../../../../server/home/detialsServer.js";
import Vuex from 'vuex';
export default {
	components:{
		detialscroll,
	},
	data(){
		return {
			y:0,
			id:null,
			main:[],
			food:[],
			num:0,
			//存储添加到购物车的商品信息数组
//			shopcar:[],
			isshow:'',
			choosedlist:null,
			i:0,
			j:0,
			gotoindex:0,
			bgindex:0,
			ullength:[],
		}
	},
	computed:{
		...Vuex.mapState({
			shopcar:state=>state.shopStore.shoplist,
		}),
		
	},
	methods:{
		...Vuex.mapActions({
			addShopAction:'shopStore/addShopAction',
			deleteShopAction:'shopStore/deleteShopAction',
		}),
		getid(idinfo){
			this.id = idinfo
		},
		//购买数量增加
		numup(j,i){ 
			
			this.food[j].food[i].num ++;
			this.addShopAction(this.food[j].food[i]);
//			var bstop = false;
//			this.shopcar.map((val)=>{
//				if(val.id == this.food[j].food[i].id){
//					val = this.food[j].food[i];
//					bstop = true;
//				}
//			});
//			if(!bstop){
//				this.shopcar.push(this.food[j].food[i]);
//			}
		},
		numdown(j,i){
//			console.log(this.shopcar);
			this.food[j].food[i].num --;
			this.deleteShopAction(this.food[j].food[i]);
//			this.shopcar.map((val,index)=>{
//				if(this.food[j].food[i].num == 0){
//					this.shopcar.splice(index,1);
//				}else{
//					val = this.food[j].food[i];
//				}
//			})
		},
		//弹出蒙框的方法
		showbig(j,i){
			this.i= i;
			this.j = j;
			this.choosedlist = this.food[j].food[i];
			this.isshow = i + '.' + j;
			console.log(this.isshow);
		},
		//朦框返回
		goback(){
			this.isshow = "";
		},
		goto(index){
			this.gotoindex = index;
			this.bgindex = index;
		}
	},
	watch:{
		id(newval,oldval){
			if(newval){
				getordermenu(this.id).then((result)=>{
					this.main = result[0];
					this.food = result[1];
					console.log(result);
					this.$nextTick(()=>{
						//获取所有分菜单列表bom
						var ullist = this.$refs.ullist;
						//获取ul各个头部相对于top的偏移量；
						console.log(ullist)
						var centerlength =0;
						for(var i=0;i<ullist.length;i++){
							var length = ullist[i].clientHeight;
							centerlength += length;
							this.ullength.push(centerlength)
						};
					})
				})
			}
		},
		shopcar:{
			handler(newval,oldval){
				this.$center.$emit("giveshopcar",newval)
			},
			deep:true,
		},
		//菜单列表跳转
		gotoindex(newval,oldval){
			if(this.gotoindex == 0){
				this.masterscroll.scrollTo(0,0,200)
			}else{
				this.masterscroll.scrollTo(0,-this.ullength[this.gotoindex -1],200)
			}
			
		}
	},
	created(){
		this.$center.$on('giveid',this.getid);
		
	},
	mounted(){
		this.masterscroll = this.$refs.masterlist.detialscroll;
		var _this = this;
		
		
		this.masterscroll.on("scroll",function(){
//			console.log(this.y);
			_this.y = this.y;
			
			_this.$center.$emit("scrolly",_this.y);
			for(var i=0;i<_this.ullength.length;i++){
				if(-this.y<=_this.ullength[i]){
					_this.bgindex = i;
					break;
				}
			}
		});
		var ullist = this.$refs.ulilist;
	},
	
}
</script>

<style scoped>
	#menu{
		height: 100%;
		width: 100%;
		position: relative;
	}
	.masterList{
		width: 35%;
		height: 100%;
		position: absolute;
		left: 0;
		overflow: hidden;
	}
	.menuList{
		width:65%;
		height: 100%;
		position: absolute;
		overflow: hidden;
		right: 0;
		font-size: 12px;
		background: #42B983;
	}
	.mainlist{
		height: 40px;
		font-size: 12px;
		line-height: 40px;
		border-bottom: 1px solid #ccc;
	}
	.img img{
		width: 60px;
	}
	.list{
		
		padding: 5px;
		position: relative;
	}
	.list>div{
		display: flex;
	}
	.list h3{
		font-weight: normal;
		font-size: 12px;
		
	}
	.btn{
		display: flex;
		position: absolute;
		right: 5px;
		top: 25px;
	}
	.btn div {
		height: 25px;
		width: 25px;
		text-align: center;
		line-height: 25px;
		border-radius: 50%;
		font-weight: bold;
		font-size: 20px;
		background: #ccc;
	}
	.btn>p{
		display: block;
		height: 25px;
		width: 20px;
		font-size: 12px;
		line-height: 25px;
	}
	.clickalert{
		background: rgba(0,0,0,0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 10;
		left: 0;
		top: 0;
	}
	.showdata{
		width: 60%;
		height: 60%;
		position: relative;
		top: 20%;
		left: 20%;
		z-index: 12;
		background: #fff;
	}
	.bgcolor{
		background: #ccc;
	}
</style>