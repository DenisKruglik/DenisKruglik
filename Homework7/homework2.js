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
		el.addEventListener(ev,f);
	}
}