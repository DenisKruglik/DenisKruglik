var a=fr.get.byId('f');
a.onsubmit=function(e){
	if (this.checkValidity()==false) alert("Not valid");
	if (this.checkValidity()==true) alert("Valid");
	e.preventDefault();
	}
a.onreset=function(e){
	var t=confirm("Do you really wanna reset the form?")
	if (t==false) e.preventDefault();
}
var c=fr.get.byId('a');
c.contentEditable=true;
fr.event("copy",window,function(e){
	e.preventDefault();
	var text=document.getSelection().toString();
	text+="\nDownloaded from my site";
	e.clipboardData.setData("text/plain",text)
})