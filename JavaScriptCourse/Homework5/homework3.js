var customer=new Array("Георгий","Валентин","Дмитрий","Антон","Владимир","Станислав","Александр","Иннокентий","Сергей","Константин");
var city=new Array("Минска","Витебска","Могилёва","Гомеля","Гродно","Бреста","Лиды","Слонима","Солигорска","Баранович");
var good=new Array("стульев","столов","шкафов","тумбочек","холодильников","микроволновок","огнетушителей","пожарных извещателей","картин","домашних растений");
var elem1=document.createElement("b"),elem2=document.createElement("b"),elem3=document.createElement("b"),elem4=document.createElement("b");
setInterval(function(){
var a=new Date,elem=document.createElement("section");
elem1.innerText=customer[parseInt(Math.random()*10)];
elem2.innerText=city[parseInt(Math.random()*10)];
elem3.innerText=parseInt(Math.random()*10);
elem4.innerText=good[parseInt(Math.random()*10)];
elem.innerHTML=elem1.outerHTML+" из "+elem2.outerHTML+" заказал "+elem3.outerHTML+" штук "+elem4.outerHTML+"<br>"+a;
document.writeln(elem.outerHTML);
},1000);