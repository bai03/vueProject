<template>
<div>
<ul id="shoplist">
	<li v-for="(listitem,index) in shoplist" :key="index" class="list borderbottom"  @click="gotodetialPage(listitem.id)">
		<div class="img"><img :src="listitem.imgpath" /></div>
		<div class="main">
			<h3>{{listitem.name}}</h3>
			<ul class="ullist">
				<button class="act" @click.stop="spreadAction(index)" v-if="listitem.activities.length>2">
					{{listitem.activities.length}}个活动  
					<em  :class="{spread:listitem.spread}"></em>
				</button>
				<li v-for="(item,j) in listitem.activities" :key="j" v-if="j<2 || listitem.spread">
					<span class="diff" :style="{background:'#'+ item.color}">{{item.icon_name}}</span>
					<span>{{item.name}}</span>
				</li>
			</ul>
		</div>
	</li>
	<div class="down">
		<img :src="'../../../static/images/'+downimg" :class="{show:isshow}"/><span>正在刷新。。。</span>
	</div>
</ul>
<!--<router-view></router-view>-->
</div>
</template>

<script>
import Vuex from 'vuex'
import {getshoplist} from "../../../server/home/homeServer.js"
export default {
	data(){
		return{
			shoplist:[],
			isshow:false,
			downimg:"arrow.png"
		}
	},
	computed:{
		//导出store数据
		...Vuex.mapState(['latitude','longitude']),
		offset(){
			return this.shoplist.length;
		},
		//监控数据变化
		mount(){
			return this.latitude + this.longitude;
		}
	},
	//监控经纬度变化，变化则请求数据
	watch:{
		mount(){
			if(this.flag == "home"){
				this.shoplist = [];
				getshoplist(this.latitude,this.longitude,this.offset,15).then((result)=>{
					this.shoplist = this.shoplist.concat(result);
				});
			}
		}
	},
	props:{
		flag:String,
		scrollpage:Object
	},
	methods:{
		spreadAction(index){
			this.shoplist[index].spread = !this.shoplist[index].spread;
			this.$nextTick(()=>{
				this.$emit("homeRefresh");
			})
			
		},
		gotodetialPage(id){
			this.$router.push({
				name:"detial",
				params:{
					id:id
				}
			})
		}
	},
	created(){
		if(this.flag == "home"){
			getshoplist(this.latitude,this.longitude,this.offset,15).then((result)=>{
//				console.log(result)
				this.shoplist = this.shoplist.concat(result);
			});
		}
	},
	mounted(){
		var _this = this;
//		console.log(this.scrollpage);
		this.scrollpage.on("scroll",function(){
			_this.downimg = 'arrow.png';
			var y = this.y;
			var maxY = this.maxScrollY;
//			console.log(y);
			if(y<maxY){
				_this.isshow = true;
			}
			else{
				_this.isshow = false;
			}
		});
		this.scrollpage.on("scrollEnd",function(){
			var y = this.y;
			var maxy = this.maxScrollY;
			if(y>maxy && y<maxy+40){
				this.scrollTo(0,maxy+40,200)
			}
			else if(y<=maxy){
				_this.downimg = 'ajax-loader.gif';
				getshoplist(_this.latitude,_this.longitude,_this.offset,15).then((result)=>{
					console.log(result)
					_this.shoplist = _this.shoplist.concat(result);
				});
			}
		})
	}
}
</script>

<style scoped>
	#shoplist{
		width: 100%;
	}
	.list{
		width: 100%;
		display: flex;
		margin-bottom: 4px;
	}
	.list span{
		font-size: 12px;
	}
	.list h3{
		font-size: 14px;
	}
	.img img{
		width: 80px;
		padding: 5px;
		box-sizing: border-box;
		margin: 0;
	}
	.diff{
		padding: 2px;
		border-radius: 2px;
		color: #fff;
	}
	.borderbottom{
		position: relative;
	}
	.borderbottom::after{
		position: absolute;
		content: '';
		display: block;
		height: 1px;
		border-bottom: 1px solid #999;
		width: 100%;
		bottom: -2px;
		left: 0;
		transform: scaleY(0.5);
	}
	.ullist{
		position: relative;
	}
	.act{
		position: absolute;
		right: 5px;
		top: 3px;
		font-size: 12px;
	}
	.act em{
		display: inline-block;
		width: 0;
		height: 0;
		border-top: 4px solid #000;
		border-right: 4px solid transparent;
		border-bottom: 4px solid transparent;
		border-left: 4px solid transparent;
		transition: transform 200ms;
	}
	.act em.spread{
		transform: rotate(180deg);
	}
	.down{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.down img{
		display: inline-block;
		width: 20px;
		vertical-align: -3px;
		transition: transform 200ms;
	}
	.down img.show{
		transform: rotate(180deg);
	}
	.main{
		flex: 1;
	}
</style>