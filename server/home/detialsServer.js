import axios from 'axios';
import {changeUrl} from "../../src/tools/tools.js";
//获取详情页面主页面
export function getdetialdata(id){
	return new Promise((resolve,reject)=>{
		var url = '/restapi//shopping/restaurant/' + id;
		axios.get(url,{
			params:{
				extras:['activities','albums','license','identification','qualification'],
				terminal:'h5',
				latitude:22.626024,
				longitude:113.837884
			}
		})
		.then(response=>{
			//过滤数据
			if(response.status==200&&response.statusText == 'OK'){
				var data = response.data;
				resolve(data);
			}else{
				resolve("未接受到有效数据");
			}
			
		})
		.catch(error=>{
			console.log(error)
		})
	})
}

//获取菜单栏所有信息
export function getordermenu(id){
	return new Promise((resolve,reject)=>{
		axios.get("/restapi//shopping/v2/menu",{
			params:{
				'restaurant_id':id,
				'terminal':'h5'
			}
		})
		.then(response=>{
			//过滤数据
			console.log(response);
			var data = response.data;
			var main = data.map((val)=>{
				return {
					name:val.name,
					grey_icon_url:changeUrl(val.grey_icon_url),
					icon_url:changeUrl(val.icon_url)
				}
			});
//			console.log(main);
			var foods = data.map((val1)=>{
				return{
					food:val1.foods
				}
			})
			console.log(foods);
			var food = foods.map((result)=>{
				return {
					food:result.food.map((val2)=>{
						return {
							id:val2.item_id,
							image_path:changeUrl(val2.image_path,140,140),
							sellnum:val2.month_sales,
							name:val2.name,
							rating:val2.rating,
							spacefood:val2.specfoods[0],
							num:0,
						}
					})
				}
			});
//			console.log(food);
			var arr = [main,food];
			resolve(arr);
		})
		.catch(error=>{
			console.log(error)
		})
	})
}


//https://h5.ele.me/restapi//shopping/v2/menu?restaurant_id=1408691&terminal=h5