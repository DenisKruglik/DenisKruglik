var form=fr.get.byId('form');
form.onchange=function(){
	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].type=="checkbox") {
			window.localStorage.setItem(form.elements[i].name,form.elements[i].checked)
		}else if (form.elements[i].type=="radio") {
			var id=form.elements[i].getAttribute('id');
			window.localStorage.setItem(id,form.elements[i].checked)
		}else window.localStorage.setItem(form.elements[i].name,form.elements[i].value)
	}
}
form.oninput=function(){
	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].type=="checkbox") {
			window.localStorage.setItem(form.elements[i].name,form.elements[i].checked)
		}else if (form.elements[i].type=="radio") {
			window.localStorage.setItem(form.elements[i].getAttribute('id'),form.elements[i].checked)
		}else window.localStorage.setItem(form.elements[i].name,form.elements[i].value)
	}
}
onload=function(){
	if (window.localStorage.length>1) {
		for (var i = 0; i < form.elements.length; i++) {
			if (form.elements[i].type=="checkbox") {
				var t=form.elements[i].getAttribute('name');
				if (window.localStorage.getItem(t)=="true") {
					form.elements[i].checked=1;
				}else form.elements[i].checked=0;
			}else if (form.elements[i].type=="radio") {
				var id=form.elements[i].getAttribute('id');
				if (window.localStorage.getItem(id)=="true") {
					form.elements[i].checked=1;
				}else form.elements[i].checked=0;
			}else{
				var a=form.elements[i].getAttribute('name');
				form.elements[i].value=window.localStorage.getItem(a);
			}
		}
	}
}
form.onreset=function(){
	window.localStorage.clear();
}