<template>
	<div id="shopcontent" ref="allcontent">
		<div class="chooselist">
			<div v-for="(item,index) in chooselist" :key="index" @click="changelist(index)"><span :class="{borderbottom:index == isshow}">{{item}}</span></div>
		</div>
		<div class="contentlist" ref="content">
			<scrolldetial-menu v-show="isshow==0"></scrolldetial-menu>
			<scrolldetial-shop v-show="isshow==1"></scrolldetial-shop>
			<scrolldetiale-valuate v-show="isshow==2"></scrolldetiale-valuate>
		</div>
	</div>
</template>

<script>
//import detialscroll from "./detialscroll.vue";
import scrolldetial_menu from "./scrolldetialMenu.vue";
import scrolldetial_shop from "./scrolldetialShop.vue";
import scrolldetiale_valuate from "./scrolldetialeValuate.vue";

export default {
	components:{
		'scrolldetial-menu':scrolldetial_menu,
		'scrolldetial-shop':scrolldetial_shop,
		'scrolldetiale-valuate':scrolldetiale_valuate
	},
	data(){
		return {
			chooselist:['菜单','评价','商家'],
			isshow:0,
		}
	},
	methods:{
		changelist(index){
			this.isshow = index;
			this.$emit('giveindex',index);
		}
	},
	mounted(){
		var hi = document.documentElement.clientHeight;
		console.log(hi);
		this.$refs.content.style.height = hi-35+"px";
		this.$refs.allcontent.style.height = hi + "px";
	}
}
</script>

<style scoped>
	#shopcontent{
		width: 100%;
		overflow: hidden;
	}
	.chooselist{
		display: flex;
		width: 100%;
		height: 35px;
		border-bottom: 1px solid #ccc;
		
	}
	.chooselist div{
		flex: 1;
		height: 35px;
		text-align: center;
	}
	.chooselist div span{
		font-size: 12px;
		line-height: 35px;
	}
	.borderbottom{
		position: relative;
	}
	.borderbottom:after{
		position: absolute;
		right: 0;
		left: 0;
		content: "";
		height: 2px;
		background: blue;
		bottom: -10px;
	}
	.contentlist{
		width: 100%;
		overflow: hidden;
	}
</style>