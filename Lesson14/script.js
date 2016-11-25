var canvas=fr.get.byId('can');
var context=canvas.getContext("2d");
// context.fillStyle="rgba(29,26,178,0.5)";
// context.fillRect(10,10,400,200);
// context.fillStyle="rgba(255,255,0,0.5)";
// context.fillRect(150,150,300,400);
// context.clearRect(180,160,30,20); прямоугольники
context.translate(400,200);
context.save();
context.font="20px Arial";
context.textAlign="center";
context.textBaseline="middle";
function clock(){
	context.restore();
	context.font="20px Arial";
	context.textAlign="center";
	context.textBaseline="middle";
	context.save();
	context.clearRect(-400,-200,600,800);
	context.beginPath();
	context.arc(0,0,100,2*Math.PI,0);
	context.stroke();
	context.beginPath();
	context.arc(0,0,130,2*Math.PI,0);
	context.stroke();
	context.beginPath();
	context.arc(0,0,10,2*Math.PI,0);
	context.stroke();
	context.beginPath();
	context.moveTo(60,0);
	context.lineTo(70,0);
	context.stroke();
	context.beginPath();
	context.moveTo(-60,0);
	context.lineTo(-70,0);
	context.stroke();
	context.beginPath();
	context.moveTo(0,-60);
	context.lineTo(0,-70);
	context.stroke();
	context.beginPath();
	context.moveTo(0,60);
	context.lineTo(0,70);
	context.stroke();
	context.fillText('6',0,89);
	context.fillText('12',0,-80);
	context.fillText('3',89,0);
	context.fillText('9',-80,0);
	var time=(new Date()).getMilliseconds(),time1=(new Date()).getSeconds()*1000;
	context.rotate(2*Math.PI*(time+time1)/60000);
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,-50);
	context.stroke();
}
var int=setInterval(function(){
	clock();
},15)