var audio=new Audio();
document.body.appendChild(audio);
// audio.src="Chon - Fluffy.mp3";
var play=fr.get.byId('play');
fr.event("click",play,function(){
	if (audio.paused==true) {
		audio.play();
		play.style.backgroundImage="url(pause.png)";
	}else{
		audio.pause();
		play.style.backgroundImage="url(play.png)";
	}	
})
var stop=fr.get.byId('stop');
fr.event("click",stop,function(){
	audio.pause();
	audio.currentTime=0;
	play.style.backgroundImage="url(play.png)";
	curr.style.width="0%";
})
var volume=fr.get.byId('volume');
volume.value=audio.volume;
fr.event("change",volume,function(){
	audio.volume=volume.value;
})
var fforw=fr.get.byId('fforw');
fr.event("click",fforw,function(){
	audio.playbackRate*=1.5;
})
var frew=fr.get.byId('frew');
fr.event("click",frew,function(){
	audio.playbackRate/=1.5;
})
var curr=fr.get.byId('curr');
var timecode=fr.get.byId('timecode');
var a;

fr.event("play",audio,function(){
	window.localStorage.paused=0;
		

	 a=setInterval(function(){
		window.localStorage.setItem("time",audio.currentTime+"");

		curr.style.width=(audio.currentTime/audio.duration)*100+"%";
		if (Math.floor(audio.currentTime/60)<10) {
			timecode.innerText="0"+Math.floor(audio.currentTime/60)+":";
		}else timecode.innerText=Math.floor(audio.currentTime/60)+":";
		if (Math.floor(audio.currentTime-Math.floor(audio.currentTime/60)*60)<10) {
			timecode.innerText+="0"+Math.floor(audio.currentTime-Math.floor(audio.currentTime/60)*60)+"/";
		}else timecode.innerText+=Math.floor(audio.currentTime-Math.floor(audio.currentTime/60)*60)+"/";
		if (Math.floor(audio.duration/60)<10) {
			timecode.innerText+="0"+Math.floor(audio.duration/60)+":";
		}else timecode.innerText+=Math.floor(audio.duration/60)+":";
		if (Math.floor(audio.duration-Math.floor(audio.duration/60)*60)<10) {
			timecode.innerText+="0"+Math.floor(audio.duration-Math.floor(audio.duration/60)*60);
		}else timecode.innerText+=Math.floor(audio.duration-Math.floor(audio.duration/60)*60);
		
	},15)});

audio.onpause=function(){
	clearInterval(a)
	localStorage.paused=1;
	console.log(1)
}
onload=function(){
	if (audio.src=="") {
		title.innerText="Not selected";
		timecode.innerText="00:00/00:00";
	}
}
var loop=fr.get.byId('loop');
fr.event("click",loop,function(){
	if(audio.loop==false){
		audio.loop=true;
		loop.style.backgroundColor="#3BA3D0";
	}else{
		audio.loop=false;
		loop.style.backgroundColor="transparent";
	}
})
var title=fr.get.byId('title');
fr.event("loadeddata",audio,function(){
	// if (audio.title!="") {
	// 	title.innerText=audio.title;
	// }else{
	// 	var b=audio.src.split("/");
	// 	title.innerText=decodeURI(b[b.length-1]);
	// }
	if (window.localStorage.time) {
		audio.currentTime=window.localStorage.time*1;
	}
	if (window.localStorage.paused==0) {
		audio.play();
	}

	if (window.localStorage.time) {
	if (Math.floor(window.localStorage.time/60)<10) {
			timecode.innerText="0"+Math.floor(window.localStorage.time/60)+":";
		}else timecode.innerText=Math.floor(window.localStorage.time/60)+":";
		if (Math.floor(window.localStorage.time-Math.floor(window.localStorage.time/60)*60)<10) {
			timecode.innerText+="0"+Math.floor(window.localStorage.time-Math.floor(window.localStorage.time/60)*60)+"/";
		}else timecode.innerText+=Math.floor(window.localStorage.time-Math.floor(window.localStorage.time/60)*60)+"/";
		if (Math.floor(audio.duration/60)<10) {
			timecode.innerText+="0"+Math.floor(audio.duration/60)+":";
		}else timecode.innerText+=Math.floor(audio.duration/60)+":";
		if (Math.floor(audio.duration-Math.floor(audio.duration/60)*60)<10) {
			timecode.innerText+="0"+Math.floor(audio.duration-Math.floor(audio.duration/60)*60);
		}else timecode.innerText+=Math.floor(audio.duration-Math.floor(audio.duration/60)*60);
		curr.style.width=(window.localStorage.time/audio.duration)*100+"%";
}else{
	timecode.innerText="00:00/00:00";
	curr.style.width="0px";
}
})
var full=fr.get.byId('full');
fr.event("click",full,function(e){
	audio.currentTime=(e.offsetX/full.clientWidth)*audio.duration;
	window.localStorage.time=audio.currentTime;
	curr.style.width=(audio.currentTime/audio.duration)*100+"%";
})


var playlist=fr.get.byId('playlist');
var plarr=new Array;
var res;
fr.event("dragenter",document.body,function(e){
	e.preventDefault();
	e.stopPropagation();
})
fr.event("dragleave",document.body,function(e){
	e.preventDefault();
	e.stopPropagation();
})
fr.event("dragover",document.body,function(e){
	e.preventDefault();
	e.stopPropagation();
})
fr.event("drop",document.body,function(e){
	e.preventDefault();
	e.stopPropagation();
	for (var i = 0; i < e.dataTransfer.files.length; i++) {
		if (e.dataTransfer.files[i].type=="audio/mp3") {
			plarr.push(e.dataTransfer.files[i]);
			playlist.innerHTML+="<li>\
				<input type='button' value='Play' id='p"+i+"'>\
				<span>"+e.dataTransfer.files[i].name+"</span>\
			</li>";
			var reader=new FileReader();
			reader.onload=function(){
				res=reader.result;
			}
			reader.readAsDataURL(e.dataTransfer.files[i]);
			fr.event('click',fr.get.byId('p'+i),function(){
				audio.src=res;
				audio.currentTime=0;
				localStorage.time=audio.currentTime;
			})
		}
	}
})