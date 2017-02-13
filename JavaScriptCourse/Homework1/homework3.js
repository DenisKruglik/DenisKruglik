function fact(x){
	if(x==0) return 1;
	return x*fact(x-1);
}
var a;
a=prompt();
a=a*1.0;
alert(fact(a));