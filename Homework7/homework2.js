var fr={
	remove: function(el){
		el.parentNode.removeChild(el);
	},
	appendTo: function(el,target){
		target.insertBefore(el,target.firstChild);
	},
	prependTo: function(el,target){
		target.appendChild(el);
	},
	before: function(el,target){
		target.parentNode.insertBefore(el,target);
	},
	after: function(el,target){
		target.parentNode.insertBefore(el,target.nextSibling);
	},
	replace: function(el,target){
		target.parentNode.replaceChild(el,target);
	},
	copyTo: function(el,target){
		var copy=el.cloneNode(true);
		target.appendChild(copy);
	},
	random: function(a,b){
		var s=Math.random();
		s=s*(b-a)+a;
		return s;
	},
	event: function(ev,el,f){
		if(typeof el.addEventListener=="function"){
			el.addEventListener(ev,f);
		}else{
			el.attachEvent(ev,f);
		}
	},
	unevent: function(ev,el,f){
		if(typeof el.removeEventListener=="function"){
			el.removeEventListener(ev,f);
		}else{
			el.detachEvent(ev,f);
		}
	},
	dispatch: function(ev,el){
		if(typeof el.dispatchEvent=='function'){
		var event=new Event(ev);
		el.dispatchEvent(event);
	}else{
		var event=new Event(ev);
		el.fireEvent(event);
	}
	}
}