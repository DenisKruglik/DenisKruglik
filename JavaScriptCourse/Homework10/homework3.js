var Rialto={
	info: function(n){
		alert("Shop's name: "+this.shops[n].name+"; Address: "+this.shops[n].address+"; Overpay: "+this.shops[n].overpay+"; Profit: "+this.shops[n].profit+"; Number of goods: "+this.shops[n].goods.length);
	}
}
Rialto.shops=new Array;
function Shop(name,address,goods,overpay,profit){
	this.address=address;
	this.name=name;
	this.goods=goods;
	this.overpay=overpay;
	this.profit=profit;
	Rialto.shops.push(this);
}
Shop.prototype.sum=function(){
		var count=0;
		for (var i = 0; i < this.goods.length; i++) {
			count+=this.goods[i].price;
		}
		return count;
}
Shop.prototype.addGood=function(n,t){
		for (var i = 0; i < n; i++) {
			this.goods.push(t);
	}
}
Shop.prototype.removeGood=function(n=1){
	for (var i = 0; i < n; i++) {
			this.goods.pop();
		}
}	
Shop.prototype.sellGood=function(n=1){
	for (var i = 0; i < n; i++) {
			this.profit+=Number(this.goods[this.goods.length-1].price)+this.overpay;
			this.goods.pop();
		}
}	
Shop.prototype.info=function(){
		alert("Shop's name: "+this.name+"; Address: "+this.address+"; Overpay: "+this.overpay+"; Profit: "+this.profit+"; Number of goods: "+this.goods.length);
}
function Good(id,name,type,price,date){
	this.id=id;
	this.name=name;
	this.type=type;
	this.price=price;
	this.date=date;
}
var g1=new Good(1,'sausage','food',5,new Date("1998-10-08 12:12:12:12"));
var g2=new Good(2,'milk','food',3,new Date("1998-12-08 12:12:12:12"));
var g3=new Good(3,'cookies','food',2.5,new Date("2009-12-08 12:12:12:12"));
var g4=new Good(4,'soap','hygiene',3,new Date("1999-12-08 12:12:12:12"));
var g5=new Good(5,'Science','magazine',2,new Date("2016-12-08 12:12:12:12"));
var gs=[g1,g2,g3,g4,g5];
var s=new Shop("Euroopt","Pritytskogo str, 25",gs,0.5,0),s1=new Shop("ProStore","Random str.,234",gs,1.5,0);
