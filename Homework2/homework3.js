function random(x,y){
	return Math.round(x+Math.random()*(y-x))
}
f=new Array(10000);
var d=new Date();
for(var i=0;i<10000;i++){
f[i]=random(0,100);
console.log(f[i]);
}
for(var i=0;i<f.length;i++){
	for(var j=1;j<f.length;j++){
		if(f[j]>f[j-1]){
			var x=f[j];
			f[j]=f[j-1];
			f[j-1]=x;
		}
	}
}
var d1=new Date();
var	s=new Date();
for(var i=0;i<10000;i++){
f[i]=random(0,100);
console.log(f[i]);
}
f.sort(function(a,b){
	return a-b;
}
)
var s1=new Date();
console.log(d1-d);
console.log(s1-s);