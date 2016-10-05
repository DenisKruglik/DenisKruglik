var b=1,x=prompt("Enter x")*1,a=Math.pow(Math.E,x);
alert(a);
for (var i = 0; i < x; i++) {
	b=b*Math.E;
}
alert(a-b);