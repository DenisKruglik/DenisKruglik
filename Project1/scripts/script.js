var App={
	init:function(){
		App.initMap();
		App.addBackButton();
		App.initInfoWindow();
		App.loadCityMarkers();
		App.setRouteCleaningEventListener();
	},
	glVar:{
		infowindow: "",
		max_rating: 5,
		rating: 0,
		routePoints: []
	},
	initMap:function(){
		map = new GMaps({
			div: '#map',
			zoom: 7,
			lat: 53.9,
			lng: 27.559,
			disableDoubleClickZoom: true,
			draggable: false,
			keyboardShortcuts: false,
			scrollwheel: false,
			disableDefaultUI: true,
			noClear: true
		});
	},
	addBackButton:function(){
		map.addControl({
			content: "Назад",
			id: "back",
			position: "LEFT_TOP",
			events: {
				click:function(){
					map.setCenter({
						lat: 53.9,
						lng: 27.559
					});
					map.setZoom(7);
					map.removeMarkers();
					$('#back').fadeOut(500);
					App.loadCityMarkers();
					App.cleanRouteMemory();
				}
			}
		});
	},
	initInfoWindow:function(x){
		var infowindow=new google.maps.InfoWindow({
			content: ""
		});
		App.glVar.infowindow=infowindow;
	},
	callCityInfoWindow:function(x,marker){
		var content="<div id='info'>\
			<h1>"+x.name+"</h1>\
			<img src='"+x.pic+"'></img>\
			<figure>"+x.description+"</figure><br>\
			<span>Интересных мест: "+x.places+"</span><br>\
			<span>Посетителей: "+x.visitors+"</span>\
			<div>\
				<input type='button' id='gotoplace' value='Перейти к месту'>\
				<input type='button' id='setA' value='Добавить к маршруту'></input>\
			</div>\
		</div>";
		App.glVar.infowindow.setContent(content);
		App.glVar.infowindow.open(map,marker);
		$('#gotoplace').click(function(){
			map.setCenter({
				lat: Number(x.lat),
				lng: Number(x.lng)
			});
			map.setZoom(12);
			$('#back').fadeIn(500);
			$('#back').css('font-size','36px');
			map.removeMarkers();
			App.loadPlaceMarkers(x);
			App.cleanRouteMemory();
		});
		$('#setA').click(function(){
			App.glVar.routePoints.push([x.lat, x.lng]);
			App.buildRoute();
			App.addToRouteList(x);
		});
	},
	callPlaceInfoWindow:function(x,marker){
		var star="";
		for (var i = 0; i < App.glVar.max_rating; i++) {
			star+="<img class='star toselect' id='rate_button"+(i+1)+"' src='images/star_unselected.png'>"
		}
		var content="<div id='info'>\
			<div class='bio'>\
				<h1>"+x.name+"</h1>\
				<img src='"+x.pic+"'>\
				<figure>"+x.description+"</figure><br>\
				<div class='avgMark'><img src='images/star.png'><span>"+x.mark+"</span></div>\
				<input type='button' class='show_comments' value='Показать отзывы ("+x.comments+")'></input>\
				<input type='button' class='hide_comments' value='Скрыть отзывы'></input>\
				<input type='button' id='setA' value='Добавить к маршруту'></input>\
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
		App.setControlsEventListeners(x);
	},
	setControlsEventListeners:function(x){
		$('#info .show_comments').click(function(){
			App.loadComments(x);
			App.setStarsEventListeners();
			$('#info .show_comments').hide();
			$('#info .hide_comments').show();
			$('#info div.leave_comment').show();
		});
		$('#info .hide_comments').click(function(){
			$('div.comments').html('<hr>');
			$('#info .show_comments').show();
			$('#info .hide_comments').hide();
			$('#info div.leave_comment').hide();
		});
		$('#send_comment').click(function(){
			App.addComment(App.glVar.rating,$('#comment_input').val());
			$('#comment_input').val("");
			App.glVar.rating=0;
			App.setAllBlack();
		});
		$('#setA').click(function(){
			App.glVar.routePoints.push([x.lat, x.lng]);
			App.buildRoute();
			App.addToRouteList(x);
		});
	},
	setStarsEventListeners:function(){
		$('.toselect').click(function(){
			App.setAllBlack();
			App.glVar.rating=Number(this.getAttribute('id')[11]);
			var k=this.getAttribute('id')[11];
			for (var j = 0; j < k; j++) {
				$('#rate_button'+(j+1))[0].src="images/star.png";
				$('#rate_button'+(j+1)).off('mouseout',App.setBlack);
			}
			App.setBlack(this);
		});
		$('.toselect').mouseover(function(){
			var k=this.getAttribute('id')[11];
			for (var j = 0; j < k; j++) {
				$('#rate_button'+(j+1))[0].src="images/star.png";
			}
		});
		$('.toselect').mouseout(function(){
			App.setBlack(this);
		});
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
		image.src="data:image/png;base64,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BGvzVZEf/ZjGif1Hj1+3g609dQIECBAgQIAAAQI7XiALkCOv/aUxb3zyeWnN06/v//Tq3z2vGx5MgAABAgQIECBAgMD/a4EoQDZfBTly4J/HPH5+K892GtPxfcdWD27lsR5DgAABAgQIECBAgMD2EYgD5KFDN//M0jT961ae+tLSuPHaO45/fiuP9RgCBAgQIECAAAECBLaPQBwgi6d88vDBj8xj/t2LefrTNP3NvqOrv3Exj7ElQIAAAQIECBAgQGB7ClxUgCx+Qvol03RyHvPukGN9rE/799+5+q1wb0aAAAECBAgQIECAwDYWuKgAWTicOHLg98Y8/jQ0ee/+Y8f/KNyaESBAgAABAgQIECCwzQUuOkAWHicPH/zyPOZXXchmmqYH9x1dffk29/P0CBAgQIAAAQIECBC4CIEtBcjDRw6+ZZrnT13oz1lamt567R2rH7+Iz8WUAAECBAgQIECAAIFtLrClANl8FeTIgTvnebzxvD7TdM/+o6u3bnM7T48AAQIECBAgQIAAgYsU2HKAnPiFg68e6/OXzvfnzdPSz1539N5/ucjPxZwAAQIECBAgQIAAgW0usOUAWbicOHzww2PM7/who2n66P6jq7+1zd08PQIECBAgQIAAAQIEtiDwvALk5G237Z13P3lyjHHZ5p89TafXTq3te+k/3f+dLXwuHkKAAAECBAgQIECAwDYXeF4BsrA5eejgu+Zp/tBmf4zp3fuOrX5wm5t5egQIECBAgAABAgQIbFHgeQfIZoQcPvCtMaY9+46t7t3i5+FhBAgQIECAAAECBAjsAIFKgJw4cvPbp7G0e9/R1c1XQnwQIECAAAECBAgQIEDgfAKVAEFLgAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIEN+BRtkAAB3/SURBVCBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFARECAVRkcIECBAgAABAgQIEEgEBEiiZEOAAAECBAgQIECAQEVAgFQYHSFAgAABAgQIECBAIBEQIImSDQECBAgQIECAAAECFQEBUmF0hAABAgQIECBAgACBRECAJEo2BAgQIECAAAECBAhUBARIhdERAgQIECBAgAABAgQSAQGSKNkQIECAAAECBAgQIFAR+B8wjVM/xOpKQwAAAABJRU5ErkJggg==";
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
	buildRoute: function(){
		if (App.glVar.routePoints.length > 1) {
			for (var i = 0; i < App.glVar.routePoints.length - 1; i++) {
				map.drawRoute({
					origin: App.glVar.routePoints[i],
					destination: App.glVar.routePoints[i+1],
					travelMode: 'driving',
					strokeColor: 'rgb('+(18+i*20)+','+(64+i*20)+','+(171+i*20)+')',
					strokeOpacity: 1,
					strokeWeight: 6
				});
			}
		}
	},
	addToRouteList: function(x){
		$('.routePoints').append($('<li>'+x.name+'</li>'));
	},
	setRouteCleaningEventListener: function(){
		$('#cleanroute').click(function(){
			App.cleanRouteMemory();
		})
	},
	cleanRouteMemory:function(){
		map.cleanRoute();
		App.glVar.routePoints = [];
		$('.routePoints').html("");
	}
}
App.init();