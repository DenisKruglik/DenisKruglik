// var k=0,t=function(){
// 	alert("Result");
// 	k++;
// 	if (k==2) {
// 	el1.removeEventListener("click",t);
// }
// },el=document.getElementById("a"),el1=document.createElement("div");
// el1.innerHTML="<input type='button' value='Button'>";
// el.appendChild(el1);
// el1.addEventListener("click",t);


// var el=document.getElementById("b"),el1=document.getElementById("a"),el2=document.getElementById("c"),el3=document.getElementById("d"),
// el.addEventListener("click",function(q){
// 	q.preventDefault();
// 	alert(this.getAttribute("href"));
// })
// el1.addEventListener("click",function(){
// 	alert("p");
// })
// el2.addEventListener("click",function(){
// 	alert("div");
// })
// el3.addEventListener("click",function(){
// 	alert("button");
// })


// var el=document.getElementById("d"),el1=document.getElementById("popup");
// el.addEventListener("click",function(){
// 	el1.style.display="block";
// })
// el1.addEventListener("click",function(q){
// 	this.style.display="none";
// })
// document.getElementById("container").addEventListener("click",function(q){
// 	q.stopPropagation();
// })


var el=document.getElementById("d"),ev;
el.addEventListener("click",function(){
	alert("Stop pushing!");
});
setInterval(function(){
	ev=new Event("click");
	el.dispatchEvent(ev);
},1000);