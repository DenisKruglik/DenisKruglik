// var xhr=new XMLHttpRequest();
// xhr.onreadystatechange=function(){
// 	console.log(this.readyState, this.status,this.responseText);
// 	if (this.readyState==4) {
// 		document.body.innerHTML+=this.responseText;
// 	}	
// }
// xhr.open("GET","fr.html",true);
// xhr.send();


// var xhr=new XMLHttpRequest();
// xhr.onreadystatechange=function(){
// 	console.log(this.readyState, this.status,this.responseText);
// 	if (this.readyState==4) {
// 		document.body.innerHTML+=this.responseText;
// 		var b=get.byId('hel'),t=get.byId('t');
// 		fr.event("click",b,function(){
// 		alert(t.value);
// 	})	
// }}
// var a=get.byId('cl');
// xhr.open("GET","fr.html",true);
// fr.event("click",a,function(){
// 	xhr.send();
// })


function serve(){
	var h=location.hash;
	var path="";
	switch(h){
		case "#goods":
			path="goods.html";
			break;
		case "#info":
			path="info.html";
			break;
		default: return;		
	}
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			document.getElementById('container').innerHTML=this.responseText;
		}
	}
	xhr.open("GET",path,true);
	xhr.send();
}
window.onhashchange=serve;
serve();
