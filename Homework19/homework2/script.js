var player;
var state;
function onYouTubeIframeAPIReady(){
	player=new YT.Player("vid");
	player.onStateChange=function(){
	if (this.getPlayerState()==1) {
		state=1;
	}
}
}
fr.event("visibilitychange",document,function(e){
	if (document.hidden==true) {
		player.pauseVideo();
	}else{
		if (state==1) {
			player.playVideo();
		}
	}
	state=player.getPlayerState();
})