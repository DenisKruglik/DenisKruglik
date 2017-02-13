var k=0,b=prompt("Lower limit")*1,c=prompt("Higher limit")*1,n=prompt("Enter number of elements")*1,a=new Array(n);
function random(x,y){
	return Math.round(x+Math.random()*(y-x))
}
for (var i = a.length - 1; i >= 0; i--) {
	a[i]=random(b,c);
	console.log(a[i]);
	if (a[i]%3==0) {
		k++;
	}
}
alert(k);