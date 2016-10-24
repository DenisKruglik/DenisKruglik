function matrixArray(rows,columns){
  var arr = new Array();
  for(var i=1; i<columns; i++){
    arr[i] = new Array();
    for(var j=1; j<rows; j++){
    	if (i>=10) {
    		if (j>=10) {
    			arr[i][j] = document.getElementById("c"+i+"s"+j);
    		}else arr[i][j] = document.getElementById("c"+i+"s0"+j);	
    	}else{
    	if (j>=10) {
    		arr[i][j] = document.getElementById("c0"+i+"s"+j);
    	}else arr[i][j] = document.getElementById("c0"+i+"s0"+j);
    	}
    }
  }
  return arr;
}
var a = matrixArray(21,21),b=document.getElementById("bod"),h=document.getElementById("c01s20"),coord1=1,coord2=20,f;
b.addEventListener("keypress",f=function(ev){
	if (ev.which==119) {
		if (a[coord1][coord2-1].getAttribute('class')=='o') {
			a[coord1][coord2-1].setAttribute('class','o beg');
			a[coord1][coord2].setAttribute('class','o');
			coord2--;
		}
	}
	if (ev.which==97) {
		if (a[coord1-1][coord2].getAttribute('class')=='o') {
			a[coord1-1][coord2].setAttribute('class','o beg');
			a[coord1][coord2].setAttribute('class','o');
			coord1--;
		}
	}
	if (ev.which==115) {
		if (a[coord1][coord2+1].getAttribute('class')=='o') {
			a[coord1][coord2+1].setAttribute('class','o beg');
			a[coord1][coord2].setAttribute('class','o');
			coord2++;
		}
	}
	if (ev.which==100) {
		if (a[coord1+1][coord2].getAttribute('id')=='c20s01') {
			alert('You win!');
			b.removeEventListener("keypress",f);
		}
		if (a[coord1+1][coord2].getAttribute('class')=='o') {
			a[coord1+1][coord2].setAttribute('class','o beg');
			a[coord1][coord2].setAttribute('class','o');
			coord1++;
		}
	}
})
