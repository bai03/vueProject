import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import {addressServer} from "../../server/home/homeServer.js"

//引入购物车数据包组件
import shopStore from "./shopCar.js"
var state = {
	longitude:'',
	latitude:'',
	address:''
}
var getters = {
	
}
var mutations = {
	setLon(state,val){
		state.longitude = val;
		console.log(val);
	},
	setLat(state,val){
		state.latitude = val;
		console.log(val);
	},
	setAddress(state,val){
		state.address = val;
		console.log(val);
	}
}

var actions = {
	changeAddress(context,params){
		context.commit("setLon",params.longitude);
		context.commit("setLat",params.latitude);
		context.commit('setAddress',params.address)
	},
	//定位操作
	getInitialAddress(context){
		//h5定位方法
//		navigator.geolocation.getCurrentPosition((position)=>{
//			context.commit("setLon",position.coords.longtitude);
//			context.commit("setLat",position.coords.latitude);
//		});
		setTimeout(function(){
			context.commit("setLon",113.8324891526922);
			context.commit("setLat",22.626024);
			addressServer(22.626024,113.8324891526922).then(data=>{
				context.commit("setAddress",data);
			})
		},500)

		//监听地理位置变化
//		var watchID = navigator.geolation.watchPosition((position)=>{
			
//		});
		//移除监听
//		navigator.geolocation.clearWatch(watchID)
	}
}
var store  =  new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules:{
		shopStore,
	}
})

export default store;