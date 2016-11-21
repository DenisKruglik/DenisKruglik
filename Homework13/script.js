var field=fr.get.byId('field');
field.contentEditable=true;
var textstate=fr.get.byId('textstate');
function check(){
	field.focus();
	textstate.innerText="Цвет текста: "+document.queryCommandValue('forecolor')+"\n\
	Цвет фона текста: "+document.queryCommandValue('backcolor')+"\n\
	Шрифт: "+document.queryCommandValue('fontname')+"\n\
	Размер шрифта: "+document.queryCommandValue('fontsize')+"\n";
	if (document.queryCommandState('bold')==true) {textstate.innerText+="Жирный текст\n"}
	if (document.queryCommandState('underline')==true) {textstate.innerText+="Подчёркнутый текст\n"}
	if (document.queryCommandState('italic')==true) {textstate.innerText+="Курсивное начертание\n"}
	if (document.queryCommandState('insertorderedlist')==true) {textstate.innerText+="Нумерованный список\n"}
	if (document.queryCommandState('insertunorderedlist')==true) {textstate.innerText+="Маркированный список\n"}
	if (document.queryCommandState('inserthorizontalrule')==true) {textstate.innerText+="Горизонтальная черта\n"}
	if (document.queryCommandState('justifyleft')==true) {textstate.innerText+="Выровнен по левому краю\n"}
	if (document.queryCommandState('justifyright')==true) {textstate.innerText+="Выровнен по правому краю\n"}
	if (document.queryCommandState('justifycenter')==true) {textstate.innerText+="Выровнен по центру\n"}
}
var strong=fr.get.byId('strong');
fr.event('click',strong,function(){
	document.execCommand('bold',false,null);
	check();
})
var under=fr.get.byId('under');
fr.event('click',under,function(){
	document.execCommand('underline',false,null);
	check();
})
var italic=fr.get.byId('italic');
fr.event('click',italic,function(){
	document.execCommand('italic',false,null);
	check();
})
var size=fr.get.byId('size');
var chsize=fr.get.byId('chsize');
fr.event('click',chsize,function(){
	document.execCommand('fontsize',false,size.value);
	check();
})
var font=fr.get.byId('font');
var chfont=fr.get.byId('chfont');
fr.event('click',chfont,function(){
	document.execCommand('fontname',false,font.value);
	check();
})
var nlist=fr.get.byId('nlist');
fr.event('click',nlist,function(){
	document.execCommand('insertorderedlist',false,null);
	check();
})
var mlist=fr.get.byId('mlist');
fr.event('click',mlist,function(){
	document.execCommand('insertunorderedlist',false,null);
	check();
})
var hline=fr.get.byId('hline');
fr.event('click',hline,function(){
	document.execCommand('inserthorizontalrule',false,null);
	check();
})
var color=fr.get.byId('color');
var chcolor=fr.get.byId('chcolor');
fr.event('click',chcolor,function(){
	document.execCommand('forecolor',false,color.value);
	check();
})
var bgcolor=fr.get.byId('bgcolor');
var chbgcolor=fr.get.byId('chbgcolor');
fr.event('click',chbgcolor,function(){
	document.execCommand('backcolor',false,bgcolor.value);
	check();
})
var left=fr.get.byId('left');
fr.event('click',left,function(){
	document.execCommand('justifyleft',false,null);
	check();
})
var right=fr.get.byId('right');
fr.event('click',right,function(){
	document.execCommand('justifyright',false,null);
	check();
})
var center=fr.get.byId('center');
fr.event('click',center,function(){
	document.execCommand('justifycenter',false,null);
	check();
})
var indent=fr.get.byId('indent');
fr.event('click',indent,function(){
	document.execCommand('indent',false,null);
	check();
})
var outdent=fr.get.byId('outdent');
fr.event('click',outdent,function(){
	document.execCommand('outdent',false,null);
	check();
})
var link=fr.get.byId('link');
fr.event('click',link,function(){
	document.execCommand('createlink',false,prompt('Введите URL'));
	check();
})
var unlink=fr.get.byId('unlink');
fr.event('click',unlink,function(){
	document.execCommand('unlink',false,null);
	check();
})
// fr.event('focus',field,check);
// fr.event('select',field,check);
fr.event('blur',field,check);
var reset=fr.get.byId('reset');
fr.event('click',reset,function(){
	document.execCommand('removeformat',false,null);
	check();
})