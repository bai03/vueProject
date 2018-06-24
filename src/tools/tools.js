export function changeUrl(str,width,height){
	if(str){
		var newstr = "http://fuss10.elemecdn.com/";
		//判断地址字符串后缀
//		console.log(str);
		if(str.endsWith("jpeg")){
			newstr += str +".jpeg?imageMogr/format/webp/"
		}else if(str.endsWith("png")){
			newstr += str +".png?imageMogr/format/webp/"
		};
		
		//判断图片是否需要剪切
		if(height||width){
			newstr += `thumbnail/!${width}x${height}r/gravity/Center/crop/${width}x${height}/`
		}
		return newstr;
	}
	else{
		return "";
	}
}
