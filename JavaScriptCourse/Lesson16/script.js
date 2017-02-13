fr.ajget("data.json",function(){
	if(this.readyState==4 && this.status==200){
		var data=JSON.parse(this.responseText);
		handle(data);	
	}
})

var timer;

function res(){
	fr.get.byId('container').innerHTML="";
	fr.get.byId('timer').innerText="";
	// fr.get.byId('main').innerHTML="<h1>Your result is "+mark+"</h1>";
}

function handle(data){
	for (var i = 0; i < data.length; i++) {
		fr.get.byId('list').innerHTML+="<li>\
				<div>\
					<h1>"+data[i].name+"</h1>\
					<img src='"+data[i].img+"'><br>\
					<span>"+data[i].description+"</span><br>\
					<span>You have "+data[i].time+" minutes for this test</span><br>\
					<input type='button' value='Begin test' id='b"+i+"'>\
				</div>\
			</li>";
		}

	for (var i = 0; i < data.length; i++) {
		(function(i){
			
			fr.event("click",fr.get.byId('b'+i),function(){
				
				clearInterval(timer);
				var t=data[i].time*60;
				timer=setInterval(function(){
					if (t==0) {
						clearInterval(timer);
						res();
					}
					if (t%60<10) {
						fr.get.byId('timer').innerText=Math.floor(t/60)+":0"+(t%60);
					}else fr.get.byId('timer').innerText=Math.floor(t/60)+":"+(t%60);
					t--;
				},1000);

				fr.get.byId('container').innerHTML="";
				var s = "";
				for (var j = 0; j < data[i].questions.length; j++) {
					(function(j){
						s+="<li>\
						<h2>"+data[i].questions[j].text+"</h2>\
						<ol type='a'>";

						if (data[i].questions[j].key.length>1) {
							for (var k = 0; k < data[i].questions[j].answers.length; k++) {
								(function(k){
									s+="<li>\
										<label>\
										<input type='checkbox' name='c"+i+""+j+"'>\
										<span>"+data[i].questions[j].answers[k]+"</span>\
										</label>\
										</li>";
								})(k)	
							}
						}else{
							for (var k = 0; k < data[i].questions[j].answers.length; k++) {
								(function(k){
									s+="<li>\
									<label>\
									<input type='radio' name='r"+i+""+j+"'>\
									<span>"+data[i].questions[j].answers[k]+"</span>\
									</label>\
									</li>"
								})(k)}
						}
					s+="</ol>\
					</li>";	
					fr.get.byId('main').innerHTML="";
					
				})(j)}
				fr.get.byId('container').innerHTML = s + "<input type='button' value='Submit' id='s"+i+"'>";
				fr.event("click",fr.get.byId('s'+i),function(){
					clearInterval(timer);
					res();
				})
			})
		})(i)
	}	
}