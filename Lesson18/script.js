// var filein=fr.get.byId('file');
// filein.onchange=function(){
// 	console.log(this.files);
// 	var file=this.files[0];
// 	var reader=new FileReader();
// 	reader.onload=function(){
// 		console.log(reader.result);
// 	}
// 	reader.readAsDataURL(file);
// }


var filein=fr.get.byId('file');
filein.onchange=function(){
	console.log(this.files);
	var file=this.files[0];
	var reader=new FileReader();
	reader.onload=function(){
		var img=new Image();
		img.src=reader.result;
		document.body.appendChild(img);
	}
	reader.readAsDataURL(file);
}



var block=fr.get.byId('block');
fr.event("dragenter",block,function(e){
	e.preventDefault();
	e.stopPropagation();
	block.innerText="МЫШКУ ОТПУСТИ!!!";
})
fr.event("dragleave",block,function(e){
	e.preventDefault();
	e.stopPropagation();
	block.innerText="";
})
fr.event("dragover",block,function(e){
	e.preventDefault();
	e.stopPropagation();
})
fr.event("drop",block,function(e){
	e.preventDefault();
	e.stopPropagation();
	console.log(e.dataTransfer.files);
	var reader=new FileReader();
	reader.onload=function(){
		block.innerText=reader.result;
	}
	reader.readAsText(e.dataTransfer.files[0]);
})