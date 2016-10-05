var s=prompt("Enter your string");
function Brackets(a){
	var l=0,r=0;
	for (var i = 0; i < a.length; i++) {
		if (a[i]=="(") {
			l=l+1;
		}else
		if (a[i]==")") {
			r=r+1;
		}
		if (l<r) {
			return false;
		}
	}if (l==r) return true;
	else return false;
}
if (Brackets(s)==true) {
	alert("Brackets are set up right");
}else if (Brackets(s)==false) {
	alert("Brackets are set up wrong");
}