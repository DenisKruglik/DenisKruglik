var c=fr.get.byId('container');
fr.ajget('data.json',function(){
	if (this.readyState==4 && this.status==200) {
		var data=JSON.parse(this.responseText);
		for (var i = 0; i < data.length; i++) {
			c.innerHTML+="<div>\
			<h1>"+data[i].name+"</h1>\
			<img width='300' src='"+data[i].pic+"'><br>\
			<div>Цвет повязки: "+data[i].mcolor+"</div>\
			<div>Оружие: "+data[i].weapon+"</div>\
			</div>";
		}
	}
})