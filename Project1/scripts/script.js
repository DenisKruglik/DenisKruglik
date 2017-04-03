var App = {
	init:function(){
		App.prepareLocalStorage();
		App.initMap();
		App.addBackButton();
		App.initInfoWindow();
		if (App.glVar.currentLocation == 'country') {
			App.loadCityMarkers();
		}else{
			App.loadPlaceMarkers(App.glVar.currentLocation);
		}
		App.setRouteCleaningEventListener();
		App.setSigninEventListener();
		App.setRegistrationEventListener();
		App.setSigninMenuClosingEventListener();
		App.setRegistrationMenuClosingEventListener();
		App.preventOverlayClosing();
	},
	glVar:{
		infowindow: "",
		max_rating: 5,
		rating: 0,
		citiesRoutePoints: [],
		placesRoutePoints: [[],[],[],[],[],[]],
		currentLocation: "country"
	},
	prepareLocalStorage: function(){
		if (typeof window.localStorage.citiesRoutePoints == 'undefined') {
			window.localStorage.citiesRoutePoints = '[]';
		}else{
			App.glVar.citiesRoutePoints = JSON.parse(window.localStorage.citiesRoutePoints);
		}

		if (typeof window.localStorage.placesRoutePoints == 'undefined') {
			window.localStorage.placesRoutePoints = '[[],[],[],[],[],[]]';
		}else{
			App.glVar.placesRoutePoints = JSON.parse(window.localStorage.placesRoutePoints);
		}

		if (typeof window.localStorage.currentLocation == 'undefined') {
			window.localStorage.currentLocation = 'country';
		}else if (window.localStorage.currentLocation != 'country') {
			App.glVar.currentLocation = JSON.parse(window.localStorage.currentLocation);
		}
	},
	initMap:function(){
		map = new GMaps({
			div: '#map',
			zoom: App.glVar.currentLocation == 'country' ? 7 : 12,
			lat: App.glVar.currentLocation == 'country' ? 53.9 : App.glVar.currentLocation.lat,
			lng: App.glVar.currentLocation == 'country' ? 27.559 : App.glVar.currentLocation.lng,
			disableDoubleClickZoom: true,
			draggable: false,
			keyboardShortcuts: false,
			scrollwheel: false,
			disableDefaultUI: true,
			noClear: true,
			tilesloaded: App.doOnTilesLoaded
		});
	},
	doOnTilesLoaded: function(){
		if (App.glVar.currentLocation == "country") {
			App.buildRoute(App.glVar.citiesRoutePoints);
			App.clearRouteList();
			App.fillRouteList(App.glVar.citiesRoutePoints);
		}else{
			App.buildRoute(App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1]);
			App.clearRouteList();
			App.fillRouteList(App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1]);
			$('#back').show();
			$('#back').css('font-size','36px');
		}
	},
	fillRouteList: function(x){
		x.forEach(function(item){
			$('.routePoints').append($('<i class="fa fa-long-arrow-down" aria-hidden="true"></i><li>'+item.name+'</li>'));
			if (App.glVar.currentLocation == 'country') {
				$('.routePoints li:last-child').click(function(){
					App.goToPlace(item);
				})
			}
		});
		if (App.glVar.currentLocation == 'country') {
			$('.routePoints li').addClass('city-reference');
		}
	},
	addBackButton:function(){
		map.addControl({
			content: "Назад",
			id: "back",
			position: "LEFT_TOP",
			events: {
				click: App.goBack
			}
		});
	},
	goBack: function(){
		map.setCenter({
			lat: 53.9,
			lng: 27.559
		});
		map.setZoom(7);
		map.removeMarkers();
		$('#back').fadeOut(500);
		App.loadCityMarkers();
		map.cleanRoute();
		App.glVar.currentLocation = "country";
		window.localStorage.currentLocation = 'country';
		App.clearRouteList();
	},
	initInfoWindow:function(x){
		var infowindow = new google.maps.InfoWindow({
			content: ""
		});
		App.glVar.infowindow = infowindow;
	},
	callCityInfoWindow:function(x,marker){
		var content="<div id='info'>\
			<h1>"+x.name+"</h1>\
			<figure>\
				<img src='"+x.pic+"'></img>\
				<figcaption>"+x.description+"</figcaption><br>\
				<span>Интересных мест: "+x.places+"</span><br>\
				<span>Посетителей: "+x.visitors+"</span>\
			</figure>\
			<div class='buttons'>\
				<input type='button' id='gotoplace' value='Перейти к месту'>\
				<input type='button' id='setA' value='Добавить к маршруту'></input>\
			</div>\
		</div>";
		App.glVar.infowindow.setContent(content);
		App.glVar.infowindow.open(map,marker);
		App.setCitiesControlsEventListeners(x);
	},
	setCitiesControlsEventListeners: function(x){
		$('#gotoplace').click(function(){
			App.goToPlace(x);
		});
		$('#setA').click(function(){
			App.addCitiesRoutePoint(x);
			App.glVar.infowindow.close();
		});
	},
	addCitiesRoutePoint: function(x){
		var last = App.glVar.citiesRoutePoints.length - 1;
		if (typeof App.glVar.citiesRoutePoints[last] != 'undefined') {
			if (App.glVar.citiesRoutePoints[last].name != x.name) {
				App.glVar.citiesRoutePoints.push(x);
				App.rememberCityInfo(x);
				App.buildRoute(App.glVar.citiesRoutePoints);
				App.clearRouteList();
				App.fillRouteList(App.glVar.citiesRoutePoints);
			}
		}else{
			App.glVar.citiesRoutePoints.push(x);
			App.rememberCityInfo(x);
			App.buildRoute(App.glVar.citiesRoutePoints);
			App.clearRouteList();
			App.fillRouteList(App.glVar.citiesRoutePoints);
		}
	},
	goToPlace: function(x){
		map.setCenter({
			lat: Number(x.lat),
			lng: Number(x.lng)
		});
		map.setZoom(12);
		$('#back').fadeIn(500);
		$('#back').css('font-size','36px');
		map.removeMarkers();
		map.cleanRoute();
		App.loadPlaceMarkers(x);
		App.clearRouteList();
		App.glVar.currentLocation = x;
		window.localStorage.currentLocation = JSON.stringify(x);
	},
	callPlaceInfoWindow:function(x,marker){
		var star="";
		for (var i = 0; i < App.glVar.max_rating; i++) {
			star+="<img class='star toselect' id='rate_button"+(i+1)+"' src='images/star_unselected.png'>"
		}
		var content="<div id='info'>\
			<div class='bio'>\
				<h1>"+x.name+"</h1>\
				<figure>\
					<img src='"+x.pic+"'>\
					<figcaption>"+x.description+"</figcaption><br>\
					<div class='avgMark'><img src='images/star.png'><span>"+x.mark+"</span></div>\
				</figure>\
				<div class='buttons'>\
					<input type='button' class='show_comments' value='Показать отзывы ("+x.comments+")'></input>\
					<input type='button' class='hide_comments' value='Скрыть отзывы'></input>\
					<input type='button' id='setStart' value='Добавить к маршруту'></input>\
				</div>\
			</div>\
			<div class='comments'><hr></div>\
			<div class='leave_comment'>\
				<img class='avatar' src='images/User-icon.png'>\
				<span class='name'>Guest</span>\
				<div class='rating'>"+star+"</div>\
				<textarea id='comment_input' placeholder='Оставить комментарий...'></textarea>\
				<input type='button' id='send_comment' value='Отправить'></input>\
			</div>\
		</div>";
		App.glVar.infowindow.setContent(content);
		App.glVar.infowindow.open(map,marker);
		App.setPlacesControlsEventListeners(x);
	},
	setPlacesControlsEventListeners:function(x){
		$('#info .show_comments').click(function(){
			App.showComments(x);
		});
		$('#info .hide_comments').click(App.hideComments);
		$('#send_comment').click(App.sendComment);
		$('#setStart').click(function(){
			App.addPlacesRoutePoint(x);
			App.glVar.infowindow.close();
		});
	},
	showComments: function(x){
		App.loadComments(x);
		App.setStarsEventListeners();
		$('#info .show_comments').hide();
		$('#info .hide_comments').show();
		$('#info div.leave_comment').show();
	},
	hideComments: function(){
		$('div.comments').html('<hr>');
		$('#info .show_comments').show();
		$('#info .hide_comments').hide();
		$('#info div.leave_comment').hide();
	},
	sendComment: function(){
		App.addComment(App.glVar.rating,$('#comment_input').val());
		$('#comment_input').val("");
		App.glVar.rating=0;
		App.setAllBlack();
	},
	addPlacesRoutePoint: function(x){
		var last = App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1].length - 1;
		if (typeof App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1][last] != 'undefined') {
			if (App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1][last].name != x.name) {
				App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1].push(x);
				App.rememberPlaceInfo(x);
				App.buildRoute(App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1]);
				App.clearRouteList();
				App.fillRouteList(App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1]);
			}
		}else{
			App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1].push(x);
			App.rememberPlaceInfo(x);
			App.buildRoute(App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1]);
			App.clearRouteList();
			App.fillRouteList(App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1]);
		}
	},
	setStarsEventListeners:function(){
		$('.toselect').click(function(){
			App.doOnStarClick(this);
		});
		$('.toselect').mouseover(function(){
			App.doOnMouseOverStars(this);
		});
		$('.toselect').mouseout(function(){
			App.setBlack(this);
		});
	},
	doOnStarClick: function(x){
		App.setAllBlack();
		App.glVar.rating=Number(x.getAttribute('id')[11]);
		var k=x.getAttribute('id')[11];
		for (var j = 0; j < k; j++) {
			$('#rate_button'+(j+1))[0].src="images/star.png";
			$('#rate_button'+(j+1)).off('mouseout',App.setBlack);
		}
		App.setBlack(x);
	},
	doOnMouseOverStars: function(x){
		var k=x.getAttribute('id')[11];
		for (var j = 0; j < k; j++) {
			$('#rate_button'+(j+1))[0].src="images/star.png";
		}
	},
	setBlack:function(el){
		var k=el.getAttribute('id')[11];
		for (var j = App.glVar.rating; j < k; j++) {
			$('#rate_button'+(j+1))[0].src="images/star_unselected.png";
		}
	},
	setAllBlack:function(){
		for (var j = 0; j < App.glVar.max_rating; j++) {
			$('#rate_button'+(j+1))[0].src="images/star_unselected.png";
		}
	},
	addComment:function(rating,text){
		var star="";
		for (var j = 0; j < rating ; j++) {
			star+="<img class='star' src='images/star.png'>";
		}
		var comment="<div class='comment'>\
			<img class='avatar' src='images/User-icon.png'>\
			<figure>\
				<span class='name'>Guest</span>\
				<div class='rating'>"+star+"</div>\
				<p class='comment_text'>"+text+"</p>\
			</figure>\
		</div><hr>";
		$(comment).appendTo("#info div.comments");
	},
	loadComments:function(x){
		$.getJSON('data/'+x.id+'.json',function(d){
			$.each(d,function(i){
				var star="";
				for (var j = 0; j < Number(d[i].rating); j++) {
					star+="<img class='star' src='images/star.png'>";
				}
				var comment="<div class='comment'>\
					<img class='avatar' src='"+d[i].pic+"'>\
					<figure>\
						<span class='name'>"+d[i].name+"</span>\
						<div class='rating'>"+star+"</div>\
						<p class='comment_text'>"+d[i].text+"</p>\
					</figure>\
				</div><hr>";
				$(comment).appendTo("#info div.comments");
			})
		})
	},
	loadCityMarkers:function(){
		$.getJSON('data/cities.json',function(d){
			$.each(d,function(i){
				map.addMarker({
					lat: Number(d[i].lat),
					lng: Number(d[i].lng),
					click: function(){
						App.callCityInfoWindow(d[i],this);
					},
					icon: "images/icon.png",
					animation: google.maps.Animation.DROP
				})
			})
		})
	},
	loadPlaceMarkers:function(x){
		$.getJSON('data/'+x.id+'.json',function(d){
			$.each(d,function(i){
				map.addMarker({
					lat: Number(d[i].lat),
					lng: Number(d[i].lng),
					click: function(){
						App.callPlaceInfoWindow(d[i],this);
					},
					icon: App.customMarker(d[i].mark),
					animation: google.maps.Animation.DROP
				})
			})
		})
	},
	customMarker:function(x){
		var image=new Image();
		image.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAFm0lEQVRYR8WXW2xTdRzHv7/Tbe02ZBsKjgDrwmUTLDiuGSou6oO++LAFEiUBtgfoEF9UdjaikUUScO3EJ8daiA7ReMuAN01MvGTOgYMl2E0psLGWTVET6W5la0/Pz/zP2tFC155uGP9PTc/v8jn/3/UQZnAKGq2riKmcmMsYWAYgJ2xmCKA+BrepKp8ZqHO6UjVPqSgsPvLycoMhdBDAVgCmJLoBMJ+WYKi/XnvMrdePbqDCBmsVE+wAHtRrPCznY6DWKzucevR0AZnt1tfAePdug6wyVDUEDj8QxiRJAknSPb4JfKBfdr6TDCopUEFD9Q4i/ijaEDMjFAohMysTObm5yMzOAkC47fdj+JYPfr8fBoMBRHeb590e2XkiEVRCoMIj1YVs4EsA5kaMCJD09HQsLVqB/CWLYDKZphwL0InxcfwxMIjrV64hEAhoYFOHMBpSDGsHDjRdmw4qIVCBzfohAZXRMFnZ2VizYR3yHpoHRQmBVTXGNkmEtLQ0+P65BdeFLoyOjMZAMfC5V3a8mDJQuKK6ARiFsnh78bYbntiMnHl5UILBsE0+T0TnmcFE2MSMzeKBgBr2DeFCeweCQQWSNPXuCqtqibfueE88qGlvyNywpwZEtoiSoigoWrUSy1cWIxgMikQeBbDvpKUiJr+qus+8xOAmALkitH3uq7jc3aMBRg4DB72y4+2UgArs1q+J8VzkdtIzMlBa9iSMJhNUVRWFtb3FUvFZPKM7Xa3lElErSRIFJwI4/0OblltR1fe9R3Y8nRKQucHqBqFIKIUUBfMX5mNd6SatukC42PJoxYZE1VLpOt0BQqkI86WfL+Dm4O8w3LmlXo/sWJ4akK36L4DnCyURrsJlS7HysdXab4CaWizl+xIBVbnONDLx62npaXC7etDnvgbxe/LQ3x65ecF9BML7LZaKVxIB7eo5bSfG/kmgX7VcmhVQoc16hYEVkZAtWJiPtZGQAZ0tlopNCUPW3doO0ONayDov4ubA4GxDZv0KwPOxSb0FGSaj6D3MoG0nLeWt8aAqu8++AKhniUgS7eGcSOrbMUn9nUd2PJNayOKUfbFlFZYVF2llD8DHTNaTq8u/iDYcrrDjYgiLsr9+tRe//eK6D2V/ZO9SMqiieWlrhqqq2sgQjXFubk44uTWUdmI6x8SiZZcC2BJpjCPDw+j8sQPBQEAbuuETJInX9O93Xk7phoRwgb26hZh3RRRFyc95YA7WbFyvDVUlpEBM/OgjBqpogiNDQ7jU2QUBFT3PZjw6hJPphmtGRsbUcDUajRDzS7RuBiMwPqH1nF73VQQmJu4ZripzyQ3Z2TtdQSRdP8w265sADkUbELcSUkMQgzYnLxeZWWL9AMb9fvhu+XB7bGyavYgOe+TmNxJVZ1Kgh+07sk1qVleka8eCqVpucThqYv0R4yEqX6LF+w0ql/TVOYdmBaTlUoN1KxG+TGQo2TMm7PDWOD5OJpf0hjQD9fWSOevmtwCXJTMY9znRT56x/C2or49dnuII6wMCsKRx90ZJlToARK2AuvBYhVR2Qz7WpkdaN5AwZm6wOkHYrcfwlAzxKU+Nc6denZSAFh+tXmRQWGyRuTodDBtUXt1X5/TqlEdKQFpvarAeYMJhXQ6YDnlqm9/SJRsWShlo8dFXMw2KvwvAI0kc9Zk4WOKu/WDkPwUK51IFCHEnfcQ5Adv7ZcenqcAI2ZRvSHPAILPd+g2AZ+M5JKCtv8ZRBpr6qNXNNTMg0Swb964nVT0nvnju8qYy6Cmv3NyumyJKcMZAWuhs1U0A7412zECLV3ZUzQRm5iELezO/t2chgiR2przwX0MKhyyDtScG/hegyQS/80GZ6ANQL+CsQqb1pfpKE2cZxS0Zx8lf/GfNqTG9zqcpiNmoT+oW2PZsI5YyPLXNn8zW2r+LplBDiXIuYwAAAABJRU5ErkJggg==";
		var result;
		var canvas=document.getElementById('canvas');
		var context=canvas.getContext('2d');
		context.drawImage(image,0,0);
		var r=255*(1-x/5);
		var g=255*(x/5);
		context.fillStyle="rgb("+Math.round(r)+","+Math.round(g)+",0)";
		context.beginPath();
		context.arc(18,12,6,0,2*Math.PI);
		context.fill();
		var result=canvas.toDataURL("image/png");	
		return result;
	},
	buildRoute: function(x){
		if (x.length > 1) {
			App.loadingAnimationTurn();
			map.cleanRoute();
			var waypoints = [];
			for (var i = 1; i < x.length - 1; i++) {
				myLatLng = new google.maps.LatLng({lat: Number(x[i].lat), lng: Number(x[i].lng)});
				waypoints.push({location: myLatLng, stopover: true});
			}
			map.drawRoute({
				origin: [x[0].lat, x[0].lng],
				destination: [x[x.length - 1].lat, x[x.length - 1].lng],
				waypoints: waypoints,
				travelMode: 'driving',
				strokeColor: 'rgb(96, 212, 174)',
				strokeOpacity: 1,
				strokeWeight: 4,
				callback: App.loadingAnimationTurn()
			});
		}
	},
	clearRouteList: function(){
		$('.routePoints').html("");
	},
	setRouteCleaningEventListener: function(){
		$('#cleanroute').click(function(){
			App.cleanRouteMemory();
		})
	},
	cleanRouteMemory:function(){
		if (App.glVar.currentLocation == 'country') {
			map.cleanRoute();
			App.glVar.citiesRoutePoints = [];
			App.forgetCityInfo();
			App.clearRouteList();
		}else{
			map.cleanRoute();
			App.glVar.placesRoutePoints[App.glVar.currentLocation.id - 1] = [];
			App.forgetPlaceInfo();
			App.clearRouteList();
		}
	},
	rememberCityInfo: function(x){
		var data = JSON.parse(window.localStorage.citiesRoutePoints);
		data.push(x);
		window.localStorage.citiesRoutePoints = JSON.stringify(data);
	},
	rememberPlaceInfo: function(x){
		var data = JSON.parse(window.localStorage.placesRoutePoints);
		data[Number(App.glVar.currentLocation.id) - 1].push(x);
		window.localStorage.placesRoutePoints = JSON.stringify(data);
	},
	forgetCityInfo: function(){
		window.localStorage.citiesRoutePoints = '[]';
	},
	forgetPlaceInfo: function(){
		data = JSON.parse(window.localStorage.placesRoutePoints);
		data[App.glVar.currentLocation.id - 1] = [];
		window.localStorage.placesRoutePoints = JSON.stringify(data);
	},
	loadingAnimationTurn: function(){
		$('#loading').fadeToggle(300);
	},
	setSigninEventListener: function(){
		$('.signin-ref').click(App.signingMenuAppear);
	},
	signingMenuAppear: function(){
		$('.signin').fadeToggle({
			duration: 500,
			start: function(){
				this.style.display = 'flex';
				$('.registration').hide();
			}
		})
	},
	setRegistrationEventListener: function(){
		$('.registration-ref').click(App.registrationMenuAppear);
	},
	registrationMenuAppear: function(){
		$('.registration').fadeToggle({
			duration: 500,
			start: function(){
				this.style.display = 'flex';
				$('.signin').hide();
			}
		})
	},
	setSigninMenuClosingEventListener: function(){
		$('.signin').click(App.closeSigningMenu);
	},
	closeSigningMenu: function(){
		$('.signin').fadeToggle({
			duration: 500,
			start: function(){
				this.style.display = 'flex';
			}
		});
	},
	setRegistrationMenuClosingEventListener: function(){
		$('.registration').click(App.closeRegistrationMenu);
	},
	closeRegistrationMenu: function(){
		$('.registration').fadeToggle({
			duration: 500,
			start: function(){
				this.style.display = 'flex';
			}
		});
		console.log($('.signin')[0].style.display);
	},
	preventOverlayClosing: function(){
		$('.window').click(App.stopClick);
	},
	stopClick: function(e){
		e.stopImmediatePropagation();
	}
}
App.init();