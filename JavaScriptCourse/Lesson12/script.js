var bucket=new Array;
var am=fr.get.byId('am');
var buck=fr.get.byId('buck');
fr.ajget("goods.json",function(){
	if (this.readyState==4 && this.status==200) {
		var goods=JSON.parse(this.responseText);
		console.log(goods);
		for (var i = 0; i < goods.length; i++) {
			fr.get.byId('list').innerHTML+="<ul>\
				<h1>"+goods[i].title+"</h1>\
				<li> Цена: "+goods[i].price+"</li>\
				<li> Описание: "+goods[i].description+"</li>\
				<li><img src="+goods[i].img+" width='300'></li>\
				<li><input type='button' value='Добавить в корзину'></li>\
				</ul>";
		}
		var b=fr.get.byTagName('input');
		for (var i = 0; i < b.length; i++) {
			fr.event("click",b[i],function(){
				bucket.push(goods[i]);
				am.innerText=Number(am.innerText)+1;
				buck.innerHTML+=goods[i].title+"<br>";

			});
		}
	}	
})
