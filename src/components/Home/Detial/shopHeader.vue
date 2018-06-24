<template>
<div id="shopHeader">
	<div class="shopbackground">
		<img src="" alt="" />
		<img src="" class="logo"/>
	</div>
	<div class="shopmess">
		
		<div class="shopname">
			<span>品牌</span>
			<h3>台资味深圳后瑞店</h3>
			<i>></i>
		</div>
		<div class="score">
			<span>4.9</span>
			<span>月售1477单</span>
			<span>蜂鸟专送</span>
		</div>
		<p>点餐必看！亲！收餐的时候如果出现以下几种问题（漏餐，漏筷子，漏饮料，还有您点的汤撒了，饮料撒了，请您务必及时联系店长18617173728我们的会及时给你解决。选择台资味，生活更有味！）1需要辣椒米饭请备注2.饮料.小吃.汤品不单点，需要搭配便当一起配送。</p>
		<div class="discribe">
			<span></span>
			
			
		</div>
	</div>
</div>
</template>

<script>
</script>

<style scoped>
	.shopbackground{
		width: 100%;
		height: 84px;
		background: #ccc;
		position: relative;
	}
	.shopbackground img{
		width: 100%;
		height: 100%;
	}
	.shopbackground .logo{
		width: 55px;
		height: 55px;
		position: absolute;
		bottom: -20px;
		z-index: 3;
		left: 50%;
		margin-left: -27px;
	}
	.shopmess{
		height: 88px;
		width: 100%;
		padding: 26px 13px 0;
		box-sizing: border-box;
		background: #999999;
		overflow: hidden;
	}
	.shopname{
		height: 20;
		line-height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.shopname span{
		width:30px;
		height: 15px;
		background: yellow;
		font-size: 12px;
		line-height: 15px;
		text-align: center;
	}
	.shopname h3{
		font-size: 16px;
		margin-right: 5px;
	}
	.score{
		height: 12px;
		width: 100%;
		text-align: center;
		font-size: 10px;
		line-height: 12px;
		margin-top: 4px;
	}
	.shopmess p{
		width: 180px;
		margin: 4px auto;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 10px;
	}
</style>