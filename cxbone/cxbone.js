

function DateUtil(){
	
}
/**
 * 时间格式化
 * [formateDate description]
 * @return {[type]} [description]
 */
DateUtil.prototype.formateDate=function(m){
	var date=new Date(Math.floor(parseInt(m)*1000));
	var Y=date.getFullYear()+'-';
	var M=(date.getMonth()+1<10?'0'+(date.getMonth()+1):(date.getMonth()+1))+'-';
	var D=date.getDate()+' ';

	return Y+M+D;
}