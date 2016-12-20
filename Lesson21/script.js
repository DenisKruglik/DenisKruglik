var App={
	init:function(){
		App.initializeVariables();
		
		App.setHTMLField();

		App.setEditorFunctions();

		App.setDragDrop();

		App.setFile();

		App.setLocalStorage();
	},
	setHTMLField:function(){
		html.style.display="none";

		fr.event('click',showhtml,function(){
			if (html.style.display=="none") {
				field.style.display="none";
				html.style.display="block";
				html.innerText=field.innerHTML;
				showhtml.value="Show text";
			}else{
				field.style.display="block";
				html.style.display="none";
				showhtml.value="Show HTML";
			}
		})

		fr.event('click',html,App.selectField);
		fr.event('dblclick',html,function(e){
			document.execCommand('copy');
			console.log(1);
		});
		fr.event('copy',window,function(e){
			e.preventDefault();
			var text=document.getSelection().toString();
			console.log(text);
			e.clipboardData.setData("text/html",text);
		});
	},
	selectField:function(e){
		var r = document.createRange();
		r.selectNode(this);
		document.getSelection().addRange(r);
	},
	initializeVariables:function(){
		var bold=fr.get.byId('bold'),
		italic=fr.get.byId('italic'),
		underline=fr.get.byId('underline'),
		insertorderedlist=fr.get.byId('insertorderedlist'),
		insertunorderedlist=fr.get.byId('insertunorderedlist'),
		justifyleft=fr.get.byId('justifyleft'),
		justifycenter=fr.get.byId('justifycenter'),
		justifyright=fr.get.byId('justifyright'),
		indent=fr.get.byId('indent'),
		outdent=fr.get.byId('outdent'),
		fontsize=fr.get.byId('fontsize'),
		fontname=fr.get.byId('fontname'),
		createlink=fr.get.byId('createlink'),
		field=fr.get.byId('field'),
		html=fr.get.byId('html'),
		showhtml=fr.get.byId('showhtml'),
		deletelink=fr.get.byId('deletelink'),
		file=fr.get.byId('file'),
		insertimage=fr.get.byId('insertimage');
	},
	setEditorFunctions:function(){
		App.setCommand('click',bold,'bold',null);
		App.setCommand('click',italic,'italic',null);
		App.setCommand('click',underline,'underline',null);
		App.setCommand('click',insertorderedlist,'insertorderedlist',null);
		App.setCommand('click',insertunorderedlist,'insertunorderedlist',null);
		App.setCommand('click',justifyleft,'justifyleft',null);
		App.setCommand('click',justifycenter,'justifycenter',null);
		App.setCommand('click',justifyright,'justifyright',null);
		App.setCommand('click',indent,'indent',null);
		App.setCommand('click',outdent,'outdent',null);
		fr.event('change',fontsize,function(){
			document.execCommand('fontsize',false,fontsize.value);
		})
		fr.event('change',fontname,function(){
			document.execCommand('fontname',false,fontname.value);
		})
		fr.event('click',createlink,function(){
			document.execCommand('createlink',false,prompt('Enter URL'));
		})
		fr.event('click',deletelink,function(){
			document.execCommand('unlink',false,null);
		})
	},
	setCommand:function(ev,el,command,val){
		fr.event(ev,el,function(){
			document.execCommand(command,false,val);
		})
	},
	setDragDrop:function(){
		fr.event("dragenter",document.body,function(e){
			e.preventDefault();
			e.stopPropagation();
		})
		fr.event("dragleave",document.body,function(e){
			e.preventDefault();
			e.stopPropagation();
		})
		fr.event("dragover",document.body,function(e){
			e.preventDefault();
			e.stopPropagation();
		})
		fr.event("drop",document.body,function(e){
			e.preventDefault();
			e.stopPropagation();
		})
		fr.event("drop",field,function(e){
			e.preventDefault();
			e.stopPropagation();
			var reader=new FileReader();
			reader.onload=function(){
				field.innerText+=reader.result;
			}
			for (var i = 0; i < e.dataTransfer.files.length; i++) {
				if (e.dataTransfer.files[i].type=="text/html" && reader.readyState==0) {
					reader.readAsText(e.dataTransfer.files[i]);
				}
			}
		})
	},
	setFile:function(){
		file.onchange=function(e){
			var data=this.files[0];
			console.log(this.files);
			if (data.type.includes('text')) {
				var reader=new FileReader();
				reader.onload=function(){
					field.innerText+=reader.result;
				}
				reader.readAsText(data);
			}else if (data.type.includes("image")) {
				var reader=new FileReader();
				reader.onload=function(){
					var img=new Image();
					img.src=reader.result;
					field.appendChild(img);
					localStorage.text=field.innerHTML;
					App.setImgEvents(img);
					fr.dispatch('click',fr.get.byId('closebutton'));
				}
				reader.readAsDataURL(data);
			}
		}
	},
	generateSettings:function(){
		var settingwindow=document.createElement('div');
		settingwindow.setAttribute('id','settingwindow');
		settingwindow.innerHTML="<label>\
				<span>Width<span>\
				<input type='number' min='1' id='widthinput'>\
			</label>\
			<label>\
				<span>Height<span>\
				<input type='number' min='1' id='heightinput'>\
			</label>\
			<label>\
				<span>Vertical margin<span>\
				<input type='number' min='0' id='verticalmargin'>\
			</label>\
			<label>\
				<span>Horizontal margin<span>\
				<input type='number' min='0' id='horizontalmargin'>\
			</label>\
			<label>\
				<span>Float<span>\
				<select id='floatselect'>\
					<option>None</option>\
					<option>Left</option>\
					<option>Right</option>\
				</select>\
			</label>\
			<input type='button' value='Close' id='closebutton'>";
		document.body.appendChild(settingwindow);
		var a=this;
		App.setSettingsEvents(a);
		var pics=fr.get.byTagName('img');
		for (var i = 0; i < pics.length; i++) {
			fr.unevent('click',pics[i],App.generateSettings);
		}
	},
	setImgEvents:function(pic){
		fr.event('click',pic,App.generateSettings);
	},
	setSettingsEvents:function(el){
		fr.event('input',widthinput,function(){
			var a;
			for (var i = 0; i < document.defaultView.getComputedStyle(el,'width').width.indexOf('p'); i++) {
				a+=document.defaultView.getComputedStyle(el,'width').width[i];
			}
			widthinput.value=a;
			el.style.width=this.value+'px';
			localStorage.text=field.innerHTML;
		})
		fr.event('input',heightinput,function(){
			var a;
			for (var i = 0; i < document.defaultView.getComputedStyle(el,'width').height.indexOf('p'); i++) {
				a+=document.defaultView.getComputedStyle(el,'width').height[i];
			}
			heightinput.value=a;
			el.style.height=this.value+'px';
			localStorage.text=field.innerHTML;
		})
		fr.event('input',verticalmargin,function(){
			var a;
			for (var i = 0; i < document.defaultView.getComputedStyle(el,'width').marginTop.indexOf('p'); i++) {
				a+=document.defaultView.getComputedStyle(el,'width').marginTop[i];
			}
			verticalmargin.value=a;
			el.style.marginTop=this.value+'px';
			localStorage.text=field.innerHTML;
		})
		fr.event('input',horizontalmargin,function(){
			var a;
			for (var i = 0; i < document.defaultView.getComputedStyle(el,'width').marginLeft.indexOf('p'); i++) {
				a+=document.defaultView.getComputedStyle(el,'width').marginLeft[i];
			}
			horizontalmargin.value=a;
			el.style.marginLeft=this.value+'px';
			localStorage.text=field.innerHTML;
		})
		fr.event('change',floatselect,function(){
			el.style.float=this.value;
			localStorage.text=field.innerHTML;
		})
		fr.event('click',closebutton,function(){
			document.body.removeChild(settingwindow);
			var pics=fr.get.byTagName('img');
			for (var i = 0; i < pics.length; i++) {
				App.setImgEvents(pics[i]);
			}
		})
		fr.event('DOMNodeRemoved',el,function(){
			fr.dispatch('click',fr.get.byId('closebutton'));
		})
	},
	setLocalStorage:function(){
		fr.event('input',field,function(){
			localStorage.text=field.innerHTML;
		})
		fr.event('load',window,function(){
			if (localStorage.text) {
				field.innerHTML=localStorage.text;
			}
			var pics=fr.get.byTagName('img');
			for (var i = 0; i < pics.length; i++) {
				App.setImgEvents(pics[i]);
			}
		})
	}
}

App.init();