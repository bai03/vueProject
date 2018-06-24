import axios from 'axios';
export function getaddress(info){
	return new Promise((resolve, reject)=>{
		axios.get('/restapi/bgs/poi/search_poi_nearby',{
			params:{
				keyword:info,
				offset:0,
				limit:40
			}
		})
		.then(response=>{
//			console.log(response);
			var data = response.data;
			var arr = data.map((val)=>{
				return {
//					address:val.address,
					address:val.name,
					latitude:val.latitude,
					longitude:val.longitude
				}
			})
			resolve(arr);
//			console.log(arr);
		})
		.catch(error=>{
			console.log(error)
		})
	})
}
