// var elem=document.getElementsById("a");
// elem.onclick=function(){
// 	alert("1");
// }

// var elem=document.getElementById('t'),elem1=document.getElementById('b');
// elem1.addEventListener("click",function(){
// 	alert("Hello, "+elem.value+"!");
// })

// var el=document.getElementById('n'),el1=document.getElementById('a'),el2=document.getElementById('n1'),el3=document.getElementById('b');
// el3.addEventListener("click",function(){
// 	switch(el1.value){
// 		case '+':
// 			alert(Number(el.value)+Number(el2.value));
// 			break;
// 		case '-':
// 			alert(Number(el.value)-Number(el2.value));
// 			break;	
// 		case '%':
// 			alert(Number(el.value)%Number(el2.value));
// 			break;
// 		case '*':
// 			alert(Number(el.value)*Number(el2.value));
// 			break;
// 	}
// })

var el=document.getElementById("a"),el1=document.getElementById("b"),el2=document.getElementById("c"),el3=document.getElementById("d"),el4,el5=document.getElementById('qw');
el3.addEventListener("click",function(){
	el4=document.createElement("div");
	el4.innerText=el.value+" "+el1.value+" "+el2.value;
	el5.appendChild(el4);
	el4.addEventListener("click",function(event){
		alert(this.innerText);
		console.log(event);
	})
})