var a,b;
a=prompt("Enter first number");
b=prompt("Enter second number");
a=a*1.0;
b=b*1.0;
var c;
c=prompt("Enter required action");
if(c=="+"){
	alert(a+b);
}
if(c=="-"){
	alert(a-b);
}
if(c=="*"){
	alert(a*b);
}
if(c=="/"){
	alert(a/b);
}
if(c=="%"){
	alert(a%b);
}
if(c!="+" && c!="-" && c!="*" && c!="/" && c!="%"){
	alert("Wrong action");
}