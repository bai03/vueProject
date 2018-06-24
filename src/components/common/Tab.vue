<template>
<div id="nav">
	<router-link 
		v-for="item in tabslist" 
		:to="item.name"
		class="tabs"
		:key="item.name">
		<i class="iconfont" :class="item.icon" ></i>
		<span>{{item.title}}</span>
	</router-link>
</div>
</template>

<script>
export default {
	data(){
		return {
			tabslist:[
				{name:"home",title:"首页",icon:"icon-ele"},
				{name:"discover",title:"发现",icon:"icon-faxian"},
				{name:"order",title:"订单",icon:"icon-icondd1"},
				{name:"mine",title:"我的",icon:"icon-mine"}
				]
		}
	}
}
</script>

<style scoped>
#nav{
	width: 100%;
	height: 49px;
	position: absolute;
	bottom: 0;
	left: 0;
	display: flex;
	background: #fff;
}
#nav:before{
	content: "";
	display: block;
	height: 1px;
	border-top: 1px solid #000;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	transform: scaleY(0.5);
	transform-origin: top;
}
.tabs{
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 12px;
	justify-content: center
}
.tabs .iconfont{
	font-size: 16px;
}
.tab span{
	font-size: 12px;
	margin-top: 2px;
}
.router-link-active{
	background:blue;
}
</style>