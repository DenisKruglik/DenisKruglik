// var elem=document.getElementById("first");
// console.log(elem);
// console.log(elem.innerHTML);
// console.log(elem.innerText);

var elem=document.getElementById("first"),elem2=document.getElementById("second"),elem3=document.getElementById("third"),a,b,c,q=document.getElementById("q"),w=document.getElementById("w");
setInterval(function(){
	a=new Date();
	elem3.innerText=a.getSeconds();
	if(Number(elem3.innerText)<10){
		elem3.innerText="0"+elem3.innerText;
	}
	b=new Date();
	elem2.innerText=b.getMinutes();
	if(Number(elem2.innerText)<10){
		elem2.innerText="0"+elem2.innerText;
	}
	c=new Date();
	elem.innerText=c.getHours();
	if(Number(elem.innerText)<10){
		elem.innerText="0"+elem.innerText;
	}
	if(q.innerText==":"){
	q.innerText=" ";
	}else q.innerText=":";
	if(w.innerText==":"){
	w.innerText=" ";
	}else w.innerText=":";
},1000);	//часы