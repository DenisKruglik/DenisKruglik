var n=prompt("Enter the number of elements")*1,a=new Array(n);
function polymem(x){
var k=0;
x[0]=prompt("Enter the arguement");
for (var i = 1; i < x.length; i++) {
	x[i]=prompt("Enter the coefficient");
}
for(var i=0;i<x.length;i++){
k=k+x[i+1]*Math.pow(x,i);
}
return x[0]*k;
}
alert(polymem(a));
