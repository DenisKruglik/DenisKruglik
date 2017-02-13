var el=document.getElementById("q"),el1=document.getElementById("a"),el2=document.getElementById("b"),el3=document.getElementById("as");
var a=document.createElement("div"),func,t=document.getElementById("t"),block=document.getElementById("block");
a.innerText="appended text";
// el.addEventListener("click",func=function(){
	// fr.remove(el2);
	// el.removeEventListener("click",func);
	// alert(fr.random(5,10));
// })
// fr.prependTo(a,el3);
fr.copyTo(a,block);
fr.event("click",el,function(){alert("It works!")});
var qwe=new Event("click");
fr.dispatch(qwe,el);