import axios from 'axios';
//引入图片地址字符串处理函数
import {changeUrl} from "../../src/tools/tools.js";
//请求地址信息
export function addressServer(info1,info2){
	console.log(info1,info2);
	return new Promise((resolve,reject)=>{
		axios.get("/restapi/bgs/poi/reverse_geo_coding",{
				params:{
					latitude:info1,
					longitude:info2
				}
			})
			.then(response=>{
				var data = response.data.name;
				resolve(data);
			})
			.catch(error=>{
				console.log(error);
			})
	})
}
//请求banner图片信息
export function getImg(){
	return new Promise((resolve,reject)=>{
		axios.get("/restapi/shopping/v2/entries",{
			params:{
				latitude:22.626024,
				longitude:113.837884,
				templates: ['big_sale_promotion_template']
			}
		})
		.then(response=>{
			var arr = [];
			if(response.status == 200 && response.statusText == "OK"){
				for(var i=0;i<response.data[0].entries.length;i++){
					var str = response.data[0].entries[i].image_hash;
					var newstr = changeUrl(str);
					arr.push(newstr);
				}
			};
			resolve(arr)
		})
	})
};
//请求分类列表信息
export function getlistdata(){
	return new Promise((resolve,reject)=>{
		axios.get("/restapi/shopping/openapi/entries",{
			params:{
				latitude:22.626024,
				longitude:113.837884,
				templates:['main_template','favourable_template','svip_template']
			}
		})
		.then(response=>{
			if(response.status == 200 && response.statusText == "OK"){
				var arr = response.data[0].entries.map((val)=>{
					return {
						name:val.name,
						id:val.id,
						imgurl:changeUrl(val.image_hash,90,90)
					}
				});
				var newarr = [];
				while(arr.length>0){
					var data = arr.splice(0,10);
					newarr.push(data);
				};
				resolve(newarr);
			}
		})
		.catch(error=>{
			console.log(error);
		})
	})
}
//请求推荐商家信息
export function getshoplist(latitude,longitude,offset,limit){
	return new Promise((resolve,reject)=>{
		axios.get("/restapi/shopping/v3/restaurants",{
			params:{
				latitude:latitude,
				longitude:longitude,
				offset:offset,
				limit:limit,
				extras:['activities','tags','home'],
				terminal:'h5'
			}
		})
		.then(response=>{
			var arr = response.data.items.map((val)=>{
				return {
					id:val.restaurant.id,
					imgpath:changeUrl(val.restaurant.image_path,130,130),
					name:val.restaurant.name,
					num:val.restaurant.recent_order_num,
					spread:false,
					activities:val.restaurant.activities.map((result)=>{
						return {
							name:result.description,
							color:result.icon_color,
							icon_name:result.icon_name,
							id:result.id
						}
					})
				}
			});
			resolve(arr);
		})
		.catch(error=>{
			console.log(error)
		})
	})
}
