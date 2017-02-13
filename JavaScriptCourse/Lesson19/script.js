var coords=new google.maps.LatLng(30,50);
var settings={
	zoom: 6,
	center: coords,
	mapTypeId: google.maps.MapTypeId.ROADMAP
}
var elem=fr.get.byId('map');
var map=new google.maps.Map(elem,settings);
navigator.geolocation.getCurrentPosition(function(e){
	var place=new google.maps.LatLng(e.coords.latitude,e.coords.longitude);
	var marker=new google.maps.Marker({position: place, map: map});
})
var player;
function onYouTubeIframeAPIReady(){
	player=new YT.Player("vid");
}