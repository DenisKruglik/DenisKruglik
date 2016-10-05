var a=new Array(3);
function polymem(x){
for (var i = 0; i < x.length; i++) {
	x[i]=prompt();
}
return x[x.length-1]*(x[0]*x[x.length-1]+x[1]*x[x.length-1]*x[x.length-1]);
}
alert(polymem(a));