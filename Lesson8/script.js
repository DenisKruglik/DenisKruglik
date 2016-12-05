var t=document.getElementById("t");
fr.event("change",document.getElementById("c"),function(){
	t.style.color=this.value;
});
fr.event("change",document.getElementById("f"),function(){
	t.style.fontFamily=this.value;
});