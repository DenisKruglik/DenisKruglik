var customer=new Array("Георгий","Валентин","Дмитрий","Антон","Владимир","Станислав","Александр","Иннокентий","Сергей","Константин");
var city=new Array("Минска","Витебска","Могилёва","Гомеля","Гродно","Бреста","Лиды","Слонима","Солигорска","Баранович");
var good=new Array("стульев","столов","шкафов","тумбочек","холодильников","микроволновок","огнетушителей","пожарных извещателей","картин","домашних растений");
var i=0,elem=new Array,el=new Array;
var elem1=document.createElement("b"),elem2=document.createElement("b"),elem3=document.createElement("b"),elem4=document.createElement("b"),elem5=document.getElementById("bu");
setInterval(function(){
var a=new Date;
el[i]=document.createElement("b");
elem[i]=document.createElement("div");
elem1.innerText=customer[parseInt(Math.random()*10)];
elem2.innerText=city[parseInt(Math.random()*10)];
elem3.innerText=parseInt(Math.random()*10)+1;
elem4.innerText=good[parseInt(Math.random()*10)];
el[i].innerHTML="<input type='button' name='' value='Закрыть' id>";
elem[i].innerHTML=elem1.outerHTML+" из "+elem2.outerHTML+" заказал "+elem3.outerHTML+" штук "+elem4.outerHTML+"<br>"+a;
elem[i].appendChild(el[i]);
elem5.appendChild(elem[i]);
el[i].addEventListener("click",function(){
	this.parentNode.outerHTML="";
})
i++;
},1000);