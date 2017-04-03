var App = {
	init:function(){
		App.setSigninEventListener();
		App.setRegistrationEventListener();
		App.setSigninMenuClosingEventListener();
		App.setRegistrationMenuClosingEventListener();
		App.preventOverlayClosing();
		App.setScrollEventListener();
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
	},
	setScrollEventListener: function(){
		$(window).scroll(App.moveAside);
	},
	moveAside: function(){
		if (window.scrollY > 45) {
			$('.about-content aside').css('top', '20px');
		}else{
			$('.about-content aside').css('top', '70px');
		}
		console.log('scroll');
	}
}
App.init();