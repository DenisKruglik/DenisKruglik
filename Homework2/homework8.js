var a=new Date();
function MinutesLeft(x){
	return (86400000-x.getHours()*60*60*1000-x.getMinutes()*60*1000-x.getSeconds()*1000-x.getMilliseconds())/60000;
}
alert(MinutesLeft(a));