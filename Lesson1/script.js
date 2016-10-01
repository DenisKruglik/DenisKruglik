var a=prompt("a="),b=prompt("b="),c=prompt("c=");
b=b*1.0;
a=a*1.0;
c=c*1.0;
if ((a>b) && (a>c)){ 
	alert(a);
}else{
	if ((b>a) && (b>c)){
		alert(b);
	}else alert(c);
}