var state = {
	shoplist:[],
	aaa:5,
	
};
var getters = {
	allNum(moduleState){
		var num = 0;
		for(var i=0;i<moduleState.shoplist.length;i++){
			num += moduleState.shoplist[i].num;
		}
		return num ;
	},
	allprice(moduleState){
		var allprice = 0;
		for(var i=0;i<moduleState.shoplist.length;i++){
			allprice += moduleState.shoplist[i].num * moduleState.shoplist[i].spacefood.price;
		};
		return allprice;
	}
};

var mutations = {
	//商品添加
	addShop(state,val){
		var bstop = false;
		state.shoplist.map((result)=>{
			if(result.id == val.id){
				result = val;
				bstop = true;
			}
		});
		if(!bstop){
			state.shoplist.push(val);
		}
	},
	//商品删除
	deleteShop(state,val){
		state.shoplist.map((result,index)=>{
			if(result.id == val.id){
					if(val.num == 0){
					state.shoplist.splice(index,1);
				}else{
					result = val;
				}
			}
		})
	}
};
var actions = {
	addShopAction(context,params){
		context.commit('addShop',params)
	},
	deleteShopAction(context,params){
		context.commit('deleteShop',params)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
