// var country={
// 	square: 50000,
// 	population: 100000000,
// 	location: "Asia",
// 	name: "Arstotzka",
// 	capital: "Crock"
// }
// alert(country.name);

// var a,b;
// a=prompt();
// b=a.length;
// a=a.charAt(0)+a.charAt(b-1);
// a=a.toUpperCase();
// a=a.repeat(4);
// alert(a);

// var a,b;
// a=prompt();
// alert((a.charAt(0)+a.charAt(a.length-1)).toUpperCase().repeat(4));

// var a,b;
// a=prompt()*1;
// b=prompt()*1;
// function random(x,y){
// 	return Math.round(x+Math.random()*(y-x))
// }
// c=new Array(100);
// for(var i=0;i<100;i++){
// c[i]=random(a,b);
// console.log(c[i]);
// }

// var a,b;
// a=prompt()*1;
// b=prompt()*1;
// function random(x,y){
// 	return Math.round(x+Math.random()*(y-x))
// }
// c=new Array(100);
// while(c.length<100){
// c.push(random(a,b));
// console.log(c[i]);
// }

// var a,b;
// a=new Date("2037-04-16 0:00:00:00");
// b=new Date("1995-10-18 0:00:00:00");
// alert((a.getTime()-b.getTime())/86400000);

var n=prompt()*1;
function random(x,y){
	return Math.round(x+Math.random()*(y-x))
}
f=new Array(100);
var d=new Date();
for(var i=0;i<n;i++){
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
	console.log(d1-d);
f.sort(function(a,b){
	return a-b;
}
)

// f.sort(function(a,b){
// 	return a-b;
// }