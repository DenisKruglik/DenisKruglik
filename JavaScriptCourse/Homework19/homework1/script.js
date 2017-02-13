var coords=new google.maps.LatLng(53.802705, 27.832633);
var settings={
	zoom: 7,
	center: coords,
	mapTypeId: google.maps.MapTypeId.ROADMAP
}
var elem=fr.get.byId('map');
var map=new google.maps.Map(elem,settings);
var data;
var points=new Array;
fr.ajget('data.json',function(){
	if (this.readyState==4 && this.status==200) {
		data=JSON.parse(this.responseText);
	for (var i = 0; i < data.length; i++) {
		(function(i){
			var place=new google.maps.LatLng(Number(data[i].lat),Number(data[i].lon));
			var marker=new google.maps.Marker({position: place, map: map, title: data[i].title});
			var point = new google.maps.LatLng(Number(data[i].lat), Number(data[i].lon));
			points.push(point);
		})(i)
	}
	var way=new google.maps.Polyline({
		path: points,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	})
	way.setMap(map);
	}
})