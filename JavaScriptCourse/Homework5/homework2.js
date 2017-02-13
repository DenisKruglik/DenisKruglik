var s=prompt()*1,elem=document.getElementById("first"),elem2=document.getElementById("second"),elem3=document.getElementById("third"),
q=document.getElementById("q"),w=document.getElementById("w");
var i=setInterval(function(a,f=function(){
	alert("Time is out!");
}){
	if (Math.floor(s/3600)>0) {
		if (Math.floor(s/3600)>=10) {
			elem.innerText=Math.floor(s/3600);
		}else elem.innerText="0"+Math.floor(s/3600);
	}else elem.innerText="00";
	if (Math.floor((s-Number(elem.innerText)*3600)/60)>0) {
		if (Math.floor((s-Number(elem.innerText)*3600)/60)>=10) {
			elem2.innerText=Math.floor((s-Number(elem.innerText)*3600)/60);
		}else elem2.innerText="0"+Math.floor((s-Number(elem.innerText)*3600)/60);
	}else elem2.innerText="00";
	if (s-(Number(elem.innerText)*3600+Number(elem2.innerText)*60)>0) {
		if (s-(Number(elem.innerText)*3600+Number(elem2.innerText)*60)>=10) {
			elem3.innerText=s-(Number(elem.innerText)*3600+Number(elem2.innerText)*60);
		}else elem3.innerText="0"+(s-(Number(elem.innerText)*3600+Number(elem2.innerText)*60));
	}else elem3.innerText="00";
	if(q.innerText==":"){
		q.innerText=" ";
	}else q.innerText=":";
	if(w.innerText==":"){
		w.innerText=" ";
	}else w.innerText=":";
	if (s==0) {
		f();
		clearInterval(i);
	}
	s--;
},1000);