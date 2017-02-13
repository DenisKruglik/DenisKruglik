var a,b,c,d;
a=prompt("Enter a");
b=prompt("Enter b");
c=prompt("Enter c");
a=Number(a);
b=Number(b);
c=Number(c);
d=(b>c) ? b : c;
if (a>d){
	alert(a);
}else{
alert(d);
}