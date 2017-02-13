var canvas=fr.get.byId('field');
var context=canvas.getContext('2d');
var draw=function(e){
	context.lineTo(e.offsetX,e.offsetY);
	context.stroke();
}
fr.event("mousedown",canvas,function(e){
	context.beginPath();
	context.moveTo(e.offsetX,e.offsetY);
	fr.event("mousemove",canvas,draw);
	fr.event("mouseout",canvas,function(){
		fr.unevent('mousemove',canvas,draw);
	});
});
fr.event("mouseup",canvas,function(){
	fr.unevent('mousemove',canvas,draw);
})