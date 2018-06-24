<template>
<div>
	<scrollpage id="home" ref="scrollhome">
		<keep-alive>
			<address-home></address-home>
		</keep-alive>
		<search></search>
		<swiperloop></swiperloop>
		<category></category>
		<keep-alive>
			<shoplist flag="home" @homeRefresh="refreshAction" :scrollpage="myscroll" v-if="change"></shoplist>
		</keep-alive>
		
	</scrollpage>
	<keep-alive>
		<router-view></router-view>
	</keep-alive>
	<search v-if="isshow" class="searchhome"></search>
</div>
</template>

<script>
import addressHome from "../../components/Home/home/addressHome.vue"
import category from "../../components/Home/home/category.vue"
import search from "../../components/Home/home/search.vue"
import swiperloop from "../../components/Home/home/swiperloop.vue";
import shoplist from "../../components/common/shoplist.vue"
export default {
	components:{
		'address-home':addressHome,
		category,
		search,
		swiperloop,
		shoplist
	},
	data(){
		return {
			isshow:false,
			shoplistdat:[],
			myscroll:{},
			change:false
		}
	},
	methods:{
		refreshAction(){
			this.$refs.scrollhome.mayScroll.refresh();
		}
	},
	created(){
		
	},
	mounted(){
		this.myscroll = this.$refs.scrollhome.mayScroll;
//		console.log(this.myscroll);
		this.change = true;
		var _this = this;
		this.myscroll.on("scroll",function(){
			if(this.y<-40){
				_this.isshow = true
			}else{
				_this.isshow = false
			}
		});
		
	}
}
</script>

<style scoped>
	.searchhome{
		position: absolute;
		top: 0;
		left: 0;
	}
	.homefirst{
		position: absolute;
		width: 100%;
		bottom: 49px;
		left: 0;
		overflow: hidden;
	}
</style>