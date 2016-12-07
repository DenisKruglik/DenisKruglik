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
	},
	ajax: function(m,path,f){
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=f;
			xhr.open(m,path,true);
			xhr.send();
	},
	ajget: function(path,f){
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=f;
			xhr.open("GET",path,true);
			xhr.send();
		},
	get: {
		byId: function(el){
			return document.getElementById(el);
		},
		byTagName: function(el){
			return document.getElementsByTagName(el);
		},
		byClassName: function(el){
			return document.getElementsByClassName(el);
		},
		byName: function(el){
			var tyu=new Array;
			for (var i = 0; i < document.body.children.length; i++) {
				if (document.body.children[i].getAttribute('name')==el){
					tyu.push(document.body.children[i]);
				}
			}
			return tyu;
		}
}
}