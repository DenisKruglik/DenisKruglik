var b=0,n=prompt("Enter number of elements")*1,s=prompt("Enter the average value")*1,p=prompt("Enter max deflection in percents")*0.01;
a=new Array(n);
for (var i = 0; i < a.length; i++) {
	a[i]=s*(1-p)+Math.random()*(s*(1+p)-s*(1-p)).toFixed(2);
	console.log(a[i]);
}
for (var i = 0; i < a.length; i++) {
	b=b+a[i];
}
alert(b/n);