var flower=[0,1,2,3,4], price=[3.5,3,2.8,2.5,2.4],list=document.getElementById('list'),p=new Array(flower.length),chosen=0;
var res=document.getElementById('result'),resval=0,send=document.getElementById('send'),amount=document.getElementById('amount');
res.innerText="0.00 рублей";
for (var i = 4; i>=0; i--) {
	p[i]=document.createElement('img');
	p[i].setAttribute('src','./'+flower[i]+'.jpg');
	p[i].setAttribute('id','fl'+i);
	p[i].setAttribute('data-value',i);
	fr.after(p[i],res);
}
fr.event("click",document.getElementById('fl0'),function(){
	document.getElementById("fl0").style.backgroundColor="#fff";
	document.getElementById("fl1").style.backgroundColor="#fff";
	document.getElementById("fl2").style.backgroundColor="#fff";
	document.getElementById("fl3").style.backgroundColor="#fff";
	document.getElementById("fl4").style.backgroundColor="#fff";
	chosen=Number(price[document.getElementById('fl0').getAttribute('data-value')]);
	document.getElementById('fl0').style.backgroundColor="chartreuse";
	document.getElementById('fl0').style.outline="#000 solid 2pxs";
	resval=chosen*Number(amount.value)+Number(send.value);
	if (document.getElementById('paperbox').checked==true) {resval+=1;}
	else if (document.getElementById('foil').checked==true) {resval+=1.5;}
	res.innerText=resval.toFixed(2)+" рублей";
})
fr.event("click",document.getElementById('fl1'),function(){
	document.getElementById("fl0").style.backgroundColor="#fff";
	document.getElementById("fl1").style.backgroundColor="#fff";
	document.getElementById("fl2").style.backgroundColor="#fff";
	document.getElementById("fl3").style.backgroundColor="#fff";
	document.getElementById("fl4").style.backgroundColor="#fff";
	chosen=Number(price[document.getElementById('fl1').getAttribute('data-value')]);
	document.getElementById('fl1').style.backgroundColor="chartreuse";
	document.getElementById('fl0').style.outline="#000 solid 2pxs";
	resval=chosen*Number(amount.value)+Number(send.value);
	if (document.getElementById('paperbox').checked==true) {resval+=1;}
	else if (document.getElementById('foil').checked==true) {resval+=1.5;}
	res.innerText=resval.toFixed(2)+" рублей";
})
fr.event("click",document.getElementById('fl2'),function(){
	document.getElementById("fl0").style.backgroundColor="#fff";
	document.getElementById("fl1").style.backgroundColor="#fff";
	document.getElementById("fl2").style.backgroundColor="#fff";
	document.getElementById("fl3").style.backgroundColor="#fff";
	document.getElementById("fl4").style.backgroundColor="#fff";
	chosen=Number(price[document.getElementById('fl2').getAttribute('data-value')]);
	document.getElementById('fl2').style.backgroundColor="chartreuse";
	document.getElementById('fl0').style.outline="#000 solid 2pxs";
	resval=chosen*Number(amount.value)+Number(send.value);
	if (document.getElementById('paperbox').checked==true) {resval+=1;}
	else if (document.getElementById('foil').checked==true) {resval+=1.5;}
	res.innerText=resval.toFixed(2)+" рублей";
})
fr.event("click",document.getElementById('fl3'),function(){
	document.getElementById("fl0").style.backgroundColor="#fff";
	document.getElementById("fl1").style.backgroundColor="#fff";
	document.getElementById("fl2").style.backgroundColor="#fff";
	document.getElementById("fl3").style.backgroundColor="#fff";
	document.getElementById("fl4").style.backgroundColor="#fff";
	chosen=Number(price[document.getElementById('fl3').getAttribute('data-value')]);
	document.getElementById('fl3').style.backgroundColor="chartreuse";
	document.getElementById('fl0').style.outline="#000 solid 2pxs";
	resval=chosen*Number(amount.value)+Number(send.value);
	if (document.getElementById('paperbox').checked==true) {resval+=1;}
	else if (document.getElementById('foil').checked==true) {resval+=1.5;}
	res.innerText=resval.toFixed(2)+" рублей";
})
fr.event("click",document.getElementById('fl4'),function(){
	document.getElementById("fl0").style.backgroundColor="#fff";
	document.getElementById("fl1").style.backgroundColor="#fff";
	document.getElementById("fl2").style.backgroundColor="#fff";
	document.getElementById("fl3").style.backgroundColor="#fff";
	document.getElementById("fl4").style.backgroundColor="#fff";
	chosen=Number(price[document.getElementById('fl4').getAttribute('data-value')]);
	document.getElementById('fl4').style.backgroundColor="chartreuse";
	document.getElementById('fl0').style.outline="#000 solid 2pxs";
	resval=chosen*Number(amount.value)+Number(send.value);
	if (document.getElementById('paperbox').checked==true) {resval+=1;}
	else if (document.getElementById('foil').checked==true) {resval+=1,5;}
	res.innerText=resval.toFixed(2)+" рублей";
})
fr.event("change",amount,function(){
	resval=chosen*Number(amount.value)+Number(send.value);
	if (document.getElementById('paperbox').checked==true) {resval+=1;}
	else if (document.getElementById('foil').checked==true) {resval+=1.5;}
	res.innerText=resval.toFixed(2)+" рублей";
})
fr.event("change",send,function(){
	resval=chosen*Number(amount.value)+Number(send.value);
	if (document.getElementById('paperbox').checked==true) {resval+=1;}
	else if (document.getElementById('foil').checked==true) {resval+=1.5;}
	res.innerText=resval.toFixed(2)+" рублей";
})
fr.event("click",document.getElementById('nobox'),function(){
	resval=chosen*Number(amount.value)+Number(send.value);
	if (document.getElementById('paperbox').checked==true) {resval+=1;}
	if (document.getElementById('foil').checked==true) {resval+=1.5;}
	res.innerText=resval.toFixed(2)+" рублей";
})
fr.event("click",document.getElementById('paperbox'),function(){
	resval=chosen*Number(amount.value)+Number(send.value);
	if (document.getElementById('paperbox').checked==true) {resval+=1;}
	else if (document.getElementById('foil').checked==true) {resval+=1.5;}
	res.innerText=resval.toFixed(2)+" рублей";
})
fr.event("click",document.getElementById('foil'),function(){
	resval=chosen*Number(amount.value)+Number(send.value);
	if (document.getElementById('paperbox').checked==true) {resval+=1;}
	else if (document.getElementById('foil').checked==true) {resval+=1.5;}
	res.innerText=resval.toFixed(2)+" рублей";
})