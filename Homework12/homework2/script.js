var res=fr.get.byId('res');
res.innerText=0;
var cont=fr.get.byId('container'),list=fr.get.byId('list'),t,m;
fr.ajget('data.json',function(){
	if (this.readyState==4 && this.status==200) {
		var data=JSON.parse(this.responseText);
		for (var i = 0; i < data.length; i++) {
			list.innerHTML+="<li><a href='#"+data[i].codename+"'>"+data[i].title+"</a></li>";
		}
	}
})
function serve(){
	var h=location.hash;
	var path;
	switch(h){
		case "#clothes":
			path=0;
			break;
		case "#tech":
			path=1;
			break;
		case "#sport":
			path=2;
			break;
		default: return;		
	}
	t=path;
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			var data=JSON.parse(this.responseText);
			m=data;
			cont.innerHTML="<h1>"+data[path].title+"</h1>\
			<img src='"+data[path].pic+"' height='200' class='h'>\
			<ol id='g'></ol>";
			var g=fr.get.byId('g');
			for (var i = 0; i < data[path].goods.length; i++) {
				g.innerHTML+="<li>\
					<div>\
					<h3>"+data[path].goods[i].name+"</h3>\
					<img src='"+data[path].goods[i].pic+"' height='200' width='210' class='s'>\
					<div class='s'>\
					<div>Стоимость: "+data[path].goods[i].price+"</div>\
					<div>Описание: "+data[path].goods[i].description+"</div>\
					<form>\
					<input type='number' class='n' min='0'><input type='button' value='Добавить в корзину' class='b'>\
					</form>\
					</div>\
					</div>\
					</li>";
			}
			var b=fr.get.byClassName('b'),n=fr.get.byClassName('n');
			for (var i = 0; i < b.length; i++) {
				(function(x){
					b[x].onclick = function(){
						fr.get.byId('res').innerText=Number(fr.get.byId('res').innerText)+Number(n[x].value)*Number(m[t].goods[x].price);
				}})(i)
			}
		}
	}
	xhr.open("GET","data.json",true);
	xhr.send();
}
window.onhashchange=serve;
serve();
