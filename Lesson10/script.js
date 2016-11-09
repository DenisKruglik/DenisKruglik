function Human(){};
Human.prototype.age=10;
Human.prototype.name="Alex";

Array.prototype.average=function(){
	var sum=0,n=0;
	for (var i = 0; i < this.length; i++) {
		sum+=this[i];
		n++;
	}
	return sum/n;
}