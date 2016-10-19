var mem1="",mem2="",mem3,k=0,bp=document.getElementById("b+"),bmi=document.getElementById("b-"),s=document.getElementById("s");
var bmu=document.getElementById("b*"),bdiv=document.getElementById("b/"),bdot=document.getElementById("b."),be=document.getElementById("b=");
var b1=document.getElementById("b1"),b2=document.getElementById("b2"),b3=document.getElementById("b3"),b4=document.getElementById("b4");
var b5=document.getElementById("b5"),b6=document.getElementById("b6");
var b7=document.getElementById("b7"),b8=document.getElementById("b8"),b9=document.getElementById("b9"),b0=document.getElementById("b0");
b1.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+="1";
		s.innerText=mem1;
	}else{
		mem2+="1";
		s.innerText=mem2;
	}
})
b2.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+="2";
		s.innerText=mem1;
	}else{
		mem2+="2";
		s.innerText=mem2;
	}
})
b3.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+='3';
		s.innerText=mem1;
	}else{
		mem2+="3";
		s.innerText=mem2;
	}
})
b4.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+="4";
		s.innerText=mem1;
	}else{
		mem2+="4";
		s.innerText=mem2;
	}
})
b5.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+="5";
		s.innerText=mem1;
	}else{
		mem2+="5";
		s.innerText=mem2;
	}
})
b6.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+="6";
		s.innerText=mem1;
	}else{
		mem2+="6";
		s.innerText=mem2;
	}
})
b7.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+="7";
		s.innerText=mem1;
	}else{
		mem2+="7";
		s.innerText=mem2;
	}
})
b8.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+="8";
		s.innerText=mem1;
	}else{
		mem2+="8";
		s.innerText=mem2;
	}
})
b9.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+="9";
		s.innerText=mem1;
	}else{
		mem2+="9";
		s.innerText=mem2;
	}
})
b0.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+="0";
		s.innerText=mem1;
	}else{
		mem2+="0";
		s.innerText=mem2;
	}
})
bp.addEventListener("click",function(){
	mem3='+';
});
bmi.addEventListener("click",function(){
	mem3='-';
});
bmu.addEventListener("click",function(){
	mem3='*';
});
bdiv.addEventListener("click",function(){
	mem3='/';
});
bdot.addEventListener("click",function(){
	if (mem3==undefined) {
		mem1+=".";
		s.innerText=mem1;
	}else{
		mem2+=".";
		s.innerText=mem2;
	}
})
be.addEventListener("click",function(){
	mem1=parseFloat(mem1);
	mem2=parseFloat(mem2);
	switch(mem3){
		case '+':
			mem1=mem1+mem2
			s.innerText=mem1;
			mem3=undefined;
			break;
		case '-':
			mem1=mem1-mem2
			s.innerText=mem1;
			mem3=undefined;
			break;	
		case '*':
			mem1=mem1*mem2
			s.innerText=mem1;
			mem3=undefined;
			break;	
		case '/':
			mem1=mem1/mem2
			s.innerText=mem1;
			mem3=undefined;	
			break;
	}
	mem2="";
});